
export const getActorKinopoisk = async (getUrl = '', actionFunc, dispatch, )=>{
  
    const response = await fetch('https://api.kinopoisk.dev'+getUrl, {
        method: 'GET',
        headers: {
          
              
            'X-API-KEY': 'V26YNBD-WSK43E2-NBSHTSG-5WS5CKK',
        }
    });
    const data =  response.json();
    data.then((data)=>{
        dispatch(actionFunc(data))
    })
    return data
}