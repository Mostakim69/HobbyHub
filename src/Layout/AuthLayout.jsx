import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
import Sidebar from '../pages/Sidebar';

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>
      <div className="flex flex-1">
        <Sidebar /> {/* Add Sidebar here */}
        <main className="ml-64 flex-1 p-6"> {/* Adjust margin to account for Sidebar width */}
          <Outlet /> {/* Child routes render here */}
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;