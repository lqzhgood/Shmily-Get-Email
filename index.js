const fs = require('fs-extra');
const path = require('path');
const { ToMsg } = require('./lib/conversion');
const { decodeEml, parseEml } = require('./lib/paseEml');
const { getInput } = require('./utils/index');
const jschardet = require('jschardet');
const iconv = require('iconv-lite');
const _ = require('lodash');
const md5File = require('md5-file');

const res1Arr = [];

const res2Arr = [];
const INPUT_ROOT_DIR = path.join(__dirname, './input');

fs.mkdirpSync('./dist');

(async () => {
    const msgArr = [];

    const files = getInput(INPUT_ROOT_DIR);

    for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const buff = fs.readFileSync(f);

        const { encoding, confidence } = jschardet.detect(buff);
        const buffUtf8 = Buffer.from(
            iconv.decode(buff, encoding == 'windows-1252' ? 'gbk' : encoding),
            'utf8',
        ).toString('utf-8');

        const res1 = await decodeEml(buffUtf8);
        const res2 = await parseEml(buffUtf8);

        res1Arr.push(res1);
        res2Arr.push(res2);

        const md5 = md5File.sync(f);
        const msg = await ToMsg(res1, res2, md5, f);
        msgArr.push(msg);
    }

    const res = _(msgArr)
        .sortBy('ms')
        .unionBy(v => `${v.ms}${v.html}${JSON.stringify(v.$Email.attachments)}`)
        .value();

    console.log('res', res);
    fs.writeFileSync('./dist/email.json', JSON.stringify(res, null, 4));

    fs.copySync('./dist/email.json', '../../../Show/memoryweb/src/assets/data/msg/original/email.json');
    fs.copySync('./dist/data/Email/', '../../../Show/public/data/Email/');

    console.log('ok');
})();

setTimeout(() => {}, 100000000);
