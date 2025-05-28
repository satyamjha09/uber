import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { toast} from 'react-toastify';

const Signup = () => {

  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/register`, form);
      console.log(response.data);

       const data = response.data.user;
       localStorage.setItem('token', JSON.stringify(data.token));
       toast.success('Registration successful! Please login to continue.');

      setUser({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
      });
      navigate('/home');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'An error occurred during registration');
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
            type="text"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            placeholder="First Name"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            placeholder="Last Name"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition duration-300 font-semibold"
          >
            Create Account
          </button>
          <p className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
          <Link
            to="/captainsignup"
            className="inline-block text-center w-full bg-amber-300 text-white py-3 rounded hover:bg-gray-800 transition duration-300 font-semibold mt-4"
          >
            Signup as Captain
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
