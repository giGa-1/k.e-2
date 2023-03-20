var cache = null;
var cacheDate = null;

export default function handle(req, res) {
    return new Promise((resolve, reject) => {
        var date = new Date();
        if(cache != null && date.valueOf() - cacheDate.valueOf() < 2400 * 1000) {
            res.status(200).json(cache);
            resolve();

            console.log("trailers retrieved from cache");

            return;
        }

        try {
            fetch("https://www.googleapis.com/youtube/v3/search?key=AIzaSyDYRacw1YB0gBeGPpvVX41Cox72UqPDE-w&q=трейлер фильма&maxResults=50", {
                method: "GET"
            }).catch(err => {
                res.status(500).json({err: "fetch"});
                resolve();
                return;
            }).then(resp => resp.json()).then(json => {
                cacheDate = date;
                cache = json;

                res.status(200).json(json);

                resolve();
            });
        } catch (ex) {
            res.status(500);
            resolve();
        }
    });
}