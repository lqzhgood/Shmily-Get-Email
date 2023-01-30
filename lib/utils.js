const _ = require('lodash');
const fs = require('fs');
const prettyBytes = require('pretty-bytes');

const { down } = require('./downFile');
const { WEB_PUBLIC_DIR, DIST_WEB_DIR, STATIC_URL_WHILE_LIST, EXTRA_ATTACHMENTS } = require('../config');
const { IGNORE_TYPE_MESSAGE } = require('./dict');



async function staticURL(html, fileDir) {
    const reg = /(https?:)?\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*/ig;
    const urls = html.match(reg) || [];
    const replaceArr = [];
    const attachments = [];

    for (let i = 0; i < urls.length; i++) {
        let u = urls[i];
        if (STATIC_URL_WHILE_LIST.some(wu => u == wu)) {
            replaceArr.push({ u, r: u });
            continue;
        }
        if (u.startsWith("//")) {
            console.warn(`未指定协议,使用默认 http 协议`, u);
            u = 'http:' + u;
        }

        const urlFileName = new URL(u).pathname.split('/').slice(-1)[0];

        if (['.htm', '.html', '.shtml'].some(h => urlFileName.toLowerCase().endsWith(h.toLowerCase()))) {
            replaceArr.push({ u, r: u });
            continue;
        } else {
            try {
                const { fileName, ext, p } = await down(u, `${DIST_WEB_DIR}/${fileDir}`);
                replaceArr.push({ u, r: `${WEB_PUBLIC_DIR}/${fileDir}/${fileName}` });

                // 额外作为附件
                if (EXTRA_ATTACHMENTS.includes(ext.toLowerCase())) {
                    attachments.push({
                        name: fileName,
                        url: `${WEB_PUBLIC_DIR}/${fileDir}/${fileName}`,
                        ext,
                        size: prettyBytes(fs.readFileSync(p).length),
                    });
                }

            } catch (error) {
                if (_.get(error, 'response.status') == 404 || error.message == IGNORE_TYPE_MESSAGE) {
                    replaceArr.push({ u, r: u });
                    continue;
                } else {
                    console.warn(u, error.response);
                    console.error(error);
                    console.log('html', html);
                    console.log('urls', urls);
                    throw new Error(`down error ${u}`);
                }
            }
        }
    }

    const text = html.replace(reg, u => {
        const p = replaceArr.shift();
        if (u != p.u && u != `http:${p.u}`) {
            console.log('html', html);
            console.warn(u, p);
            throw new Error('replace url not same');
        }
        return encodeURI(p.r);
    });

    return { html: text, attachments: _.unionWith(attachments, _.isEqual) };
}


module.exports = {
    staticURL,
};