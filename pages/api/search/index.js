import { getStatments, selectMovie } from "../../../internal/database";

export default function handle(req, res) {
    return new Promise((resolve, reject) => {
        getStatments().then(() => {
            const { minYear, maxYear, minRating, minVotes, name, type, genre, country, sort, page } = req.query;
            //search?minYear=2013&maxYear=2013&minRating=0&minVotes=0&name=волк&type=movie&genre=&country=&sort=rating&page=1

            selectMovie.all(minYear, maxYear, minRating, minVotes, "%" + name + "%", "%" + type + "%", "%" + genre + "%", "%" + country + "%", sort, (page - 1) * 20, (selectErr, responce) => {
                res.status(200).json(responce);
                resolve();
            });
        });
    });
};