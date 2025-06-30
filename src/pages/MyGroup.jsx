import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/MyProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const MyGroup = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchGroups = async () => {
        try {
          const response = await axios.get('https://assignment-ten-server-olive.vercel.app/groups', {
            params: { email: user.email }
          });
          if (response.data.success) {
            setGroups(response.data.data);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response.data.message || 'Failed to fetch groups',
              confirmButtonColor: '#3085d6',
            });
          }
        } catch (error) {
          console.error('Error fetching groups:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch groups. Please try again.',
            confirmButtonColor: '#3085d6',
          });
        } finally {
          setIsLoading(false);
        }
      };
      fetchGroups();
    }
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`https://assignment-ten-server-olive.vercel.app/groups/${id}`);
        if (response.data.success) {
          setGroups(groups.filter(group => group._id !== id));
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Group has been deleted.',
            confirmButtonColor: '#3085d6',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.data.message || 'Failed to delete group',
            confirmButtonColor: '#3085d6',
          });
        }
      } catch (error) {
        console.error('Error deleting group:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete group. Please try again.',
          confirmButtonColor: '#3085d6',
        });
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/auth/updateGroup/${id}`);
  };

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="min-h-screen  dark:bg-gray-900 transition-colors duration-300 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold  dark:text-gray-100 text-center mb-8">
          My Groups
        </h1>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-200">
              <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-xs uppercase">
                <tr>
                  <th className="p-4 text-center">Image</th>
                  <th className="p-4">Group Name</th>
                  <th className="p-4 hidden md:table-cell">Hobby Category</th>
                  <th className="p-4 hidden lg:table-cell">Description</th>
                  <th className="p-4 hidden md:table-cell">Meeting Location</th>
                  <th className="p-4 hidden sm:table-cell">Max Members</th>
                  <th className="p-4 hidden sm:table-cell">Start Date</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {groups.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-6 text-center text-gray-500 dark:text-gray-400">
                      No groups found.
                    </td>
                  </tr>
                ) : (
                  groups.map((group) => (
                    <tr
                      key={group._id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="p-4">
                        <img
                          src={group.imageUrl}
                          alt={group.groupName}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg mx-auto"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/100'; }}
                        />
                      </td>
                      <td className="p-4 font-medium text-gray-900 dark:text-gray-100">
                        {group.groupName}
                      </td>
                      <td className="p-4 hidden md:table-cell text-gray-700 dark:text-gray-300">
                        {group.hobbyCategory}
                      </td>
                      <td className="p-4 hidden lg:table-cell text-gray-700 dark:text-gray-300">
                        {group.description}
                      </td>
                      <td className="p-4 hidden md:table-cell text-gray-700 dark:text-gray-300">
                        {group.meetingLocation}
                      </td>
                      <td className="p-4 hidden sm:table-cell text-gray-700 dark:text-gray-300">
                        {group.maxMembers}
                      </td>
                      <td className="p-4 hidden sm:table-cell text-gray-700 dark:text-gray-300">
                        {new Date(group.startDate).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                          <button
                            onClick={() => handleUpdate(group._id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors text-sm"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(group._id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGroup;