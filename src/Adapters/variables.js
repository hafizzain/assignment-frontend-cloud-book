// Concatenating the base URL from env variables
export const BASE_URL = `${import.meta.env.VITE_APP_SERVER_BASEURL_START}${import.meta.env.VITE_APP_SERVER_BASEURL_END}`;

// Backend URL if needed separately
export const BACKEND_BASE_URL = import.meta.env.VITE_APP_BACKEND_BASEURL || 'https://192.168.18.31:8000/';


// AUTH
export const register_api = "register"
export const login_api = "login"
export const get_profile_api = "me"
export const logout_api = "logout"

// BOOKS
export const get_books_api = "books"

// SECTIONS
export const get_sections_api = "sections"

// SUB SECTIONS
export const get_sub_sections_api = "sub_section"
export const delete_sub_sections_api = "sub_sections"

// COLLABORATORS
export const collaborator_api = "collaborators"
