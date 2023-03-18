export const setUserSignIn = async ( loginMail, password)=>{
    const response = await fetch(`/api/user/login?email=${loginMail}&password=${password}`)
    const data = response.json();
    return data
}