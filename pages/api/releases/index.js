import getJson from "../../../internal/api-relay";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var cacheDate = [];
var cache = [];

export default function handle(req, res) {
    return new Promise((resolve, reject) => {
        var date = new Date();

        var month = req.query.month;

        //200 minute cache
        if(cache[month] != null && date.valueOf() - cacheDate[month].valueOf() < 12000 * 1000) {
            res.status(200).json(cache[month]);
            resolve();
        } else {
            try {
                let prom = [];
                for (let i = 0; i < 4; i++) {
                    prom.push(getJson(`v2.1/films/releases?year=${date.getFullYear()}&month=${monthNames[month].toUpperCase()}&page=${i+1}`));
                }
    
                Promise.all(prom).then((values) => {
                    let releases = [];
                    values.forEach(value => {
                        releases.push(value.releases);
                    });
    
                    res.status(200).json(releases);
                    cache[month] = releases;
                    cacheDate[month] = date;
                    resolve();
                });
            } catch (ex) {
                res.status(500);
                resolve();
            }
        }
    });
}