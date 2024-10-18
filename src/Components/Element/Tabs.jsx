import React from 'react';
import { useSearchParams } from 'react-router-dom';


const Tabs = ({tabs, param, defaultActiveParam}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get(param) || defaultActiveParam;

  const handleTabClick = (tab) => {
    setSearchParams({ tab });
  };

  return (
    <div className="overflow-x-auto">
      <nav className="flex space-x-4 py-4 whitespace-nowrap">
        <div className="border-b border-solid w-full transition-all space-x-2">
          {tabs?.map((tab) => (
            <button
              key={tab?.name}
              onClick={() => handleTabClick(tab.param)}
              className={` py-2 px-4 border-b-4 rounded transition-all ${activeTab === tab.param ? 'border-[#03045D]' : 'border-transparent hover:border-[#03045D]'
                }`}
            >
              {tab?.name}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Tabs;
