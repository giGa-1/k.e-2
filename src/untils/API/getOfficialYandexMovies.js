

// Rating - field=rating.kp & search=7-10
// Years - field=year & search=2017-2020
// Type Number - field=typeNumber & search=2
// Sorts -  sortField=year & sortType=1 & sortField=votes.imdb & sortType=-1



export const getOfficialYandexMovies = async (getUrl, actionFunc = false, dispatch, isDocs=false)=>{

    
    const response = await fetch('/api/'+getUrl);
    const data =  response.json();
    data.then((data)=>{
        console.log(data);
        actionFunc&&dispatch(actionFunc(data))
    }).catch((err)=>console.log(err))
    return data
}