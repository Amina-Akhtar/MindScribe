import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateField, loginSuccess } from '../store/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import Background from './Background';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Signin() {
  const dispatch = useDispatch();
  const { username = '', password = '' } = useSelector((state) => state.user || {});
  const navigate = useNavigate();
  const handleChange = (e) => {
    dispatch(updateField({ field: e.target.name, value: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        const response = await axios.post('http://localhost:5000/api/user/signin',
          { username, password },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          });
        if (response.status == 201) {
          dispatch(loginSuccess({username,password}));
          toast.success('Signin successfull!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate('/home');
        }
      }
      catch (err) {
        const errorMessage = err?.response?.data?.message || 'Invalid credentials!';
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-[#f8f5fd] overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 py-6">
      <Background />

      <div className="relative z-10 flex flex-col items-center space-y-4 text-center mb-4">
        <h1 className="text-4xl md:text-4xl font-bold text-[#5d4a7a]">MindScribe</h1>
      </div>

      <div className="relative z-10 w-full bg-white rounded-2xl shadow-xl sm:max-w-md dark:bg-gray-800 dark:border dark:border-gray-700">
        <div className="p-8 space-y-6">
          <h2 className="text-xl font-semibold text-[#5d4a7a] dark:text-white">
            Sign in to your account
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#5d4a7a] dark:text-white mb-1">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full rounded-lg border border-[#ccbce8] bg-gray-50 p-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b3a0d9] dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div className='pb-3'>
              <label htmlFor="password" className="block text-sm font-medium text-[#5d4a7a] dark:text-white mb-1">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handleChange}
                placeholder="••••••"
                className="w-full rounded-lg border border-[#ccbce8] bg-gray-50 p-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b3a0d9] dark:bg-gray-700 dark:text-white"
                required
              />
            </div>





            <button
              type="submit"
              className="w-full bg-[#b3a0d9] hover:bg-[#9c89c0] text-white font-medium py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all"
              onSubmit={handleSubmit}
            >
              Sign in
            </button>
          </form>

          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-[#b3a0d9] font-medium hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;