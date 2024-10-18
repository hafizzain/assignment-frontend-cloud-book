import Cookies from "js-cookie";

export default function useSetDataInLocalStorage() {

    const storeDataInLocalStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    }

    const storeDataInSessionStorage = (key, data) => {
        if (data) {
            sessionStorage.setItem(key, JSON.stringify(data));
        }
    }

    const removeDataFromSessionStorage = (key) => {
        sessionStorage.removeItem(key);
    };

    const getDataFromSessionStorage = (key) => {
        const sessionStorageData = sessionStorage.getItem(key);
        if (sessionStorageData) {
            try {
                const result = JSON.parse(sessionStorageData);
                return result;
            } catch (e) {
                // If parsing fails, return the raw string
                return sessionStorageData;
            }
        }
        return null
    }


    const getDataFromLocalStorage = (key) => {
        const localStorageData = localStorage.getItem(key);
        if (localStorageData && localStorageData !== 'undefined') {
            try {
                // Attempt to parse the localStorage data as JSON
                const result = JSON.parse(localStorageData);
                return result;
            } catch (e) {
                // If parsing fails, return the raw string
                return localStorageData;
            }
        }
        return null;
    };

    const storeUserData = (response) => {
        let user_data = { ...response?.data?.response }
        delete user_data.message
        delete user_data.tokens
        delete user_data.token_expiry
        storeDataInLocalStorage("user_data", user_data)
        storeDataInLocalStorage("access_token", response?.data?.response?.tokens?.access)
        storeDataInLocalStorage("refresh_token", response?.data?.response?.tokens?.refresh)
        storeDataInLocalStorage("token_expiry", response?.data?.response?.token_expiry)
        Cookies.set("access_token", response?.data?.response?.tokens?.access)
        Cookies.set("refresh_token", response?.data?.response?.tokens?.refresh)
    }

    return {
        storeDataInLocalStorage,
        getDataFromLocalStorage,
        storeDataInSessionStorage,
        getDataFromSessionStorage,
        removeDataFromSessionStorage,
        storeUserData
    }
}
