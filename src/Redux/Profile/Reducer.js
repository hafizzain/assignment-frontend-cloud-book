import { GET_USER_DATA } from "./ActionType";

const initialState = {
    user_data: {}
}

const ProfileReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_USER_DATA:
            return {
                ...state,
                user_data: payload
            }
        default:
            return {
                ...state,
            };
    }
}

export default ProfileReducer