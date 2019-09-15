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
const getObject = async (rootFolder) => {
    const folder = rootFolder.split('\\').pop();
    const files = await readdir(rootFolder);
    const timeline = files.map(file => ({
        photo: "https://cdn.jsdelivr.net/gh/southindiantrekkers/Trekked-Places-1000-Pixels/" + folder + "/" + file.replace('.jpg', '') + "-1000x1000.jpg",
        caption: "",
        subcaption: "",
        date: getDateTimeFromFileName(file),
        thumbnail: "https://cdn.jsdelivr.net/gh/southindiantrekkers/Trekked-Places-500-Pixels/" + folder + "/" + file.replace('.jpg', '') + "-500x500.jpg",
    }));
    // console.log(timeline)
    return {
        "title": folder,
        "brief": "",
        "image": timeline[0],
        "description": "",
        "date": "",
        "category": "",
        "keywords": [],
        "timeline": timeline,
    };
}
(async () => {
    const rootFolder = "C:\\Users\\Praba\\OneDrive\\Desktop\\Trekking\\Short Trek, Puli Gundu";
    const t = await getObject(rootFolder);
    fs.writeFileSync("object.json", JSON.stringify(t))
})()
