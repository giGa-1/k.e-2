


// Rating - field=rating.kp & search=7-10
// Years - field=year & search=2017-2020
// Type Number - field=typeNumber & search=2
// Sorts -  sortField=year & sortType=1 & sortField=votes.imdb & sortType=-1



export const getUnofficialYandexMovies = async (getUrl = '', actionFunc, dispatch, dataValue = 0)=>{

    const response = fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films'+getUrl, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'eb2b25d1-cff2-447a-b471-9f49da564eef',
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
        .then(json => {console.log(json);dispatch(actionFunc(json.items))})
        .catch(err => console.log(err))

    return response
}