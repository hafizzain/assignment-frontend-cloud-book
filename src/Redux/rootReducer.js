import { combineReducers } from "redux";
import ProfileReducer from "./Profile/Reducer";
import BooksReducer from "./Books/Reducer";

const Reducers = combineReducers({
    profile: ProfileReducer,
    books: BooksReducer
})

export default Reducers;
