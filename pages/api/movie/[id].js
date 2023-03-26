import { getStatments, selectMovieStmt, insertMovieStmt } from "../../../internal/database";
import getJson from "../../../internal/api-relay";
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

export default function handler(req, res) {
	return new Promise((resolve, reject) => {
		const { id } = req.query

		getStatments().then(() => {
			selectMovieStmt.get(id, (selectErr, responce) => {
				selectMovieStmt.reset();
	
				if(responce == null) {
					try {
						Promise.all([
							getJson(`v2.2/films/${id}`), 
							getJson(`v2.2/films/${id}/box_office`), 
							getJson(`v2.2/films/${id}/distributions`), 
							getJson(`v1/staff?filmId=${id}`),
						]).then((values) => {
							let json = values[0];
							let boxJson = values[1];
							let viewJson = values[2];
							let staffJson = values[3];

							let jsonData = {json, boxJson, viewJson, staffJson};
		
							insertMovieStmt.run(id, JSON.stringify(jsonData));
		
							console.log(`Data for movie id ${id} retrieved from API!`);

							Promise.all([
								fetch(`https://www.imdb.com/title/${jsonData.json.imdbId}/mediaindex/?ref_=tt_mi_sm`).then(resp => resp.text()),
								getArticle(jsonData.json.nameOriginal)
							]).then(values => {
								const { document } = (new JSDOM(values[0])).window;
								if(document.getElementById("media_index_thumbnail_grid") != undefined) {
									let tags = document.getElementById("media_index_thumbnail_grid").getElementsByTagName("a");
									let imgs = [];
									for (let i = 0; i < tags.length; i++) {
										imgs.push(tags.item(i).firstChild.src.split("_V1_")[0] + "_V1_.jpg");
									}
			
									jsonData.photos = imgs;	
								} else {
									jsonData.photos = [];
								}
								
		
								let wiki = values[1];
								if(wiki.query.pages.length > 0 && !wiki.query.pages[0].missing) {
									jsonData.article = wiki.query.pages[0].extract;
								} else {
									jsonData.article = "";
								}
		
								res.status(200).json(jsonData);
								resolve();
							});
						});
					} catch(ex) {
						res.status(500);
					}
				} else {
					let respData = JSON.parse(responce.json);
					Promise.all([
						fetch(`https://www.imdb.com/title/${respData.json.imdbId}/mediaindex/?ref_=tt_mi_sm`).then(resp => resp.text()),
						getArticle(respData.json.nameOriginal)
					]).then(values => {
						const { document } = (new JSDOM(values[0])).window;
						if(document.getElementById("media_index_thumbnail_grid") != undefined) {
							let tags = document.getElementById("media_index_thumbnail_grid").getElementsByTagName("a");
							let imgs = [];
							for (let i = 0; i < tags.length; i++) {
								imgs.push(tags.item(i).firstChild.src.split("_V1_")[0] + "_V1_.jpg");
							}
	
							respData.photos = imgs;	
						} else {
							respData.photos = [];
						}

						let wiki = values[1];
						if(wiki.query.pages.length > 0 && !wiki.query.pages[0].missing) {
							respData.article = wiki.query.pages[0].extract;
						} else {
							respData.article = "";
						}

						res.status(200).json(respData);
						resolve();
					});
				}
			});
		});
	})
} 