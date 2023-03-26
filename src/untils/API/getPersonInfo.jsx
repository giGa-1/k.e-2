

export const getPersonInfo = async (namePerson)=>{
    const response = await fetch('/api/actor/wiki?name='+namePerson)
    const data = response.json()
    return data
}