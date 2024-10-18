import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useSetDataInLocalStorage from '@/Hooks/useSetDataInLocalStorage';
// import useLogoutHelper from './Logout/helper';
// import { topLayout } from '@/Adapters/Apis/TokenRefresh';

const SessionCleanup = () => {
  const location = useLocation();
  // const { logoutUser } = useLogoutHelper();

  const { getDataFromLocalStorage } = useSetDataInLocalStorage();
  // const [tokenExpiry, setTokenExpiry] = useState(getDataFromLocalStorage('token_expiry'));

  // Cleanup session data based on route
  useEffect(() => {
    if (location.pathname !== '/otp-verification' && location.pathname !== '/change-password') {
      sessionStorage.removeItem('signupData');
      sessionStorage.removeItem('resetData');
    }
  }, [location]);

  // Effect to listen for changes in token expiry in localStorage and token expiry countdown
  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const newExpiry = getDataFromLocalStorage('token_expiry');
  //     if (newExpiry !== tokenExpiry) {
  //       setTokenExpiry(newExpiry);
  //     }
  //   };

  //   // Set an interval to check for changes in localStorage every second
  //   const localStorageCheckInterval = setInterval(() => {
  //     handleStorageChange();
  //   }, 1000); // Check every second

  //   // Token expiry check running every second
  //   if (tokenExpiry) {
  //     const expiryTime = new Date(tokenExpiry).getTime(); // Convert to milliseconds

  //     // Set an interval to check the token expiry every second
  //     const expiryInterval = setInterval(() => {
  //       const currentTime = new Date().getTime();
  //       const timeRemaining = expiryTime - currentTime;

  //       // If the token has expired, log the user out
  //       if (timeRemaining <= 0) {
  //         logoutUser();
  //         clearInterval(expiryInterval); // Clear the interval once the user is logged out
  //       }
  //     }, 1000); // Check every second

  //     // Cleanup the interval when the component unmounts or when token changes
  //     return () => {
  //       clearInterval(localStorageCheckInterval);
  //       clearInterval(expiryInterval);
  //     };
  //   }

  //   // Cleanup the interval when the component unmounts
  //   return () => clearInterval(localStorageCheckInterval);
  // }, []);

  return <></>; // Return an empty fragment to render the component
};

export default SessionCleanup;
