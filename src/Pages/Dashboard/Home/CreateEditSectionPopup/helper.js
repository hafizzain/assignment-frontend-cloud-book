import { CreateBookSectionApi, CreateBookSubSectionApi, UpdateBookSectionApi, UpdateBookSubSectionApi } from "@/Adapters/Apis/Books"
import { objectKeyConvertToArray } from "@/Hooks/useObjectKeys"
import useSetDataInLocalStorage from "@/Hooks/useSetDataInLocalStorage"
import useValidations from "@/Hooks/useValidations"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

let initialData = {
    title: "",
    content: ""
}
const useCreateEditHelper = (editData, successCallback, close, bookData, isSubSection, sectionData, isChild) => {
    const dispatch = useDispatch()

    const { getDataFromLocalStorage } = useSetDataInLocalStorage()
    const access_token = getDataFromLocalStorage("access_token")

    const { errors, setErrors, validation } = useValidations()

    // states
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState(initialData)
    console.log(bookData, sectionData, isSubSection)
    useEffect(() => {
        if (editData?.id) {
            setFormData({
                title: editData?.title,
                content: editData?.content
            })
        }
    }, [editData])

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
            ...formData,
            book_id: bookData?.id
        }
        let requiredFields = { ...formData }
        setErrors(validation(requiredFields));
        let result = validation(requiredFields);
        if (objectKeyConvertToArray(result)?.length == 0) {
            setLoading(true)
            if (isSubSection) {
                payload = {
                    ...payload,
                    section_id: sectionData?.section_id
                }
                if (isChild) {
                    payload = {
                        ...payload,
                        parent_subsection_id: sectionData?.id
                    }
                }
                if (editData?.id) {
                    payload = {
                        ...payload,
                        id: editData?.id
                    }
                    dispatch(UpdateBookSubSectionApi(access_token, payload, success, fail))
                } else {
                    dispatch(CreateBookSubSectionApi(access_token, payload, success, fail))
                }
            } else {
                if (editData?.id) {
                    payload = {
                        ...payload,
                        id: editData?.id
                    }
                    dispatch(UpdateBookSectionApi(access_token, payload, success, fail))
                } else {
                    dispatch(CreateBookSectionApi(access_token, payload, success, fail))
                }
            }
        }
    }


    return {
        formData, handleChange, errors, handleSubmit, loading, handleClosePopup
    }
}

export default useCreateEditHelper