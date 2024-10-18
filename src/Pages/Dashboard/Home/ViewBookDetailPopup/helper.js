import { DeleteBookSectionApi, DeleteBookSubSectionApi } from "@/Adapters/Apis/Books"
import useSetDataInLocalStorage from "@/Hooks/useSetDataInLocalStorage"
import { useState } from "react"
import { useDispatch } from "react-redux"

const useViewBookDetailPopup = (editData, successCallback, close) => {
    const dispatch = useDispatch()

    const { getDataFromLocalStorage } = useSetDataInLocalStorage()
    const access_token = getDataFromLocalStorage("access_token")
    const role = getDataFromLocalStorage("role")

    // states
    const [createSection, setCreateSection] = useState(false)
    const [editSection, setEditSection] = useState(false)
    const [showDeleteSectionPopup, setShowDeleteSectionPopup] = useState(false)
    const [deleteLoader, setDeleteLoader] = useState(false)
    const [createSubSection, setCreateSubSection] = useState(false)
    const [editSubSection, setEditSubSection] = useState(false)
    const [showDeleteSubSectionPopup, setShowDeleteSubSectionPopup] = useState(false)
    const [deleteSubSectionLoader, setDeleteSubSectionLoader] = useState(false)
    const [isChild, setIsChild] = useState(false)

    // handle close popup
    const handleClosePopup = () => {
        // setFormData(initialData)
        // setErrors()
        close && close(false)
    }

    // delete section data
    const DeleteSection = () => {
        let payload = {
            id: showDeleteSectionPopup?.id
        };
        const success = () => {
            setDeleteLoader(false);
            successCallback(true);
        };
        const fail = () => {
            setDeleteLoader(false);
        };
        setDeleteLoader(true);
        dispatch(DeleteBookSectionApi(access_token, payload, success, fail));
    };

    // delete sub section data
    const DeleteSubSection = () => {
        let payload = {
            id: showDeleteSubSectionPopup?.id
        };
        const success = () => {
            setDeleteSubSectionLoader(false);
            successCallback(true);
        };
        const fail = () => {
            setDeleteSubSectionLoader(false);
        };
        setDeleteSubSectionLoader(true);
        dispatch(DeleteBookSubSectionApi(access_token, payload, success, fail));
    };


    return {
        handleClosePopup, createSection, setCreateSection, editSection, setEditSection, showDeleteSectionPopup,
        setShowDeleteSectionPopup, deleteLoader, DeleteSection, createSubSection, setCreateSubSection,
        editSubSection, setEditSubSection, showDeleteSubSectionPopup, setShowDeleteSubSectionPopup, deleteSubSectionLoader,
        DeleteSubSection, isChild, setIsChild, role
    }
}

export default useViewBookDetailPopup