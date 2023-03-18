import { deleteFavoriteActorByUserKey, getStatments } from "../../../../../internal/database";

export default function handler(req, res) {
  	return new Promise((resolve, reject) => {
		const { id } = req.query

		getStatments().then(() => {
			deleteFavoriteActorByUserKey.run(req.cookies.key, id);

            res.status(200).json({status: "ok"});
            resolve();
        });
	})
} 