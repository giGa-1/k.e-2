export const getMoviesBlankAPI = async (url,)=>{
    const responce = await fetch('/api/'+url);
    const data = responce.json();
    return data
}