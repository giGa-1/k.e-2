import { getStatments, selectCommentsStmt } from "../../../../../internal/database";

export default function handler(req, res) {
  	return new Promise((resolve, reject) => {
		const { id } = req.query

		getStatments().then(() => {
			selectCommentsStmt.all(id, (err, responce) => {
				selectCommentsStmt.reset();

                res.status(200).json(responce);

                resolve();
			});
		});
	})
} 