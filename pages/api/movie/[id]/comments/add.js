import { getStatments, insertCommentStmt, selectUserByKey } from "../../../../../internal/database";

export default function handler(req, res) {
	if(req.method !== "POST") {
		res.status(400).json({err: "use POST"});
		return;
	}

  	return new Promise((resolve, reject) => {
		getStatments().then(() => {
			selectUserByKey.get(req.cookies.key, (err, responce) => {
				selectUserByKey.reset();
				if(responce.count < 1) {
					res.status(400).json({err: "invalid session!"});
					resolve();
					return;
				} else {
					var body = JSON.parse(req.body);
					var movieid = req.query.id;
					var text = body.text;
					var rating = body.rating;

					if(text == undefined || text.length > 4000) {
						res.status(400).json({err: "text over 4000 chars!"});
						resolve();
						return;
					}
					if(rating == undefined || rating < 0 || rating > 10) {
						res.status(400).json({err: "rating invalid!"});
						resolve();
						return;
					}

					insertCommentStmt.run(movieid, text, rating, req.cookies.key);

					res.status(200).json({status: "ok"});
					resolve();
				}
			});
		});
	})
} 