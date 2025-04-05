import React, { useEffect, useState } from 'react';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';

const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex relative">
      <LeftSidebar />
              <main className={`flex-1 ${isMobile ? 'ml-0 mb-16' : 'ml-[16%]'}`}>
                <div className="flex flex-col md:flex-row">
                  <div className={`${isMobile ? 'w-full' : 'w-[70%]'}`}>
                    {children}
                  </div>
                  <div className={`${isMobile ? 'hidden' : 'w-[30%]'}`}>
                    <RightSidebar />
                  </div>
                </div>
              </main>
            </div>
  );
};

export default Layout;
