const fs = require('fs-extra');
const path = require('path');
const dayjs = require('dayjs');
const cheerio = require('cheerio');
const prettyBytes = require('pretty-bytes');
const _ = require('lodash');

const { checkRes1AndRes2DateSame, checkDirection } = require('./check');
const { WEB_PUBLIC_DIR, DIST_WEB_DIR } = require('../config');


const { herKeyWords, myKeyWords, MSG_BEFORE, MSG_AFTER } = require('../config');
const { matchStrByArr, getNameAndAddress, giveExtByBuffer } = require('../utils/index');

const { staticURL } = require('./utils');


async function ToMsg(_res1, _res2, md5, fileName) {

    _res1.html = _res1.html || '';
    checkRes1AndRes2DateSame(_res1, _res2);

    // console.log('res1, res2', _res1, _res2);

    const { res1, res2 } = manualFixBefore(_res1, _res2, md5);


    const header = getHeaderInfo(res1, res2);
    checkDirection(header, res1, res2);

    const t = dayjs(res1.date);

    let subject = res2.subject || '(无主题)';
    // diy fix
    if (subject.startsWith('送鲜花给') || subject.startsWith('送QQ秀给')) {
        subject = res1.subject;
    }


    const ft = t.format('YYYYMMDD_HHmmss');
    const fileDir = `${ft} ${subject.replace(/(:|\.)/g, '_').trim()}`;


    let html = res1.html;
    // 静态保存非 404 和 html 的资源
    const staticRes = await staticURL(html, fileDir);
    html = staticRes.html;

    // 获取 附件
    let attachments = await attachmentsHandel(res1, res2, fileDir);
    attachments = attachments.concat(staticRes.attachments);

    // 替换 cid的附件
    html = replaceCidAttachments(html, attachments);


    html = `<h3 class="email-title">${subject}</h3>${html}`;

    const $ = cheerio.load(html);
    const text = `${$.text()}` + (attachments.length !== 0 ? `\n 附件: ${attachments.map(v => v.name).join(' | ')}` : '');

    const type = attachments.length == 0 ? "邮件" : '附件';


    if (html.toLowerCase().includes('cid:')) console.warn('Have Cid', fileName, res1, res2);

    const msg = {
        "source": "Email",
        "device": 'PC',
        type,

        direction: header.direction,
        sender: header.sender,
        senderName: header.senderName,
        receiver: header.receiver,
        receiverName: header.receiverName,


        "day": t.format('YYYY-MM-DD'),
        "time": t.format('HH:mm:ss'),
        "ms": t.valueOf(),

        "content": text,
        html,

        $Email: {
            attachments,
            headers: res1.headers,
        },

    };

    manualFixAfter(msg, md5);


    return msg;
}


function manualFixBefore(res1, res2, _md5) {
    MSG_BEFORE.forEach(k => {
        const { from, to, md5, fn } = k;
        if (md5 == _md5 && fn) {
            fn(res1, res2);
        } else if (!md5 || md5 == _md5) {
            const reg = _.isRegExp(from) ? from : new RegExp(_.escapeRegExp(from).replace(/\//g, '\\/'), 'gm');
            res1.html = res1.html.replace(reg, to);

        }
    });
    return { res1, res2 };
}

function manualFixAfter(msg, _md5) {
    MSG_AFTER.forEach(k => {
        const { md5, fn } = k;
        if (md5 == _md5) {
            fn(msg);
        }
    });
}


function replaceCidAttachments(html, attachments) {
    for (let i = 0; i < attachments.length; i++) {
        const { originName, url } = attachments[i];
        html = html.replace(new RegExp(_.escapeRegExp(`cid:${originName}`), 'ig'), decodeURI(url));
    }
    return html;
}


async function attachmentsHandel(res1, res2, fileDir) {
    const res1Files = res1.attachments || [];
    const res2Files = res2.attachments;
    if (res1Files.length != res2Files.length) {
        console.warn('attachment not same', res1, res2);
        throw new Error('attachment not same');
    }
    const attachments = [];



    for (let i = 0; i < res1Files.length; i++) {
        const f1 = res1Files[i];
        const f2 = res2Files[i];

        // originName 用来替换 cid 的附件
        let fileName, buff, originName;

        if (f1.name) {
            fileName = f1.name;
            buff = f2.content;
        } else {
            fileName = f2.filename;
            buff = f2.content;
        }
        originName = fileName;

        let ext = path.extname(fileName);
        if (!ext) {
            ext = await giveExtByBuffer(buff);
            fileName = `${fileName}${ext}`;
        }


        attachments.push({
            name: fileName,
            originName,
            url: `${WEB_PUBLIC_DIR}/${fileDir}/${fileName}`,
            ext,
            size: prettyBytes(buff.length),
        });
        fs.mkdirpSync(path.join(DIST_WEB_DIR, fileDir));
        fs.writeFileSync(path.join(DIST_WEB_DIR, fileDir, fileName), buff);
    }
    return attachments;
}



function getHeaderInfo(res1, res2, logV) {
    const v = res2;
    const from = v.from;
    const to = v.to.html == '' && v.to.text == '' && v.to.value.length == 0 ? v.bcc : v.to;

    const fromText = from.text;
    const toText = to.text;

    const fromRes = from.value;
    const toRes = to.value;


    if (matchStrByArr(fromText, myKeyWords)) {
        const send = getNameAndAddress(fromRes);
        const receive = getNameAndAddress(toRes);
        const res = {
            direction: 'go',
            sender: send.address,
            senderName: send.name,
            receiver: receive.address,
            receiverName: receive.name,
            source: `matchStrByArr(fromText, myKeyWords)`,
        };
        return res;
    }


    if (matchStrByArr(toText, myKeyWords)) {
        const send = getNameAndAddress(fromRes);
        const receive = getNameAndAddress(toRes);
        const res = {
            direction: 'come',
            sender: send.address,
            senderName: send.name,
            receiver: receive.address,
            receiverName: receive.name,
            source: `matchStrByArr(toText, myKeyWords)`,
        };
        return res;
    }

    if (matchStrByArr(fromText, herKeyWords)) {
        const send = getNameAndAddress(fromRes);
        const receive = getNameAndAddress(toRes);
        const res = {
            direction: 'come',
            sender: send.address,
            senderName: send.name,
            receiver: receive.address,
            receiverName: receive.name,
            source: `matchStrByArr(fromText, herKeyWords)`,
        };
        return res;
    }

    if (matchStrByArr(toText, herKeyWords)) {
        const send = getNameAndAddress(fromRes);
        const receive = getNameAndAddress(toRes);
        const res = {
            direction: 'go',
            sender: send.address,
            senderName: send.name,
            receiver: receive.address,
            receiverName: receive.name,
            source: `matchStrByArr(toText, herKeyWords)`,
        };
        return res;
    }

    throw new Error('unknown key words');
}





module.exports = {
    ToMsg,
};