export const getNewsAPIjs = async ()=>{
    const response = await fetch('/api/news'); 
    const data = response.json();
    return data
}