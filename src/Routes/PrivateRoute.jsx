import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const accessToken = JSON.parse(localStorage.getItem('access_token')) || Cookies.get('access_token');
    const refreshToken = JSON.parse(localStorage.getItem('refresh_token')) || Cookies.get('refresh_token');

    // Get user_data from localStorage
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const countryId = userData?.country_id;

    // Check if accessToken or refreshToken exists and countryId is not null
    const isAuthenticated = (accessToken || refreshToken) && countryId !== null;

    return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;