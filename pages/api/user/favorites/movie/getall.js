import { getStatments, selectFavoriteMoviesByKey } from "../../../../../internal/database";

export default function handler(req, res) {
  	return new Promise((resolve, reject) => {
		getStatments().then(() => {
			selectFavoriteMoviesByKey.all(req.cookies.key, (err, responce) => {
                res.status(200).json(responce);

                resolve();
			});
		});
	})
} 