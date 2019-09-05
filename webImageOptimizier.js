const sharp = require('sharp');

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


const rootFolder = "C:\\Users\\Praba\\OneDrive\\Desktop\\Trekking";
const backFolder = "C:\\Users\\Praba\\OneDrive\\Desktop\\500";

const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);

const getDateTimeFromFileName = (file) => {
    const str = file.replace('.jpg', '').split("_");
}
const getStoreObject = async (rootFolder) => {
    let folders = await readdir(rootFolder);
    const places = folders.map(async folder => {
        console.log(backFolder + "\\" +folder)
        fs.mkdirSync(backFolder + "\\" +folder);
        const files = await readdir(rootFolder + "\\" + folder);
        files.forEach(x => {
            sharp(rootFolder + "\\" + folder + "\\" + x)
                .rotate()
                .resize(500).toFile(backFolder + "\\" + folder + "\\" + x.replace('.jpg', '') + "-500x500.jpg" )
                .then(function (newFileInfo) {
                    console.log("Success");
                })
                .catch(function (err) {
                    console.log("Error occured");
                });
        })

    });
    return await Promise.all(places)
}
(async () => {
    const t = await getStoreObject(rootFolder);
    fs.writeFileSync("output.json", JSON.stringify(t))
})()
