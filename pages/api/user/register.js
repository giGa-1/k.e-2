import {getPasswordHash, getAuthKeyHash} from "../../../internal/auth";
import { selectUserByEmailOrNameStmt, insertUserStmt, getStatments } from "../../../internal/database";
import { serialize } from "cookie";

export default function handler(req, res) {
    return new Promise((resolve, reject) => {
		getStatments().then(() => {
            var email = req.query.email;
            var username = req.query.username;
            var password = req.query.password;

            if(typeof email !== 'string' || email.length < 2 || email.length > 64) {
                res.status(400).json({err: "email invalid!"});
                resolve();
                return;
            }
            if(typeof username !== 'string' || username.length < 2 || username.length > 64) {
                res.status(400).json({err: "username invalid!"});
                resolve();
                return;
            }
            if(typeof password !== 'string' || password.length < 2 || password.length > 64) {
                res.status(400).json({err: "password invalid!"});
                resolve();
                return;
            }

            var passwordHash = getPasswordHash(password);
            var key = getAuthKeyHash(email, username, passwordHash);
            selectUserByEmailOrNameStmt.get(username, email, (err, responce) => {
                selectUserByEmailOrNameStmt.reset();
                if(responce.count == 0) {
                    insertUserStmt.run(username, email, passwordHash, key);
                    res.status(200).setHeader('Set-Cookie', [
                        serialize('key', key, { path: '/' }),
                        serialize('username', username, { path: '/' }) 
                    ]).json({status: "ok"});
                    resolve();
                } else {
                    res.status(400).json({err: "username or email already in use!"});
                    resolve();
                }
            });
		});
	})
}