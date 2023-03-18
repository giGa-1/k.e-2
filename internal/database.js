const sqlite3 = require('sqlite3').verbose();

export const db = new sqlite3.Database('Data.sqlite');
db.loadExtension("./sqlean-win-x64/unicode", (err) => console.log(err));

export var insertMovieSort = null;
export var insertMoviePoster = null;
export var insertMovieGenre = null;
export var insertMovieCountry = null;
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

export var selectMovie = null;

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
			    dbRunPromise("CREATE TABLE if not exists `Movies` (`id` INTEGER PRIMARY KEY, `year` INTEGER, `rating` DECIMAL, `votes` INTEGER, `name` TEXT, `type` TEXT)"),
			    dbRunPromise("CREATE TABLE if not exists `MoviePosters` (`id` INTEGER PRIMARY KEY, `url` TEXT, `previewUrl` TEXT)"),
			    dbRunPromise("CREATE TABLE if not exists `MovieCountries` (`movieid` INTEGER, `country` TEXT, PRIMARY KEY (`movieid`, `country`))"),
			    dbRunPromise("CREATE TABLE if not exists `MovieGenres` (`movieid` INTEGER, `genre` TEXT, PRIMARY KEY (`movieid`, `genre`))"),
			    dbRunPromise("CREATE TABLE if not exists `MovieJson` (`id` INTEGER PRIMARY KEY, `json` TEXT)"),
                dbRunPromise("CREATE TABLE if not exists `Users` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `username` TEXT, `email` TEXT, `password` TEXT, `key` TEXT)", (res, err) => console.log(err)),
                dbRunPromise("CREATE TABLE if not exists `FavoriteMovies` (`userid` INTEGER NOT NULL, `movieid` INTEGER NOT NULL, PRIMARY KEY (`userid`, `movieid`))"),
                dbRunPromise("CREATE TABLE if not exists `FavoriteActors` (`userid` INTEGER NOT NULL, `actorid` INTEGER NOT NULL, PRIMARY KEY (`userid`, `actorid`))"),
                dbRunPromise("CREATE TABLE if not exists `Comments` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `movieid` INTEGER, `text` TEXT, `rating` INTEGER, `userid` INTEGER)"),
            ]).then(() => {
                Promise.all([
                    dbRunPromise("CREATE UNIQUE INDEX `idx_country` ON `MovieCountries` (`movieid`ASC, `country`)"),
                    dbRunPromise("CREATE UNIQUE INDEX `idx_genre` ON `MovieGenres` (`movieid`ASC, `genre`)"),
                    dbRunPromise("CREATE UNIQUE INDEX `idx_movie_name` ON `Movies` (`name`)"),

                    insertMovieSort = db.prepare("INSERT OR IGNORE INTO `Movies` VALUES (?, ?, ?, ?, ?, ?)"),
                    insertMoviePoster = db.prepare("INSERT OR IGNORE INTO `MoviePosters` VALUES (?, ?, ?)"),
                    insertMovieGenre = db.prepare("INSERT OR IGNORE INTO `MovieGenres` VALUES (?, ?)"),
                    insertMovieCountry = db.prepare("INSERT OR IGNORE INTO `MovieCountries` VALUES (?, ?)"),
                    insertMovieStmt = db.prepare("INSERT OR IGNORE INTO `MovieJson` VALUES (?, ?)"),
                    selectMovieStmt = db.prepare("SELECT `json` FROM `MovieJson` WHERE `id`= ?"),

                    selectMovie = db.prepare(
                        `SELECT * FROM Movies WHERE 
                        year >= ? 
                        AND year <= ? 
                        AND rating > ? 
                        AND votes > ? 
                        AND LOWER(name) LIKE ? 
                        AND LOWER(type) LIKE ? 
                        AND (SELECT COUNT(*) FROM MovieGenres WHERE movieid = id AND LOWER(genre) LIKE ?) > 0 
                        AND (SELECT COUNT(*) FROM MovieCountries WHERE movieid = id AND LOWER(country) LIKE ?) > 0 
                        ORDER BY 
                            CASE ? 
                                WHEN 'year' THEN year 
                                ELSE rating
                            END 
                            DESC 
                        LIMIT 20 
                        OFFSET ?`),

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
