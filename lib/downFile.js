const fs = require('fs-extra');
const path = require('path');
const axiosBase = require('axios');
const FileType = require('file-type');
const md5File = require('md5-file');

const { IGNORE_TYPE_MESSAGE } = require('./dict');

const axios = axiosBase.create({
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/82.0.4075.0 Safari/537.36' },
    timeout: 30 * 1000,
});


const TMP_PATH = './dist/tmp';

const IGNORE_CONTENT_TYPE = ['text/html', 'text/html; charset=utf-8', 'text/html; charset=GB18030'];


async function down(url, filepath, outName, outPre = 'web') {

    const _filename = outName || new URL(url).pathname.split('/').slice(-1)[0];

    fs.mkdirpSync(TMP_PATH);
    const tmpFile = path.resolve(TMP_PATH, `${Date.now()}_${Math.random().toString(36).substr(2)}`);

    const writer = fs.createWriteStream(tmpFile);
    const response = await axios({
        url,
        method: "GET",
        responseType: "stream",
    });



    if (response.headers['content-type'].trim().startsWith('text/html')) {
        console.warn('ignore', response.status, response.headers['content-type'], url);
        return Promise.reject(new Error(IGNORE_TYPE_MESSAGE));
    } else {
        console.info('down', response.status, response.headers['content-type'], url);
    }
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
    }).then(() => {
        return !path.extname(_filename) ? getExt(tmpFile) : Promise.resolve(path.extname(_filename));
    }).then(ext => {
        fs.mkdirpSync(filepath);
        const md5 = md5File.sync(tmpFile);

        const fileName = `${outPre}_${md5}${ext}`;
        const myFile = path.resolve(filepath, fileName);
        fs.copyFileSync(tmpFile, myFile, { overwrite: true });
        fs.unlinkSync(tmpFile);

        return { fileName, md5, ext, p: myFile };
    });
}


async function getExt(p) {
    const stream = fs.createReadStream(p);
    const res = await FileType.fromStream(stream);
    if (!res.ext) throw new Error(`unknown ext ${p} `);
    return '.' + res.ext;
}


function cleanEmptyFoldersRecursively(folder) {
    if (!fs.existsSync(folder)) return;

    const isDir = fs.statSync(folder).isDirectory();
    if (!isDir) {
        return;
    }
    let files = fs.readdirSync(folder);
    if (files.length > 0) {
        files.forEach(file => {
            const fullPath = path.join(folder, file);
            cleanEmptyFoldersRecursively(fullPath);
        });
        files = fs.readdirSync(folder);
    }

    if (files.length === 0) {
        fs.rmdirSync(folder);
        return;
    }
}


function clearTmp() {
    fs.removeSync(path.join(__dirname, '../dist/tmp'));
}



module.exports = {
    down,
    cleanEmptyFoldersRecursively,
    clearTmp,
};