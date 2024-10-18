// import { loginUser } from "@/Adapters/Apis/Auth";
import { loginUser } from "@/Adapters/Apis/Auth";
import { objectKeyConvertToArray } from "@/Hooks/useObjectKeys";
import useSetDataInLocalStorage from "@/Hooks/useSetDataInLocalStorage";
import useValidations from "@/Hooks/useValidations";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

let initialState = {
    email: "",
    password: ""
}

const useLoginHelper = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { storeDataInLocalStorage } = useSetDataInLocalStorage()
    const { errors, setErrors, emailValidation, validation } = useValidations();

    // states
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);

    // handle change function
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == "email") {
            setErrors((prev) => ({ ...prev, [name]: "" }));
            emailValidation(name, value);
            setFormData({
                ...formData,
                [name]: value,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    // handle submit signup form
    const handleSubmit = () => {
        const success = (response) => {
            navigate("/dashboard")
            storeDataInLocalStorage("access_token", response?.token)
            setLoading(false)
        }

        const fail = () => {
            setLoading(false)
        }
        let requiredFields = { ...formData }
        setErrors(validation(requiredFields));
        let result = validation(requiredFields);
        if (objectKeyConvertToArray(result)?.length === 0) {
            setLoading(true)
            dispatch(loginUser(formData, success, fail))
        }
    }

    return {
        handleChange, formData, errors, loading, handleSubmit
    }
}

export default useLoginHelper