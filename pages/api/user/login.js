import { getPasswordHash } from "../../../internal/auth";
import { getStatments, selectUserByEmailOrNameStmt, selectUserKeyByEmailPasswordStmt } from "../../../internal/database";

export default function handler(req, res) {
    return new Promise((resolve, reject) => {
		getStatments().then(() => {
            var email = req.query.email;
            var password = req.query.password;

            if(typeof email !== 'string' || email.length < 2 || email.length > 64) {
                res.status(400).json({err: "email invalid!"});
                resolve();
                return;
            }
            if(typeof password !== 'string' || password.length < 2 || password.length > 64) {
                res.status(400).json({err: "password invalid!"});
                resolve();
                return;
            }

            var passwordHash = getPasswordHash(password);
            selectUserKeyByEmailPasswordStmt.get(email, passwordHash, (err, responce) => {
                selectUserKeyByEmailPasswordStmt.reset();
                if(responce != null) {
                    res.status(200).json({status: "ok", session: responce.key});
                    resolve();
                } else {
                    res.status(400).json({err: "email or password invalid!"});
                    resolve();
                }
            });
		});
	})
}