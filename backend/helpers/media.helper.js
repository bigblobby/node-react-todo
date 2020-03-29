const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function dataEncode(location, mimetype = 'image/png') {
    return new Promise((resolve, reject) => {
        fs.readFile(
            location,
            'base64',
            (err, base64Image) => {
                if(err) {
                    reject(err);
                }

                const dataUrl = `data:${ mimetype };base64, ${ base64Image }`;
                resolve(dataUrl);
            }
        );
    });
}


async function processImage(settings = {
    filename: '',
    filterName: 'default',
    mimetype: 'image/png',
    width: null,
    height: null,
    quality: 100
}) {
    settings.filetype = settings.mimetype.split('/')[1];

    // Use 'image' for original image, use 'filteredImage' for the filtered image
    //const image = path.join(__dirname, '../uploads/') + settings.filename;
    const filepath = 'uploads/' + settings.filename;
    const filteredImage = await filterImage(filepath, settings);

    return await dataEncode(filteredImage, settings.mimetype);
}

function filterImage(filepath, settings) {
    const {filterName, filename, filetype, height, width, quality} = settings;
    const outputLocation = `./uploads/responsive/${ filterName }/${ filename }`;
    const checkedLocation = path.join(__dirname, `../uploads/responsive/${ filterName }/${ filename}`);

    return new Promise((resolve, reject) => {
        // Check if file exists already, this stops the image being filtered again
        fs.stat(checkedLocation, function(err, stat) {
            if(err) {
                console.error(err);
                sharp(filepath)
                    .resize({
                        height: height,
                        width: width
                    })
                    [filetype]({ quality: quality })
                    .toFile(outputLocation)
                    .then(info => {
                        console.log(info);
                        resolve(outputLocation);
                    })
                    .catch(err => {
                        console.log(err);
                        reject(err);
                    });
            } else {
                resolve(outputLocation);
            }
        });
    });
}

module.exports = {
    dataEncode: dataEncode,
    processImage: processImage
};
