const sharp = require('sharp');
const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);

const resizeSingleImage = () => {
    let inputFile = "./IMG_20181111_142637.jpg";
    let outputFile = "output.jpg";
    sharp(inputFile)
        .resize(1000).toFile(outputFile)
        .then(function (newFileInfo) {
            console.log("Success");
        })
        .catch(function (err) {
            console.log("Error occured");
        });
}

const getDateTimeFromFileName = (file) => {
    const str = file.replace('.jpg', '').split("_");
}

const Folder_WiseImagePixelConversion = async (rootFolder, outputFolder, pixel) => {
    const files = await readdir(rootFolder);
    fs.mkdirSync(outputFolder);
    files.forEach(x => {
        sharp(rootFolder + "\\" + x)
            .rotate()
            .resize(pixel).toFile(outputFolder + "\\" + x.replace('.jpg', '') + `-${pixel}x${pixel}.jpg`)
            .then(function (newFileInfo) {
                console.log("Success");
            })
            .catch(function (err) {
                console.log("Error occured");
            });
    })
}

(async () => {
    let pixel = 500;
    const rootFolder = "C:\\Users\\Praba\\OneDrive\\Desktop\\Trekking\\Short Trek, Puli Gundu";
    let outputFolder = `./${pixel}`;
    await Folder_WiseImagePixelConversion(rootFolder, outputFolder, pixel);
    pixel = 1000;
    outputFolder = `./${pixel}`;
    await Folder_WiseImagePixelConversion(rootFolder, outputFolder, pixel);
    pixel = 2000;
    outputFolder = `./${pixel}`;
    await Folder_WiseImagePixelConversion(rootFolder, outputFolder, pixel);
})()
