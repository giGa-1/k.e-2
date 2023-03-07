

// Rating - field=rating.kp & search=7-10
// Years - field=year & search=2017-2020
// Type Number - field=typeNumber & search=2
// Sorts -  sortField=year & sortType=1 & sortField=votes.imdb & sortType=-1



export const getOfficialYandexMovies = async (getUrl = '', actionFunc, dispatch, isDocs=false)=>{
  
    const response = await fetch('https://api.kinopoisk.dev'+getUrl+'&token=V26YNBD-WSK43E2-NBSHTSG-5WS5CKK');
    const data =  response.json();
    data.then((data)=>{
        dispatch(actionFunc(isDocs ? data : data.docs))
    })
    return data
}