import {  GET_USER_DATA } from "./ActionType";

export const getUserDataFromApi = (data) => {
    return {
        type: GET_USER_DATA,
        payload: data
    }
};