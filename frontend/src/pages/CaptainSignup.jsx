import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainSignup = () => {
  const navigate = useNavigate();

  const [captain, setCaptain] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    vehicle: '',
    location: '',
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/captains/register', captain);
      console.log(response.data);
      navigate('/captainlogin');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            className="w-20 md:w-20"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber logo"
          />
        </div>

        <input
          type="text"
          onChange={(e) => setCaptain({ ...captain, firstName: e.target.value })}
          value={captain.firstName}
          placeholder="First Name"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          required
        />

        <input
          type="text"
          onChange={(e) => setCaptain({ ...captain, lastName: e.target.value })}
          value={captain.lastName}
          placeholder="Last Name"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          required
        />

        <input
          type="email"
          onChange={(e) => setCaptain({ ...captain, email: e.target.value })}
          value={captain.email}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          required
        />

        <input
          type="password"
          onChange={(e) => setCaptain({ ...captain, password: e.target.value })}
          value={captain.password}
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          required
        />

        <input
          type="text"
          onChange={(e) => setCaptain({ ...captain, vehicle: e.target.value })}
          value={captain.vehicle}
          placeholder="Vehicle Type"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          required
        />

        <input
          type="text"
          onChange={(e) => setCaptain({ ...captain, location: e.target.value })}
          value={captain.location}
          placeholder="Location"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition duration-300 font-semibold"
        >
          Sign Up as Captain
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/captainlogin" className="text-blue-500 hover:underline">
            Captain Login
          </Link>
        </p>

        <Link
          to="/register"
          className="inline-block text-center w-full bg-amber-300 text-white py-3 rounded hover:bg-gray-800 transition duration-300 font-semibold mt-4"
        >
          Signup as User
        </Link>
      </form>
    </div>
  );
};

export default CaptainSignup;