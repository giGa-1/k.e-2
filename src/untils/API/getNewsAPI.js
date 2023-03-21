export const getNewsAPIjs = async (urlApi)=>{
    const response = await fetch('/api/news?'+urlApi); 
    const data = response.json();
    return data;
}