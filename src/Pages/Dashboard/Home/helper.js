
import { DeleteBookApi, getBooks } from "@/Adapters/Apis/Books";
import useSetDataInLocalStorage from "@/Hooks/useSetDataInLocalStorage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useHomeHelper = () => {
    const dispatch = useDispatch();

    const { getDataFromLocalStorage } = useSetDataInLocalStorage();
    const access_token = getDataFromLocalStorage("access_token")
    const role = getDataFromLocalStorage("role")

    // redux states
    const state = useSelector((state) => state);
    const books = state?.books?.books

    // states
    const [loader, setLoader] = useState(true);
    const [showCreatePopup, setShowCreatePopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [deleteLoader, setDeleteLoader] = useState(false);
    const [showViewPopup, setShowViewPopup] = useState(false);

    // get all book data
    const getAllBooks = () => {
        const success = () => {
            setLoader(false);
        };
        const fail = () => {
            setLoader(false);
        };
        setLoader(true);
        dispatch(getBooks(access_token, success, fail));
    };

    // success callback after post or edit project
    const successCallback = (apiCall) => {
        if (apiCall) {
            getAllBooks()
        }
        setShowCreatePopup(false);
        setShowEditPopup(false);
        setShowDeletePopup(false);
        setShowViewPopup(false);
    };

    // delete book
    const DeleteBook = () => {
        let payload = {
            id: showDeletePopup?.id
        };
        const success = () => {
            setDeleteLoader(false);
            successCallback();
        };
        const fail = () => {
            setDeleteLoader(false);
        };
        setDeleteLoader(true);
        dispatch(DeleteBookApi(access_token, payload, success, fail));
    };

    useEffect(() => {
        getAllBooks()
    }, []);

    return {
        loader, showCreatePopup, setShowCreatePopup, showEditPopup, setShowEditPopup, showDeletePopup, setShowDeletePopup,
        deleteLoader, successCallback, books, DeleteBook, showViewPopup, setShowViewPopup, role
    };
};

export default useHomeHelper;
