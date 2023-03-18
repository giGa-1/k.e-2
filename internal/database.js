const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('Data.sqlite');
export var insertMovieStmt = null;
export var insertUserStmt = null;
export var insertStmt = null;

export var selectMovieStmt = null;
export var selectUserStmt = null;
export var selectUserByEmailOrNameStmt = null;
export var selectUserKeyByEmailPasswordStmt = null;
export var selectCommentsStmt = null;
export var selectUserByKey = null;
export var insertCommentStmt = null;
export var selectIsMovieFavoriteByUserKey = null;
export var selectIsActorFavoriteByUserKey = null;
export var insertFavoriteMovieByUserKey = null;
export var insertFavoriteActorByUserKey = null;
export var deleteFavoriteActorByUserKey = null;
export var deleteFavoriteMovieByUserKey = null;

function dbRunPromise(cmd) {
    return new Promise((resolve, reject) => {
        db.run(cmd, (err) => resolve());
    });
}

export function getStatments() {
	return new Promise((resolve, reject) => {
		// if(selectMovieStmt != null && selectMovieStmt != undefined) {
			// resolve();
		// } else {
            Promise.all([
			    dbRunPromise("CREATE TABLE if not exists `MovieData` (`id` INTEGER PRIMARY KEY, `json` TEXT)"),
                dbRunPromise("CREATE TABLE if not exists `Users` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `username` TEXT, `email` TEXT, `password` TEXT, `key` TEXT)", (res, err) => console.log(err)),
                dbRunPromise("CREATE TABLE if not exists `FavoriteMovies` (`userid` INTEGER NOT NULL, `movieid` INTEGER NOT NULL, PRIMARY KEY (`userid`, `movieid`))"),
                dbRunPromise("CREATE TABLE if not exists `FavoriteActors` (`userid` INTEGER NOT NULL, `actorid` INTEGER NOT NULL, PRIMARY KEY (`userid`, `actorid`))"),
                dbRunPromise("CREATE TABLE if not exists `Comments` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `movieid` INTEGER, `text` TEXT, `rating` INTEGER, `userid` INTEGER)"),
            ]).then(() => {
                Promise.all([
                    insertMovieStmt = db.prepare("INSERT INTO `MovieData` VALUES (?, ?)"),
                    selectMovieStmt = db.prepare("SELECT `json` FROM `MovieData` WHERE `id`= ?"),

                    insertUserStmt = db.prepare("INSERT INTO `Users` (`username`, `email`, `password`, `key`) VALUES (?, ?, ?, ?)"),
                    selectUserByEmailOrNameStmt = db.prepare("SELECT COUNT(*) AS `count` FROM `Users` WHERE (`username` = ? OR `email` = ?)"),
                    selectUserKeyByEmailPasswordStmt = db.prepare("SELECT `key` FROM `Users` WHERE (`email` = ? AND `password` = ?)"),
                    selectUserByKey = db.prepare("SELECT COUNT(*) AS `count` FROM `Users` WHERE `key` = ?"),

                    selectCommentsStmt = db.prepare("SELECT u.`username`, c.`text`, c.`rating` FROM `Comments` c INNER JOIN `Users` u ON c.`userid` = u.`id` WHERE `movieid` = ? LIMIT 100"),
                    insertCommentStmt = db.prepare("INSERT INTO `Comments` (`movieid`, `text`, `rating`, `userid`) VALUES (?, ?, ?, (SELECT `id` FROM `Users` WHERE `key` = ? GROUP BY `id`))"),

                    selectIsActorFavoriteByUserKey = db.prepare("SELECT COUNT(*) AS `count` FROM `FavoriteActors` WHERE `userid` IN (SELECT `id` AS `userid` FROM `Users` WHERE `key` = ?) AND `actorid` = ?"),
                    deleteFavoriteActorByUserKey = db.prepare("DELETE FROM `FavoriteActors` WHERE `userid` = (SELECT `id` AS `userid` FROM `Users` WHERE `key` = ? GROUP BY `id`) AND `actorid` = ?"),
                    insertFavoriteActorByUserKey = db.prepare("INSERT OR IGNORE INTO `FavoriteActors` (`userid`, `actorid`) VALUES ((SELECT `id` AS `userid` FROM `Users` WHERE `key` = ? GROUP BY `id`), ?)"),

                    selectIsMovieFavoriteByUserKey = db.prepare("SELECT COUNT(*) AS `count` FROM `FavoriteMovies` WHERE `userid` IN (SELECT `id` AS `userid` FROM `Users` WHERE `key` = ?) AND `movieid` = ?"),
                    deleteFavoriteMovieByUserKey = db.prepare("DELETE FROM `FavoriteMovies` WHERE `userid` = (SELECT `id` AS `userid` FROM `Users` WHERE `key` = ? GROUP BY `id`) AND `movieid` = ?"),
                    insertFavoriteMovieByUserKey = db.prepare("INSERT OR IGNORE INTO `FavoriteMovies` (`userid`, `movieid`) VALUES ((SELECT `id` AS `userid` FROM `Users` WHERE `key` = ? GROUP BY `id`), ?)"),
                ]).then(() => resolve());
            });
		// }
	});
}
