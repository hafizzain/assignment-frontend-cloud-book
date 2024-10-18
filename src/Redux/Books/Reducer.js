import { ADD_BOOKS_DATA, DELETE_BOOKS_DATA, GET_BOOKS_DATA, UPDATE_BOOKS_DATA } from "./ActionType";

const initialState = {
    books: []
}

const BooksReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_BOOKS_DATA:
            return {
                ...state,
                books: payload
            }
        case ADD_BOOKS_DATA:
            return {
                ...state,
                books: [payload, ...state.books]
            }
        case UPDATE_BOOKS_DATA:
            let filteredBook = state?.books?.filter(itm => itm?.id != payload?.id)
            return {
                ...state,
                books: [payload, ...filteredBook]
            }
        case DELETE_BOOKS_DATA:
            return {
                ...state,
                books: state?.books?.filter(itm => itm?.id != payload)
            }
        default:
            return {
                ...state,
            };
    }
}

export default BooksReducer