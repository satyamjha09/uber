import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

const Login = () => {

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // <- Add this line

  const [user, setUserState] = useState({
    email: '',
    password: '',
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/users/login`,
        user,
        { withCredentials: true }
      );

      console.log(response.data.token);

      
      console.log('Login successful:', response.data);
      const data = response.data.user;
      localStorage.setItem('token', JSON.stringify(data.token));
      toast.success('Login successful! Welcome back.');

      // Update global context with data from backend
      // Assume your backend returns user as { id, name, email } or similar
      // If name is full name, split it into first/last name
      const { name, email } = response.data.user;
      let firstName = '', lastName = '';
      if (name && name.split(' ').length > 1) {
        firstName = name.split(' ')[0];
        lastName = name.split(' ').slice(1).join(' ');
      } else {
        firstName = name || '';
      }
      setUser({ firstName, lastName, email });

      navigate('/home'); // Or wherever you want
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            className="w-32 md:w-40"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber logo"
          />
        </div>
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="email"
            onChange={(e) => setUserState({ ...user, email: e.target.value })}
            value={user.email}
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="password"
            onChange={(e) => setUserState({ ...user, password: e.target.value })}
            value={user.password}
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition duration-300 font-semibold"
          >
            Login
          </button>
          <p className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
          <Link
            to="/captainlogin"
            className="inline-block text-center w-full bg-amber-300 text-white py-3 rounded hover:bg-gray-800 transition duration-300 font-semibold mt-4"
          >
            Login as Captain
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
