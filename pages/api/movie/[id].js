const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('Data.sqlite');
var selectStmt = null
var insertStmt = null;

function getJson(path) {
	return fetch(`https://kinopoiskapiunofficial.tech/api/${path}`, {
		method: 'GET',
		headers: {
			'X-API-KEY': 'eb2b25d1-cff2-447a-b471-9f49da564eef',
			'Content-Type': 'application/json',
		},
	}).then(res => res.json());
}

function getStatments() {
	return new Promise((resolve, reject) => {
		if(selectStmt != null && selectStmt != undefined) {
			resolve();
		} else {
			db.run("CREATE TABLE if not exists `MovieData` (id INTEGER, json TEXT)", (err) => {
				insertStmt = db.prepare("INSERT INTO `MovieData` VALUES (?, ?)", (err0) =>{
					selectStmt = db.prepare("SELECT `json` FROM `MovieData` WHERE `id`= ?", (err1) =>{
						resolve();
					});
				});
			});
		}
	});
}

export default function handler(req, res) {
  	return new Promise((resolve, reject) => {
		const { id } = req.query

		getStatments().then(() => {
			selectStmt.get(id, (selectErr, responce)=>{
				selectStmt.reset();
	
				if(responce == null) {
					Promise.all([
						getJson(`v2.2/films/${id}`), 
						getJson(`v2.2/films/${id}/box_office`), 
						getJson(`v2.2/films/${id}/distributions`), 
						getJson(`v1/staff?filmId=${id}`)
					]).then((values) => {
						let json = values[0];
						let boxJson = values[1];
						let viewJson = values[2];
						let staffJson = values[3];
						let jsonData = {json, boxJson, viewJson, staffJson};
	
						insertStmt.run(id, JSON.stringify(jsonData));
	
						console.log(`Data for movie id ${id} retrieved from API!`);
						res.status(200).json(jsonData);
						resolve();
					});
				} else {
					console.log(`Data for movie id ${id} retrieved locally!`);

					res.status(200).json(JSON.parse(responce.json));
					resolve();
				}
			});
		});
	})
} 