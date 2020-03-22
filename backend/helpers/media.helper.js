const fs = require('fs');

async function dataEncode(location, mimetype = 'image/png'){
    return new Promise((resolve, reject) => {
        fs.readFile(
            location,
            'base64',
            (err, base64Image) => {
                if(err){
                    reject(err);
                }

                const dataUrl = `data:${mimetype};base64, ${base64Image}`;
                resolve(dataUrl);
            }
        );
    });
}

module.exports = {
    dataEncode: dataEncode
};
