

const emlFormat = require('./eml-format-master/index');
const fs = require('fs');
const EmlParser = require('eml-parser');




function decodeEml(buff) {
    // const buff = fs.readFileSync(p, 'utf-8');
    return new Promise((resolve, reject) => {
        emlFormat.read(buff, (error, data) => {
            if (error) return reject(error);
            else return resolve(data);
        });

    });
}





function parseEml(buff) {
    // const text = fs.readFileSync(p, 'utf-8');
    return new EmlParser(buff)
        .parseEml()
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });

}


module.exports = {
    decodeEml,
    parseEml,
};
