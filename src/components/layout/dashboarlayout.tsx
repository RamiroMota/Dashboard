import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Footer from './footer';
import { useStore } from '../store/useStore';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const darkMode = useStore((state) => state.darkMode);

  return (
    <div className={`flex min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className={`
        fixed inset-y-0 left-0 z-50 lg:relative transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out hidden md:block
      `}>
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col relative">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6 pb-24 md:pb-6">
          <Outlet />
        </main>

        <div className="hidden md:block">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;