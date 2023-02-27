

// Rating - field=rating.kp & search=7-10
// Years - field=year & search=2017-2020
// Type Number - field=typeNumber & search=2
// Sorts -  sortField=year & sortType=1 & sortField=votes.imdb & sortType=-1



export const getOfficialYandexMovies = async (getUrl = '', actionFunc, dispatch)=>{

    const response = await fetch('https://api.kinopoisk.dev/movie?'+getUrl+'&token=KD2CA23-KVKMK2V-KD4Q376-97Z1YVW');
    const data =  response.json();
    data.then((data)=>{
        dispatch(actionFunc(data.docs))
    })
    return data
}