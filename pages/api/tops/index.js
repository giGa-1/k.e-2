var cache = null;
var cacheDate = null;

export default function handle(req, res) {
    return new Promise((resolve, reject) => {
        var date = new Date();
        if(cache != null && date.valueOf() - cacheDate.valueOf() < 2400 * 1000) {
            res.status(200).json(cache);
            resolve();

            return;
        }

        try {
            fetch("https://adme.media/", {method: "GET"})
            .catch(err => {
                res.status(500).json({err: "fetch"});
                resolve();
                return;
            }).then(resp => {
                fetch("https://wba.adme.media/api/v1/adme/web/articles?limit=100&rubricId=7&offset=0", {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${resp.headers.get("set-cookie").split("=")[1].split(";")[0]}`
                    }
                }).catch(err => {
                    res.status(500).json({err: "fetch"});
                    resolve();
                    return;
                }).then(resp => resp.json()).then(json => {
                    if(json.code === "ok") {
                        res.status(200).json(json.data);
                        cache = json.data;
                        cacheDate = date;
                    } else {
                        res.status(500);
                    }
                    resolve();
                })
            });
        } catch (ex) {
            res.status(500);
            resolve();
        }
    });
}