const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function getArticle(name) {
	return fetch(`https://ru.wikipedia.org/w/api.php?action=query&titles=${name}&formatversion=2&format=json&prop=extracts&explaintext=1&redirects`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	}).catch(err => {
		console.log(`fetch err ${err}`)
	}).then(res => res.json());
}

export default function handle(req, res) {
    let { name } = req.query;

    return new Promise((resolve, reject) => {
        Promise.all([
            new Promise((reslv, rej) => fetch(`https://v3.sg.media-imdb.com/suggestion/x/${name}.json?includeVideos=0`).then(resp => resp.json()).then(imdb => {
                let photos = [];
                let id = "";
                if(imdb.d.length > 0) {
                    for (let i = 0; i < imdb.d.length; i++) {
                        const element = imdb.d[i];
                        if(element.qid == undefined) {
                            id = element.id;
                            break;
                        }
                    }
    
                    fetch(`https://www.imdb.com/name/${id}/mediaindex`).then(resp => resp.text()).then(txt => {
                        const { document } = (new JSDOM(txt)).window;
                        if(document.getElementById("media_index_thumbnail_grid") != undefined) {
                            let tags = document.getElementById("media_index_thumbnail_grid").getElementsByTagName("a");
                            for (let i = 0; i < tags.length; i++) {
                                photos.push(tags.item(i).firstChild.src.split("_V1_")[0] + "_V1_.jpg");
                            }
                            reslv(photos);
                        }
                    });
                } else {
                    reslv(photos);
                }
            })),
            getArticle(name)
        ]).then(values => {
            let article = "";

            if(values[1].query != undefined && values[1].query.pages.length > 0 && !values[1].query.pages[0].missing) {
                article = values[1].query.pages[0].extract;
            }

            res.status(200).json({article: article, photos: values[0]});
            resolve();
        });
    });
}