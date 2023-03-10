import { getStatments, selectMovieStmt, insertMovieStmt } from "../../../internal/database";
import getJson from "../../../internal/api-relay";

export default function handler(req, res) {
  	return new Promise((resolve, reject) => {
		const { id } = req.query

		getStatments().then(() => {
			selectMovieStmt.get(id, (selectErr, responce)=>{
				selectMovieStmt.reset();
	
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
	
						insertMovieStmt.run(id, JSON.stringify(jsonData));
	
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