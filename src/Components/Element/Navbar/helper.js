import {  useState } from "react";
import useSetDataInLocalStorage from "@/Hooks/useSetDataInLocalStorage";

const AUTH_MODE = {
    LOGIN: "LOGIN",
    SIGNUP: "SIGNUP",
    NONE: "NONE",
};

const useNavbar = () => {
    const { getDataFromLocalStorage } = useSetDataInLocalStorage();
    const access_token = getDataFromLocalStorage("access_token");
    const user_data = getDataFromLocalStorage("user_data");

    // states
    const [authMode, setAuthMode] = useState(AUTH_MODE.NONE);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [logoutConfirmation, setLogoutConfirmation] = useState(false)

    // open Login Popup
    const openLogin = () => {
        setAuthMode(AUTH_MODE.LOGIN);
        setDialogOpen(true);
    };

    // open Signup Popup
    const openSignup = () => {
        setAuthMode(AUTH_MODE.SIGNUP);
        setDialogOpen(true);
    };

    // handle dialog change
    const handleDialogChange = () => {
        setDialogOpen(false);
    }

    return {
        access_token, user_data, AUTH_MODE, authMode,  openLogin, openSignup,
        isDialogOpen, setDialogOpen, logoutConfirmation, setLogoutConfirmation, handleDialogChange,
    };
};

export default useNavbar;
