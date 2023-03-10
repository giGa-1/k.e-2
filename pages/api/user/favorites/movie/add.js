import { getStatments, insertFavoriteMovieByUserKey } from "../../../../../internal/database";

export default function handler(req, res) {
  	return new Promise((resolve, reject) => {
		const { id } = req.query

		getStatments().then(() => {
			insertFavoriteMovieByUserKey.run(req.cookies.key, id);

            res.status(200).json({status: "ok"});
            resolve();
        });
	})
} 