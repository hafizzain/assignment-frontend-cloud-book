import useLogoutHelper from "@/Components/Logout/helper";
import { useEffect } from "react";
import useSetDataInLocalStorage from "./useSetDataInLocalStorage";

const useAutoLogoutHelper = () => {
    const { logoutUser } = useLogoutHelper();

    const { getDataFromLocalStorage } = useSetDataInLocalStorage();
    const tokenExpiry = getDataFromLocalStorage('token_expiry');

    console.log('Token Expiry Retrieved:', tokenExpiry); // Debug log for token expiry

    useEffect(() => {
        console.log('useEffect ran'); // Log when useEffect runs

        // Retrieve token expiry from localStorage
        const tokenExpiry = getDataFromLocalStorage('token_expiry');

        if (tokenExpiry) {
            const expiryTime = new Date(tokenExpiry).getTime(); // Convert to milliseconds
            const currentTime = new Date().getTime();
            console.log('Expiry Time:', expiryTime, 'Current Time:', currentTime); // Log both times

            // Calculate the time difference until the token expires
            const timeRemaining = expiryTime - currentTime;
            console.log('Time Remaining:', timeRemaining); // Log the time remaining

            if (timeRemaining > 0) {
                // Set a timeout to logout the user when the token expires
                const timer = setTimeout(() => {
                    console.log('Logging out the user due to token expiry'); // Log before logout
                    logoutUser();
                }, timeRemaining);

                // Clear the timer if the component unmounts
                return () => clearTimeout(timer);
            } else {
                // If token already expired, logout immediately
                console.log('Token already expired, logging out now');
                logoutUser();
            }
        } else {
            console.log('No token expiry found in localStorage'); // Log if no token found
        }
    }, []);

    return {
        tokenExpiry
    };
}

export default useAutoLogoutHelper;
