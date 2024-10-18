import { logoutUserApi } from "@/Adapters/Apis/Auth"
import { logoutfunction } from "@/Constants/Functions/logout"
import useSetDataInLocalStorage from "@/Hooks/useSetDataInLocalStorage"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const useLogoutHelper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { getDataFromLocalStorage } = useSetDataInLocalStorage()
    const access_token = getDataFromLocalStorage("access_token")

    // states
    const [logoutLoader, setLogoutLoader] = useState(false)

    // logout api call
    const logoutUser = () => {
        const success = () => {
        }
        const fail = () => {
            setLogoutLoader(false)
        }
        setTimeout(() => {
            logoutfunction()
        }, 300);
        setLogoutLoader(true)
        dispatch(logoutUserApi(access_token, success, fail))
    }

    return {
        logoutUser, navigate, logoutLoader
    }
}

export default useLogoutHelper