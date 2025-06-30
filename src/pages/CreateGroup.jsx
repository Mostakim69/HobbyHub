import React, { useContext, useState } from 'react';
import { AuthContext } from '../provider/MyProvider';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateGroup = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    groupName: '',
    hobbyCategory: '',
    description: '',
    meetingLocation: '',
    maxMembers: '',
    startDate: '',
    imageUrl: '',
  });

  const hobbyCategories = [
    'Drawing & Painting',
    'Photography',
    'Video Gaming',
    'Fishing',
    'Running',
    'Cooking',
    'Reading',
    'Writing',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.groupName ||
      !formData.hobbyCategory ||
      !formData.description ||
      !formData.meetingLocation ||
      !formData.maxMembers ||
      !formData.startDate ||
      !formData.imageUrl
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all required fields!',
        background: '#2d2d2d',
        color: '#ffffff',
        confirmButtonColor: '#3b82f6',
      });
      return;
    }

    if (isNaN(formData.maxMembers) || formData.maxMembers <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Max Members must be a positive number!',
        background: '#2d2d2d',
        color: '#ffffff',
        confirmButtonColor: '#3b82f6',
      });
      return;
    }

    const groupData = {
      ...formData,
      maxMembers: parseInt(formData.maxMembers),
      userName: user?.displayName || 'Anonymous',
      userEmail: user?.email || 'N/A',
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await axios.post('https://assignment-ten-server-olive.vercel.app/groups', groupData);
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Group created successfully!',
          background: '#2d2d2d',
          color: '#ffffff',
          confirmButtonColor: '#3b82f6',
        });
        setFormData({
          groupName: '',
          hobbyCategory: '',
          description: '',
          meetingLocation: '',
          maxMembers: '',
          startDate: '',
          imageUrl: '',
        });
        navigate('/auth/my-group');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message || 'Failed to create group',
          background: '#2d2d2d',
          color: '#ffffff',
          confirmButtonColor: '#3b82f6',
        });
      }
    } catch (error) {
      console.error('Error creating group:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to create group. Please try again.',
        background: '#2d2d2d',
        color: '#ffffff',
        confirmButtonColor: '#3b82f6',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#1a1a1a]">
        <div className="loading loading-spinner text-blue-500 w-12 h-12"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Create a New Group
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-[#2d2d2d] to-[#3a3a3a] shadow-2xl rounded-lg p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="groupName" className="block text-sm font-medium text-gray-200">
                Group Name
              </label>
              <input
                type="text"
                id="groupName"
                name="groupName"
                value={formData.groupName}
                onChange={handleChange}
                className="mt-1 w-full p-3 bg-[#333333] text-white border border-[#4b4b4b] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter group name"
                required
              />
            </div>

            <div>
              <label htmlFor="hobbyCategory" className="block text-sm font-medium text-gray-200">
                Hobby Category
              </label>
              <select
                id="hobbyCategory"
                name="hobbyCategory"
                value={formData.hobbyCategory}
                onChange={handleChange}
                className="mt-1 w-full p-3 bg-[#333333] text-white border border-[#4b4b4b] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {hobbyCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="meetingLocation" className="block text-sm font-medium text-gray-200">
                Meeting Location
              </label>
              <input
                type="text"
                id="meetingLocation"
                name="meetingLocation"
                value={formData.meetingLocation}
                onChange={handleChange}
                className="mt-1 w-full p-3 bg-[#333333] text-white border border-[#4b4b4b] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter meeting location"
                required
              />
            </div>

            <div>
              <label htmlFor="maxMembers" className="block text-sm font-medium text-gray-200">
                Max Members
              </label>
              <input
                type="number"
                id="maxMembers"
                name="maxMembers"
                value={formData.maxMembers}
                onChange={handleChange}
                className="mt-1 w-full p-3 bg-[#333333] text-white border border-[#4b4b4b] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter maximum number of members"
                min="1"
                required
              />
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-200">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="mt-1 w-full p-3 bg-[#333333] text-white border border-[#4b4b4b] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-200">
                Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="mt-1 w-full p-3 bg-[#333333] text-white border border-[#4b4b4b] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter image URL"
                required
              />
            </div>

            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-200">
                User Name
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={user?.displayName || 'Anonymous'}
                className="mt-1 w-full p-3 bg-[#4b4b4b] text-gray-300 border border-[#4b4b4b] rounded-md cursor-not-allowed"
                readOnly
              />
            </div>

            <div>
              <label htmlFor="userEmail" className="block text-sm font-medium text-gray-200">
                User Email
              </label>
              <input
                type="email"
                id="userEmail"
                name="userEmail"
                value={user?.email || 'N/A'}
                className="mt-1 w-full p-3 bg-[#4b4b4b] text-gray-300 border border-[#4b4b4b] rounded-md cursor-not-allowed"
                readOnly
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-200">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 w-full p-3 bg-[#333333] text-white border border-[#4b4b4b] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your group"
              rows="5"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full md:w-1/2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-md hover:from-blue-700 hover:to-blue-500 transition-all duration-300"
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;