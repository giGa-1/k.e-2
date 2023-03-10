import { getStatments, selectIsActorFavoriteByUserKey } from "../../../../../internal/database";

export default function handler(req, res) {
  	return new Promise((resolve, reject) => {
		const { id } = req.query

		getStatments().then(() => {
			selectIsActorFavoriteByUserKey.get(req.cookies.key, id, (err, responce) => {
				selectIsActorFavoriteByUserKey.reset();

                res.status(200).json({"is_favorite": (responce.count > 0)});

                resolve();
			});
		});
	})
} 