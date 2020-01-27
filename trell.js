const fs = require('fs');
const util = require('util');
const fetch = require("node-fetch");
const followers = JSON.parse(fs.readFileSync("./praba.json", "utf-8"));


const getProfile = async (id) => {
    try {
        const res = await fetch(
            "https://api.trell.co/api/v1/user/" + id
        );
        if (res.status >= 400) {
            console.log(res);
            return {}
        }
        const user = await res.json();
        // console.log(user.result.user)
        return user.result.user;
    } catch (err) {
        console.log(err)
        return {}
    }
};

function snooze(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
let datas = followers.data[0].data;
let arr = [];

let process = async () => {
    for (let i = 0; i < datas.length; i++) {
        snooze(100);
        arr.push(await getProfile(datas[i].userHandle));
        if (i === datas.length - 2) {
            fs.writeFileSync("users.json", JSON.stringify(arr))
            break;
        }
    }
}

process();