import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-3.5rem)]">
        {/* Sidebar */}
        {!isSidebarOpen && (
          <div className="sidebar-overlay fixed inset-0 bg-black/50 dark:bg-black/800 backdrop-blur-sm z-30" onClick={toggleSidebar} />
        )}
        <Sidebar 
          className={`sidebar-transition ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'} w-64`}
        />

        {/* Main Content Area */}
        <main className={`flex-1 p-6 sm:p-8 ${isSidebarOpen ? 'ml-[256px]' : 'ml-0'} transition-all duration-200`}>
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;