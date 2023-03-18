export const setNewUserReg = async (userName, loginMail, password)=>{
    const response = await fetch(`/api/user/register?email=${loginMail}&username=${userName}&password=${password}`)
    const data = response.json();
    return data
}