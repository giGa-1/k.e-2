export const deleteFavAPI = async (id) => {
    const response = await fetch('/api/user/favorites/movie/remove?id='+id)
    const data = response.json()
    return data
}