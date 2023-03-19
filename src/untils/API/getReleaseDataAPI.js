

export const getReleaseDataAPI = async (month) => {
    const response = await fetch('/api/releases?month='+month)
    const data = response.json()
    return data
}