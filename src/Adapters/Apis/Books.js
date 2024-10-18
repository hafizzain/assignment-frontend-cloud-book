import axios from "axios";
import { BASE_URL, collaborator_api, delete_sub_sections_api, get_books_api, get_sections_api, get_sub_sections_api } from "../variables";
import { toast } from "react-toastify";
import { addBooksDataFromApi, deleteBooksDataFromApi, getBooksDataFromApi, updateBooksDataFromApi } from "@/Redux/Books/Action";

// get books data
export const getBooks = (access_token, success, fail) => async (dispatch) => {
    const headers = {
        headers: {
            'authorization': `Bearer ${access_token}`
        }
    }
    try {
        const response = await axios.get(`${BASE_URL}${get_books_api}`, headers);
        if (response?.status == 200) {
            success && success(response?.data?.books);
            dispatch(getBooksDataFromApi(response?.data?.books))
        }
    } catch (error) {
        fail && fail()
        return error;
    }
}


// create book
export const CreateBookApi = (access_token, data, success, fail) => async (dispatch) => {
    const headers = {
        headers: {
            'authorization': `Bearer ${access_token}`
        }
    }
    try {
        const response = await axios.post(`${BASE_URL}${get_books_api}`, data, headers);
        if (response?.status == 201) {
            if (response?.data?.status == "201") {
                success && success(response?.data);
                dispatch(addBooksDataFromApi(response?.data?.book))
                toast.success(response?.data?.message, {
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

// delete book
export const DeleteBookApi = (access_token, data, success, fail) => async (dispatch) => {
    const headers = {
        headers: {
            'authorization': `Bearer ${access_token}`
        }
    }
    try {
        const response = await axios.delete(`${BASE_URL}${get_books_api}/${data?.id}`, headers);
        console.log(response, "response")
        if (response?.status == 200) {
            success && success(response?.data);
            dispatch(deleteBooksDataFromApi(data?.id))
            toast.success(response?.data?.message, {
                toastId: 'toast'
            })
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

// update book title
export const UpdateBookApi = (access_token, data, success, fail) => async (dispatch) => {
    const headers = {
        headers: {
            'authorization': `Bearer ${access_token}`
        }
    }
    try {
        const response = await axios.put(`${BASE_URL}${get_books_api}/${data?.id}`, data, headers);
        if (response?.status == 200) {
            if (response?.data?.status == "200") {
                success && success(response?.data);
                dispatch(updateBooksDataFromApi(response?.data?.book))
                toast.success(response?.data?.message, {
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

// Create book section
export const CreateBookSectionApi = (access_token, data, success, fail) => async (dispatch) => {
    const headers = {
        headers: {
            'authorization': `Bearer ${access_token}`
        }
    }
    try {
        const response = await axios.post(`${BASE_URL}${get_sections_api}`, data, headers);
        if (response?.status == 201) {
            if (response?.data?.status == "201") {
                success && success(response?.data);
                toast.success(response?.data?.message, {
                    toastId: 'toast'
                })
            }
        }
    } catch (error) {
        fail && fail()
        return error;
    }
}

// update book section
export const UpdateBookSectionApi = (access_token, data, success, fail) => async (dispatch) => {
    const headers = {
        headers: {
            'authorization': `Bearer ${access_token}`
        }
    }
    try {
        const response = await axios.put(`${BASE_URL}${get_sections_api}/${data?.id}`, data, headers);
        if (response?.status == 200) {
            if (response?.data?.status == "200") {
                success && success(response?.data);
                dispatch(updateBooksDataFromApi(response?.data?.book))
                toast.success(response?.data?.message, {
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

// delete Book Section
export const DeleteBookSectionApi = (access_token, data, success, fail) => async (dispatch) => {
    const headers = {
        headers: {
            'authorization': `Bearer ${access_token}`
        }
    }
    try {
        const response = await axios.delete(`${BASE_URL}${get_sections_api}/${data?.id}`, headers);
        console.log(response, "response")
        if (response?.status == 200) {
            success && success(response?.data);
            dispatch(deleteBooksDataFromApi(data?.id))
            toast.success(response?.data?.message, {
                toastId: 'toast'
            })
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


// Create book section
export const CreateBookSubSectionApi = (access_token, data, success, fail) => async (dispatch) => {
    const headers = {
        headers: {
            'authorization': `Bearer ${access_token}`
        }
    }
    try {
        const response = await axios.post(`${BASE_URL}${get_sub_sections_api}`, data, headers);
        if (response?.status == 201) {
            if (response?.data?.status == "201") {
                success && success(response?.data);
                toast.success(response?.data?.message, {
                    toastId: 'toast'
                })
            }
        }
    } catch (error) {
        fail && fail()
        return error;
    }
}

// update book section
export const UpdateBookSubSectionApi = (access_token, data, success, fail) => async (dispatch) => {
    const headers = {
        headers: {
            'authorization': `Bearer ${access_token}`
        }
    }
    try {
        const response = await axios.put(`${BASE_URL}${get_sub_sections_api}/${data?.id}`, data, headers);
        if (response?.status == 200) {
            if (response?.data?.status == "200") {
                success && success(response?.data);
                dispatch(updateBooksDataFromApi(response?.data?.book))
                toast.success(response?.data?.message, {
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

// delete Book Section
export const DeleteBookSubSectionApi = (access_token, data, success, fail) => async (dispatch) => {
    const headers = {
        headers: {
            'authorization': `Bearer ${access_token}`
        }
    }
    try {
        const response = await axios.delete(`${BASE_URL}${delete_sub_sections_api}/${data?.id}`, headers);
        console.log(response, "response")
        if (response?.status == 200) {
            success && success(response?.data);
            dispatch(deleteBooksDataFromApi(data?.id))
            toast.success(response?.data?.message, {
                toastId: 'toast'
            })
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


// get collaborators
export const getCollaborators = (access_token, success, fail) => async (dispatch) => {
    const headers = {
        headers: {
            'authorization': `Bearer ${access_token}`
        }
    }
    try {
        const response = await axios.get(`${BASE_URL}${collaborator_api}`, headers);
        if (response?.status == 200) {
            success && success(response?.data?.collaborators);
        }
    } catch (error) {
        fail && fail()
        return error;
    }
}

// add collaborator
export const AddCollaboratorToBookApi = (access_token, data, success, fail) => async (dispatch) => {
    const headers = {
        headers: {
            'authorization': `Bearer ${access_token}`
        }
    }
    try {
        const response = await axios.post(`${BASE_URL}${get_books_api}/${data?.book_id}/${collaborator_api}`, data, headers);
        if (response?.status == 200) {
            if (response?.data?.status == "200") {
                success && success(response?.data);
                toast.success(response?.data?.message, {
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

// delete collaborator
export const DeleteCollaboratorToBookApi = (access_token, data, success, fail) => async (dispatch) => {
    const headers = {
        headers: {
            'authorization': `Bearer ${access_token}`
        }
    }
    try {
        const response = await axios.delete(`${BASE_URL}${get_books_api}/${data?.book_id}/${collaborator_api}/${data?.user_id}`, headers);
        if (response?.status == 200) {
            success && success(response?.data);
            toast.success(response?.data?.message, {
                toastId: 'toast'
            })
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