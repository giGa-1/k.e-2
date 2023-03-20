const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const cache = new Map();

export default function handle(req, res) {
    if(isNaN(req.query.page) || req.query.page < 1) {
        res.status(400).json({err: "invalid page!"});
        return;
    }
    let num = (req.query.page - 1) * 20;

    if(cache.has(num)) {
        let c = cache.get(num);
        if(new Date().valueOf() - c.date.valueOf() < 6000 * 1000) {
            console.log("fetched news from cache");
            res.status(200).json(c.value);
            return;
        }
    }

    return new Promise((resolve, reject) => {
        fetch(`https://akg-portal.ru/news/movies/${num}/`, {
            method: 'GET',
        }).catch(err => {
            res.status(500).json({err: "fetch"});
            resolve();
            return;
        }).then(resp => resp.text()).then(text => {
            const { document } = (new JSDOM(text)).window;
            let collection = document.getElementsByClassName("news_box movies_cat");
            let promises = [];
            for (let i = 0; i < collection.length; i++) {
                promises[i] = getData(collection.item(i).getElementsByTagName("a")[0].href);
            }
            Promise.all(promises).then((values) => {
                cache.set(num, {date: new Date(), value: values});
                
                console.log("fetched news from web");
                res.status(200).json(values);
                resolve();
            });
        });
    });
}

function getData(link) {
    return new Promise((res, rej) => {
        fetch(`https://kasdg-portal.ru${link}`, {
            method: 'GET',
        }).catch(err => {
            res({});
            return;
        }).then(resp => resp.text()).then(text => {
            const { document } = (new JSDOM(text)).window;
            try {
                let title = document.getElementsByClassName("news_title").item(0).textContent;
                let date = document.getElementsByClassName("date").item(0).attributes.getNamedItem("content").nodeValue;

                let div = document.getElementsByClassName("news_text").item(0);

                let pic = "";
                for (let i = 0; i < div.children.length; i++) {
                    let element = div.children.item(i);
                    if(element.className == "news_cover_center") {
                        pic = "https://kg-portal.ru" + element.children.item(0).getElementsByTagName("img").item(0).src;
                    }
                }

                let content = "";
                let arr = div.getElementsByTagName("p");
                for (let i = 0; i < arr.length; i++) {
                    content += arr.item(i).textContent;
                }

                res({title: title, text: content, coverUrl: pic, date: date});
            } catch (ex) {
                res({});
            }
        });
    });
}