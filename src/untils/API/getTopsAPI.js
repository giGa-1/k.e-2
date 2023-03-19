export const getTopsAPI = async ()=>{
    const responce = await fetch('/api/tops');
    const data = responce.json();
    return data
}