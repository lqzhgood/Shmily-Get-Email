const fs = require('fs');
const path = require('path');
const FileType = require('file-type');



function getInput(p) {
    let arr = [];
    const files = fs.readdirSync(p);
    for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const cf = path.join(p, f);
        if (fs.statSync(cf).isDirectory()) {
            arr = arr.concat(getInput(cf));
        } else {
            if (f.endsWith('.eml')) {
                arr.push(cf);
            }
        }
    }
    return arr;
}


function matchStrByArr(str, arr) {
    return arr.some(k => str.includes(k));
}

function getNameAndAddress(arr) {
    return arr.reduce((pre, cV) => {
        return {
            name: `${pre.name} / ${cV.name}`,
            address: `${pre.address} / ${cV.address}`,
        };
    });
}



async function giveExt(dir, f) {
    const { ext, name } = path.parse(path.join(dir, f));
    const { ext: _ext_l } = await FileType.fromFile(path.join(dir, f)) || {};

    if (_ext_l) {
        const ext_l = '.' + _ext_l.toLowerCase();
        if (ext.toLowerCase() != ext_l) {
            if (ext) console.warn('⚠️', `后缀和源文件不同 已修改 ${ext} => ${ext_l}`, path.join(dir, f));
        }
        return `${name}${ext_l}`;
    } else {
        console.warn('⚠️', '文件无法识别', path.join(dir, f));
        return f;
    }
}



async function giveExtByBuffer(buffer) {
    const { ext } = await FileType.fromBuffer(buffer);
    if (!ext) {
        console.warn('⚠️', '文件无法识别');
        return '';
    }
    else {
        return `.${ext.toLowerCase()}`;
    }
}




module.exports = {
    matchStrByArr,
    getNameAndAddress,
    getInput,
    giveExt,
    giveExtByBuffer,
};