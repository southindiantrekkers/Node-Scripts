const rootFolder = "C:\\Users\\Praba\\OneDrive\\Desktop\\Trekking";
const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);

const getDateTimeFromFileName = (file) => {
    const str = file.replace('.jpg', '').split("_");
    try {
        const date = str[1].substring(0, 4) + "-" + str[1].substring(4, 6) + "-" + str[1].substring(6, 8);
        const time = str[2].split(/(?=(?:..)*$)/).join(":");
        return date + " " + time;
    } catch (e) {
        return "";
    }
}
const getStoreObject = async (rootFolder) => {
    let folders = await readdir(rootFolder);
    const places = folders.map(async folder => {
        const files = await readdir(rootFolder + "\\" + folder);
        const timeline = files.map(file => ({
            photo: "https://cdn.jsdelivr.net/gh/southindiantrekkers/Trekked-Places-1000-Pixels/" + folder + "/" + file.replace('.jpg', '') + "-1000x1000.jpg",
            caption: "Viñales, Pinar del Río, Cuba",
            subcaption: "Photo by Simon Matzinger on Unsplash",
            thumbnail: "https://cdn.jsdelivr.net/gh/southindiantrekkers/Trekked-Places-500-Pixels/" + folder + "/" + file.replace('.jpg', '') + "-500x500.jpg",
        }));
        console.log(timeline)
        return {
            "title": folder,
            "brief": "",
            "image": "",
            "description": "",
            "date": "",
            "category": "",
            "keywords": [],
            "timeline": timeline,
        };
    });
    return await Promise.all(places)
}
(async () => {
    const t = await getStoreObject(rootFolder);
    fs.writeFileSync("store.json", JSON.stringify(t))
})()
