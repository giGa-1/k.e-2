export const getActorUnOAPI = async (id)=>{
    const response = await fetch('https://kinopoiskapiunofficial.tech/api/v1/staff/'+id, {
        headers: {
            'X-API-KEY': '5db2a827-53a4-45e9-ba4c-497516d97017',
            'accept': 'application/json',
        }
    })
    const data = response.json();
    return data
}