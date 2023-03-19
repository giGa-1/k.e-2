export const setNewMailAPI = async (mail, pass) => {
    const response = await fetch(`/api/user/change/email?password=${pass}&email=${mail}`);
    return response.json()
}