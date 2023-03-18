var cache = null;
var cacheDate = null;

export default function handle(req, res) {
    return new Promise((resolve, reject) => {
        var date = new Date();
        if(cache != null && date.valueOf() - cacheDate.valueOf() < 1200 * 1000) {
            res.status(200).json(cache);
            resolve();

            return;
        }

        fetch("https://www.googleapis.com/youtube/v3/search?key=AIzaSyDYRacw1YB0gBeGPpvVX41Cox72UqPDE-w&q=трейлер фильма&maxResults=50", {
            method: "GET"
        }).then(resp => resp.json()).then(json => {
            cacheDate = date;
            cache = json;

            res.status(200).json(json);

            resolve();
        });
    });
}