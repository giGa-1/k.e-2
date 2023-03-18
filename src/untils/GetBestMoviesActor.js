

export const GetBestMoviesActor = (stateMovie = [] ,lengthArrResult) => {
    
return [...stateMovie.reduce(
    (res, cur) =>
        res.find((find) => find.id == cur.id)
            ? res
            : [...res, cur],
    []
).filter(e=>e.name!==null&&e.name.length<45&&e.description.split` `[0] != 'играет'&&e.description)].sort((a,b)=>(+(b.rating))-(+(a.rating))).filter((e,i)=>i<lengthArrResult)

}