import Cookies from "js-cookie";
import { useEffect, useState } from "react"

const useDashboardHelper = () => {
    // states
    const [expandSidebar, setExpandSidebar] = useState(Cookies.get('expandSidebar') === 'true');
    const [ActivePage, setActivePage] = useState('/');

    // Update the cookie whenever `expandSidebar` changes
    useEffect(() => {
        Cookies.set('expandSidebar', expandSidebar);
    }, [expandSidebar]);


    return {
        expandSidebar, setExpandSidebar, ActivePage, setActivePage
    }
}

export default useDashboardHelper