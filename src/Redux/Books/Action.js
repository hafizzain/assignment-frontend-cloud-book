import {  ADD_BOOKS_DATA, DELETE_BOOKS_DATA, GET_BOOKS_DATA, UPDATE_BOOKS_DATA } from "./ActionType";

export const getBooksDataFromApi = (data) => {
    return {
        type: GET_BOOKS_DATA,
        payload: data
    }
};

export const addBooksDataFromApi = (data) => {
    return {
        type: ADD_BOOKS_DATA,
        payload: data
    }
};

export const updateBooksDataFromApi = (data) => {
    return {
        type: UPDATE_BOOKS_DATA,
        payload: data
    }
};

export const deleteBooksDataFromApi = (data) => {
    return {
        type: DELETE_BOOKS_DATA,
        payload: data
    }
};