

export const getReviewsMovie = async (id)=>{
    const response = await fetch('/api/movie/'+id+'/comments/get');
    // D:\www\FREELANCE\kino-effect-max\k.e-2\pages\api\movie\[id]\comments\get.js
    const data  = response.json();
    return data
}