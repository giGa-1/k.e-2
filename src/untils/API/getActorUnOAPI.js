export const getActorUnOAPI = async (id)=>{
    const response = await fetch('https://kinopoiskapiunofficial.tech/api/v1/staff/'+id, {
        headers: {
            'X-API-KEY': '8cf31ece-1bd7-4c03-824e-7613feddfdb3',
            'accept': 'application/json',
        }
    })
    const data = response.json();
    return data
}