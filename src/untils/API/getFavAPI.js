export const getFavAPI = async (id='') => {
    const response = await fetch('/api/user/favorites/movie/getall'+id)
    const data = response.json()
    return data
}

export const addFavAPI = async (id) => {
    const response = await fetch('/api/user/favorites/movie/add?id='+id)
    const data = response.json()
    return data
}

export const addFavActorAPI = async (id) => {
    const response = await fetch('/api/user/favorites/actir/add?id='+id)
    const data = response.json()
    return data
}