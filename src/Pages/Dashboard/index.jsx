import Sidebar from '@/Components/Sidebar';
import Topbar from '@/Components/Topbar';
import { Outlet } from 'react-router-dom';
import useDashboardHelper from './helper';

const Dashboard = () => {
    const { expandSidebar, setExpandSidebar, ActivePage, setActivePage } = useDashboardHelper()
    return (
        <>
            <div className="h-screen w-screen overflow-hidden">
                <Topbar
                    setExpandSidebar={setExpandSidebar}
                    expandSidebar={expandSidebar}
                />
                <div className="flex flex-1">
                    <Sidebar setActivePage={setActivePage} ActivePage={ActivePage}
                        expandSidebar={expandSidebar}
                        setExpandSidebar={setExpandSidebar}
                    />
                    <main className="flex-1 sm:ml-0 ml-14 p-4 bg-gray-100 overflow-auto h-[calc(100vh-5rem)]">
                        <Outlet />
                    </main>
                </div>
            </div>

        </>
    )
}

export default Dashboard