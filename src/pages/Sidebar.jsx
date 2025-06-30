import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/MyProvider';
import Swal from 'sweetalert2';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuthClick = (e, route, action) => {
    e.preventDefault();
    if (user) {
      navigate(route);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: `Please log in to ${action}!`,
        confirmButtonText: 'Go to Login',
      }).then(() => navigate('/auth/login'));
    }
  };

  const links = [
    { to: '/', text: 'Home' },
    { to: '/auth/dashboard', text: 'Dashboard' },
    {
      to: '/auth/create-group',
      text: 'Create Group',
      onClick: (e) => handleAuthClick(e, '/auth/create-group', 'create a group'),
    },
    {
      to: '/auth/my-group',
      text: 'My Group',
      onClick: (e) => handleAuthClick(e, '/auth/my-group', 'view your groups'),
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-64 bg-teal-800 h-screen text-white p-4 z-40 overflow-y-auto">
      <h1 className="text-2xl mb-6 font-bold">HobbyHub</h1>
      <ul className="flex flex-col space-y-4">
        {links.map(({ to, text, onClick }, i) => (
          <li key={i}>
            <NavLink
              to={to}
              onClick={onClick}
              className={({ isActive }) =>
                `text-lg hover:text-teal-300 transition ${
                  isActive ? 'text-teal-300 border-l-4 border-teal-300 pl-2' : ''
                }`
              }
            >
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;