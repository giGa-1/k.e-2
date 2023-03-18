import { getMovieCountries, getMovieGenres, getStatments, selectMovie } from "../../../internal/database";

export default function handle(req, res) {
    return new Promise((resolve, reject) => {
        getStatments().then(() => {
            const { minYear, maxYear, minRating, minVotes, name, type, genre, country, sort, page } = req.query;
            //search?minYear=2013&maxYear=2013&minRating=0&minVotes=0&name=волк&type=movie&genre=&country=&sort=rating&page=1

            selectMovie.all(minYear, maxYear, minRating, minVotes, "%" + name + "%", "%" + type + "%", "%" + genre + "%", "%" + country + "%", sort, (page - 1) * 20, (selectErr, responce) => {
                let prom = [];
                responce.forEach(film => {
                    prom.push(new Promise((r, rj) => {
                        getMovieCountries.all(film.id, (err, resp) => {
                            getMovieGenres.all(film.id, (er, resp1) => {
                                let countries = [];
                                let genres = [];
                                resp.forEach(c => {
                                    countries.push(c.country);
                                });
                                resp1.forEach(g => {
                                    genres.push(g.genre);
                                });
                                film.counties = countries;
                                film.genres = genres;
                                r(film);
                            });
                        })
                    }));
                });
                Promise.all(prom).then((val)=>{
                    res.status(200).json(val);
                    resolve();
                });
            });
        });
    });
};