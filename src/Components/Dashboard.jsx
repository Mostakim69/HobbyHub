import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/MyProvider';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [totalGroups, setTotalGroups] = useState(0);
  const [myGroups, setMyGroups] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Total groups
        const allGroupsRes = await axios.get('https://assignment-ten-server-olive.vercel.app/groups');
        if (allGroupsRes.data.success) {
          setTotalGroups(allGroupsRes.data.data.length);
        }

        // My groups
        if (user?.email) {
          const myGroupsRes = await axios.get('https://assignment-ten-server-olive.vercel.app/groups', {
            params: { email: user.email }
          });
          if (myGroupsRes.data.success) {
            setMyGroups(myGroupsRes.data.data.length);
          }
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="loading loading-spinner text-primary"></div></div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* User Info */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Welcome, {user?.displayName || 'User'}!</h2>
        <p>Email: {user?.email}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-blue-800">Total Groups</h3>
          <p className="text-4xl font-bold mt-2">{totalGroups}</p>
        </div>

        <div className="bg-green-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-green-800">My Groups</h3>
          <p className="text-4xl font-bold mt-2">{myGroups}</p>
        </div>

        <div className="bg-yellow-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-yellow-800">User Status</h3>
          <p className="text-lg mt-2">{user ? 'Logged In' : 'Guest'}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
