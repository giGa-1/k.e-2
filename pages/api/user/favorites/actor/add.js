import { getStatments, insertFavoriteActorByUserKey } from "../../../../../internal/database";

export default function handerl(req, res) {
  	return new Promise((resolve, reject) => {
		const { id } = req.query

		getStatments().then(() => {
			insertFavoriteActorByUserKey.run(req.cookies.key, id);

            res.status(200).json({status: "ok"});
            resolve();
        });
	})
} 

