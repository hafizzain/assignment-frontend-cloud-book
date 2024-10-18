import { getUserProfile } from "@/Adapters/Apis/Auth"
import useSetDataInLocalStorage from "@/Hooks/useSetDataInLocalStorage"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"

const useMainLayout = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const { getDataFromLocalStorage, storeDataInLocalStorage } = useSetDataInLocalStorage()
    const access_token = getDataFromLocalStorage("access_token")

    // states
    const [accessToken, setAccessToken] = useState(access_token)

    useEffect(() => {
        if (accessToken) {
            getProfileData()
        }
    }, [location.pathname, accessToken])

    useEffect(() => {
        // check if access token updates in local
        const checkToken = () => {
            const storedToken = JSON.parse(localStorage.getItem("access_token"))
            if (storedToken != accessToken) {
                setAccessToken(storedToken)
            }
        }

        // set interval
        const intervalId = setInterval(checkToken, 1000)

        // cleanup
        return () => clearInterval(intervalId)
    }, [accessToken])

    // get profile data
    const getProfileData = () => {
        const success = (data) => {
            let updatedData = { ...data?.user }
            storeDataInLocalStorage("user_data", updatedData)
            storeDataInLocalStorage("role", data?.role)
        }
        const fail = () => { }
        dispatch(getUserProfile(access_token, success, fail))
    }

    return {}
}

export default useMainLayout