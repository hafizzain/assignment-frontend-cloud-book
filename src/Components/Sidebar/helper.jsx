import { useLocation } from "react-router-dom";

const useSidebar = () => {
    const location = useLocation();

    const Routes = [
        {
            id: 1,
            url: "dashboard",
            name: "Dashboard",
            link: '/dashboard',
        }
    ]


    return {
        location, Routes
    }
}

export default useSidebar