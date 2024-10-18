import Cookies from "js-cookie"

export const logoutfunction = () => {
    localStorage.removeItem('user_data')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
    localStorage.clear()
    window.location.href = "/"
}

export const logoutfunctionWithoutRedirection = () => {
    localStorage.removeItem('user_data')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
    localStorage.clear()
}
