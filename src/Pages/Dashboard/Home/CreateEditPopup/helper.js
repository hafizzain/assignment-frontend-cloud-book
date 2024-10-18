import { AddCollaboratorToBookApi, CreateBookApi, DeleteCollaboratorToBookApi, getCollaborators, UpdateBookApi } from "@/Adapters/Apis/Books"
import { objectKeyConvertToArray } from "@/Hooks/useObjectKeys"
import useSetDataInLocalStorage from "@/Hooks/useSetDataInLocalStorage"
import useValidations from "@/Hooks/useValidations"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

let initialData = {
    title: ""
}
const useCreateEditHelper = (editData, successCallback, close) => {
    const dispatch = useDispatch()

    const { getDataFromLocalStorage } = useSetDataInLocalStorage()
    const access_token = getDataFromLocalStorage("access_token")
    const role = getDataFromLocalStorage("role")
console.log(access_token)
    const { errors, setErrors, validation } = useValidations()

    // states
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState(initialData)
    const [collaborators, setCollaborators] = useState([])
    const [selectedCollaborators, setSelectedCollaborators] = useState([])

    useEffect(() => {
        if (editData?.id) {
            setFormData({
                title: editData?.title
            })

            if (role == "author") {
                getCollaboratorsApi()
            }
        }
    }, [editData, role])

    useEffect(() => {
        if (editData?.id) {
            setSelectedCollaborators(editData?.collaborators?.map(itm => itm?.id))
        }
    }, [editData, collaborators])

    // get collaborators
    const getCollaboratorsApi = () => {
        const success = (data) => {
            setCollaborators(data?.map(itm => ({
                label: itm?.name,
                value: itm?.id
            })))
        };
        const fail = () => {
            setCollaborators([])
        };
        dispatch(getCollaborators(access_token, success, fail));
    };

    // handle change
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
        setErrors((prev) => ({
            ...prev,
            [name]: ''
        }))
    }

    // handle close popup
    const handleClosePopup = () => {
        setFormData(initialData)
        setErrors()
        close && close(false)
    }

    // handle submit function
    const handleSubmit = () => {
        const success = () => {
            setLoading(false)
            successCallback && successCallback()
        }
        const fail = () => {
            setLoading(false)
        }
        let payload = {
            ...formData
        }
        let requiredFields = { ...formData }
        setErrors(validation(requiredFields));
        let result = validation(requiredFields);
        if (objectKeyConvertToArray(result)?.length == 0) {
            setLoading(true)
            if (editData?.id) {
                payload = {
                    ...payload,
                    id: editData?.id
                }
                dispatch(UpdateBookApi(access_token, payload, success, fail))
            } else {
                dispatch(CreateBookApi(access_token, payload, success, fail))
            }
        }
    }

    // add collaborator to book
    const addCollaboratorToBook = (id) => {
        setSelectedCollaborators([...selectedCollaborators, id])
        const success = () => { }
        const fail = () => { }
        const payload = {
            book_id: editData?.id,
            user_id: id,
            permission: "write"
        }
        dispatch(AddCollaboratorToBookApi(access_token, payload, success, fail))
    }


    // delete collaborator from book
    const deleteCollaboratorFromBook = (id) => {
        setSelectedCollaborators(selectedCollaborators?.filter(itm => itm != id))
        const success = () => { 
            successCallback && successCallback(true)
        }
        const fail = () => { }
        const payload = {
            book_id: editData?.id,
            user_id: id
        }
        dispatch(DeleteCollaboratorToBookApi(access_token, payload, success, fail))
    }


    return {
        formData, handleChange, errors, handleSubmit, loading, handleClosePopup, collaborators, role, addCollaboratorToBook,
        selectedCollaborators, deleteCollaboratorFromBook
    }
}

export default useCreateEditHelper