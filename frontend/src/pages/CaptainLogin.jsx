import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainLogin = () => {
  const navigate = useNavigate();

  const [captain, setCaptain] = useState({
    email: '',
    password: ''
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/captains/login', captain);
      // Handle login success, e.g., store token, show toast, redirect
      console.log(response.data);
      navigate('/captain/dashboard'); // Update route as needed
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            className="w-20 md:w-20"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber logo"
          />
        </div>
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="email"
            value={captain.email}
            onChange={(e) => setCaptain({ ...captain, email: e.target.value })}
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="password"
            value={captain.password}
            onChange={(e) => setCaptain({ ...captain, password: e.target.value })}
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition duration-300 font-semibold"
          >
            Captain Login
          </button>
          <p className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <Link to="/captainsignup" className="text-blue-500 hover:underline">
              Signup as Captain
            </Link>
          </p>
          <Link
            to="/login"
            className="inline-block text-center w-full bg-amber-300 text-white py-3 rounded hover:bg-gray-800 transition duration-300 font-semibold mt-4"
          >
            Login as User
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CaptainLogin;
