import getJson from "../../../internal/api-relay";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var cacheDate = new Date();
var cache = null;

export default function handle(req, res) {
    return new Promise((resolve, reject) => {
        var date = new Date();

        //10 minute cache
        if(cache != null && date.valueOf() - cacheDate.valueOf() < 600 * 1000) {
            res.status(200).json(cache);
            resolve();
        } else {
            getJson(`v2.1/films/releases?year=${date.getFullYear()}&month=${monthNames[date.getMonth()].toUpperCase()}`).then((json) => {
                res.status(200).json(json);
                cache = json;
                cacheDate = date;
                resolve();
            });
        }
    });
}