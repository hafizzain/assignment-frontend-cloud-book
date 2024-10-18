import useSetDataInLocalStorage from "@/Hooks/useSetDataInLocalStorage"
import { useEffect, useState } from "react"

const useTopbar = () => {

    const { getDataFromLocalStorage } = useSetDataInLocalStorage()
    const user_data = getDataFromLocalStorage('user_data')

    // states
    const [logoutConfirmation, setLogoutConfirmation] = useState(false)
    const [profileData, setProfileData] = useState(user_data)

    useEffect(() => {
        // check if access token updates in local
        const checkToken = () => {
            const storedData = JSON.parse(localStorage.getItem("user_data"))
            if (storedData?.id != profileData?.id) {
                setProfileData(storedData)
            }
        }

        // set interval
        const intervalId = setInterval(checkToken, 1000)

        // cleanup
        return () => clearInterval(intervalId)
    }, [profileData])

    return {
        profileData, logoutConfirmation, setLogoutConfirmation,
    }
}

export default useTopbar