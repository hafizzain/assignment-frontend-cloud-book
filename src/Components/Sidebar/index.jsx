import { Link } from 'react-router-dom';
import useSidebar from './helper.jsx';

const Sidebar = () => {
  const { location, Routes } = useSidebar();

  return (
    <aside className={`sm:bg-[rgba(50,52,200,0.07)] bg-[rgb(247,247,247)] text-sm h-full sm:static fixed space-y-5 max-h-[calc(100vh-5rem)] overflow-y-auto min-h-[calc(100vh-5rem)] border-r border-[#E5E6EE] py-4 px-1 z-[16] transition-all`}>
      <div className='space-y-3'>
          {Routes?.map((item, index) => {
            const activePage = location.pathname?.split('/')[2]?.includes(item.url) || (location.pathname?.split('/')?.length === 2 && item.url == 'dashboard') || (location.pathname?.split('/')[2] == '/' && item.url == 'dashboard');
            return (
              <Link to={item.link} key={index} className={`flex items-center h-11 p-3 gap-5 transition-all rounded-lg hover:bg-[#E5E5F2] ${activePage ? 'bg-[#E5E5F2]' : ''} text-[#3F3F3F]`}>
                <span className={`font-medium transition-all`}>
                  {item?.name}
                </span>
              </Link>
            );
          })}
      </div>
    </aside>
  );
};

export default Sidebar;
