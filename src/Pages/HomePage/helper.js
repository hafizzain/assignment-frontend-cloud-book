import { useDispatch } from "react-redux"
import useSetDataInLocalStorage from "@/Hooks/useSetDataInLocalStorage"
import { useNavigate } from "react-router-dom"

const useHomeHelper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { storeDataInLocalStorage, getDataFromLocalStorage } = useSetDataInLocalStorage()

    // Parse URL parameters
    const queryParams = new URLSearchParams(location.search);

    return {
    }
}

export default useHomeHelper