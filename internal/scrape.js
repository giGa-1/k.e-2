import { getStatments, insertMovieSort, insertMovieCountry, insertMovieGenre, db, insertMoviePoster } from "./database";
import getJson from "./api-relay";

let running = false;
let cpage = 1;
function run() {
    if(running) return;

    running = true;
    getStatments().then(() => {
        scrape(cpage);            
    });
}

function scrape(page) {
    new Promise((resolve, reject) => {
        console.log("page: " + page);
        fetch(`https://api.kinopoisk.dev/v1/movie?limit=50000&page=${page}&token=R6179CA-NV0MMWH-Q9N5ZFY-5NTDSS7`, {
            method: 'GET'
        })
        .then(res => {
            console.log(res.status);
            if(res.status == 200) {
                res.json().then((json) => {
                    db.exec('BEGIN TRANSACTION');

                    json.docs.forEach(film => {
                        insertMovieSort.run(film.id, film.year ?? 0, film.rating.kp ?? 0, film.votes.kp ?? 0, film.name ?? "", film.type ?? "");
                        if(film.poster != null && film.poster != undefined) {
                            insertMoviePoster.run(film.id, film.poster.url ?? "", film.poster.previewUrl ?? "");
                        }
                        film.countries.forEach(country => {
                            insertMovieCountry.run(film.id, country.name);
                        });
                        film.genres.forEach(genre => {
                            insertMovieGenre.run(film.id, genre.name);
                        });
                    });
                    db.exec('COMMIT');
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }).then(() => {
        setTimeout(() => {
            if(cpage < 25) {
                cpage++;
                scrape(cpage);
            }
        }, 10000);
    });
}

export default function handle(req, res) {
    run();

    res.status(200).json({currentid: cpage});
}