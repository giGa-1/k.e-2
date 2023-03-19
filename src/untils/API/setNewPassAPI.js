export const setNewPassAPI = async (oldPass, pass) => {
    const response = await fetch(`/api/user/change/password?oldPassword=${oldPass}&password=${pass}`);
    return response.json()
}