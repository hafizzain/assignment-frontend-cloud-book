import { registerUser } from "@/Adapters/Apis/Auth"
import { objectKeyConvertToArray } from "@/Hooks/useObjectKeys"
import useSetDataInLocalStorage from "@/Hooks/useSetDataInLocalStorage"
import useValidations from "@/Hooks/useValidations"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

let initialData = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: ""
}

let defaultRoles = [
    { label: "Author", value: "author" },
    { label: "Collaborator", value: "collaborator" }
]
const useSignupHelper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { storeDataInLocalStorage } = useSetDataInLocalStorage()

    const { errors, setErrors, emailValidation, validation } = useValidations()

    // states
    const [formData, setFormData] = useState(initialData)
    const [loading, setLoading] = useState(false)

    // handle change function
    const handleChange = (e) => {
        const { name, value } = e.target
        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }))
        if (name == "email") {
            emailValidation(name, value)
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }))
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }))
        }
    }

    // handle submit function
    const handleSubmit = () => {
        let requiredFields = { ...formData }
        const err = validation(requiredFields)
        if (formData?.email) {
            emailValidation("email", formData?.email)
        }
        let result = {
            ...err,
            ...(errors?.email ? { email: errors?.email } : {})
        }
        setErrors(result)
        if (objectKeyConvertToArray(result).length == 0) {
            const success = (data) => {
                let updatedData = { ...data }
                delete updatedData.status
                storeDataInLocalStorage("user_data", updatedData)
                storeDataInLocalStorage("access_token", updatedData?.token)
                setLoading(false)
                setFormData(initialData)
                navigate("/dashboard")
            }
            const fail = () => {
                setLoading(false)
            }
            setLoading(true)
            dispatch(registerUser(formData, success, fail))
        }
    }

    return {
        formData, handleChange, errors, loading, defaultRoles, handleSubmit
    }
}

export default useSignupHelper