import { getPasswordHash } from "../../../../internal/auth";
import { changePassword, getStatments, selectUsernameEmailByKey,  } from "../../../../internal/database";

export default function handler(req, res) {
    return new Promise((resolve, reject) => {
		getStatments().then(() => {
            var oldPassword = req.query.oldPassword;
            var password = req.query.password;
            if(typeof password !== 'string' || password.length < 2 || password.length > 64) {
                res.status(400).json({err: "password invalid!"});
                resolve();
                return;
            }
            if(typeof oldPassword !== 'string' || oldPassword.length < 2 || oldPassword.length > 64) {
                res.status(400).json({err: "oldPassword invalid!"});
                resolve();
                return;
            }

            var passwordHash = getPasswordHash(password);
            var oldPasswordHash = getPasswordHash(oldPassword);
            selectUsernameEmailByKey.run(req.cookies.key, (err, resp) => {
                if(resp == null) {
                    res.status(200).json({err:"invalid key!"});
                    resolve();
                    return;
                }

                var key = getAuthKeyHash(resp.email, resp.username, passwordHash);
                changePassword.run(passwordHash, key, oldPasswordHash, req.cookies.key);
                
                res.status(200).setHeader('Set-Cookie', [
                    serialize('key', key, { path: '/' }),
                ]).json({status: "ok"});
                resolve();
            });
		});
	})
}