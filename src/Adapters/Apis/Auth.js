import axios from "axios";
import { BASE_URL, get_profile_api, login_api, logout_api, register_api } from "../variables";
import { toast } from "react-toastify";
import { getUserDataFromApi } from "@/Redux/Profile/Action";

// register user api
export const registerUser = (data, success, fail) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}${register_api}`, data);
        console.log(response, 'Res')
        if (response?.status == 201) {
            if (response?.data?.status == "201") {
                success && success(response?.data);
                toast.success("User registered successfully", {
                    toastId: 'toast'
                })
            }
        }
    } catch (error) {
        console.log(error)
        if (error?.response?.data?.errors?.email?.length > 0) {
            toast.error(error?.response?.data?.errors?.email[0], {
                toastId: 'toast'
            })
        }
        fail && fail()
        return error;
    }
}


// login user api
export const loginUser = (data, success, fail) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}${login_api}`, data);
        if (response?.status == 200) {
            if (response?.data?.status == "200") {
                success && success(response?.data);
                toast.success("User login successfully", {
                    toastId: 'toast'
                })
            }
        }
    } catch (error) {
        if (error?.response?.status == "401") {
            toast.error(error?.response?.data?.message, {
                toastId: 'toast'
            })
        }
        fail && fail()
        return error;
    }
}


// get user profile data
export const getUserProfile = (access_token, success, fail) => async (dispatch) => {
    const headers = {
        headers: {
            'authorization': `Bearer ${access_token}`
        }
    }
    try {
        const response = await axios.get(`${BASE_URL}${get_profile_api}`, headers);
        if (response?.status == 200) {
            if (response?.data?.status == "200") {
                success && success(response?.data);
                dispatch(getUserDataFromApi(response?.data?.user))
            }
        }
    } catch (error) {
        fail && fail()
        return error;
    }
}


// logout api to delete user token
export const logoutUserApi = (access_token, success, fail) => async (dispatch) => {
    const headers = {
        headers: {
            'authorization': `Bearer ${access_token}`
        }
    }
    try {
        const response = await axios.post(`${BASE_URL}${logout_api}`, {}, headers);
        if (response?.status == 200) {
            if (response?.data?.status == "200") {
                success && success(response?.data);
            }
        }
    } catch (error) {
        console.log(error)
        fail && fail()
        return error;
    }
}

