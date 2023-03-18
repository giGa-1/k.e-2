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

        //10 minute cache
        if(cache[month] != null && date.valueOf() - cacheDate[month].valueOf() < 600 * 1000) {
            res.status(200).json(cache[month]);
            resolve();
        } else {
            getJson(`v2.1/films/releases?year=${date.getFullYear()}&month=${monthNames[month].toUpperCase()}`).then((json) => {
                res.status(200).json(json);
                cache[month] = json;
                cacheDate[month] = date;
                resolve();
            });
        }
    });
}