import { getPasswordHash } from "../../../../internal/auth";
import { changeEmail, changePassword, getStatments, selectUsernameEmailByKey,  } from "../../../../internal/database";
import { serialize } from "cookie";

export default function handler(req, res) {
    return new Promise((resolve, reject) => {
		getStatments().then(() => {
            var password = req.query.password;
            if(typeof password !== 'string' || password.length < 2 || password.length > 64) {
                res.status(400).json({err: "password invalid!"});
                resolve();
                return;
            }
            var newemail = req.query.email;
            if(typeof newemail !== 'string' || newemail.length < 2 || newemail.length > 64) {
                res.status(400).json({err: "email invalid!"});
                resolve();
                return;
            }

            var passwordHash = getPasswordHash(password);
            selectUsernameEmailByKey.run(req.cookies.key, (err, resp) => {
                if(resp == null) {
                    res.status(200).json({err:"invalid key!"});
                    resolve();
                    return;
                }

                var key = getAuthKeyHash(newemail, resp.username, passwordHash);
                changeEmail.run(newemail, key, passwordHash, req.cookies.key);
                
                res.status(200).setHeader('Set-Cookie', [
                    serialize('key', key, { path: '/' }),
                ]).json({status: "ok"});
                resolve();
            });
		});
	})
}