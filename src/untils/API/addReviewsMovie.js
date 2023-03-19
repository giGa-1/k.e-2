export const addReviewsMovie = async (id, body)=>{
    const response = await fetch('/api/movie/'+id+'/comments/add', {
    method:'POST',
    headers: {
        'Content-type':'application/json',
    },
    body: JSON.stringify(body)
    });
    // D:\www\FREELANCE\kino-effect-max\k.e-2\pages\api\movie\[id]\comments\get.js
    const data  = response.json();
    return data
}