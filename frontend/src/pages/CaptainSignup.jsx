import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext'; // update path as needed

const CaptainSignup = () => {
  const navigate = useNavigate();
  const { setCaptain, setIsLoading, setError } = useContext(CaptainDataContext);

  const [captainInput, setCaptainInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    vehicle: {
      color: '',
      plate: '',
      capacity: '',
      vehicleType: '',
    },
    location: {
      coordinates: ['', ''], // [longitude, latitude]
    },
  });

  const handleVehicleChange = (field, value) => {
    setCaptainInput((prev) => ({
      ...prev,
      vehicle: {
        ...prev.vehicle,
        [field]: value,
      },
    }));
  };

  const handleCoordinatesChange = (index, value) => {
    const updatedCoordinates = [...captainInput.location.coordinates];
    updatedCoordinates[index] = value;
    setCaptainInput((prev) => ({
      ...prev,
      location: {
        coordinates: updatedCoordinates,
      },
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/captains/register`,
        {
          ...captainInput,
          vehicle: {
            ...captainInput.vehicle,
            capacity: Number(captainInput.vehicle.capacity),
          },
          location: {
            coordinates: captainInput.location.coordinates.map(Number),
          },
        }
      );
      setCaptain(response.data);
      navigate('/captainlogin');
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Registration failed');
      alert(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            className="w-20"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber logo"
          />
        </div>

        <input
          type="text"
          onChange={(e) => setCaptainInput({ ...captainInput, firstName: e.target.value })}
          value={captainInput.firstName}
          placeholder="First Name"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          required
        />
        <input
          type="text"
          onChange={(e) => setCaptainInput({ ...captainInput, lastName: e.target.value })}
          value={captainInput.lastName}
          placeholder="Last Name"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          required
        />
        <input
          type="email"
          onChange={(e) => setCaptainInput({ ...captainInput, email: e.target.value })}
          value={captainInput.email}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          required
        />
        <input
          type="password"
          onChange={(e) => setCaptainInput({ ...captainInput, password: e.target.value })}
          value={captainInput.password}
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          required
        />

        {/* Vehicle Info */}
        <input
          type="text"
          onChange={(e) => handleVehicleChange('color', e.target.value)}
          value={captainInput.vehicle.color}
          placeholder="Vehicle Color"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          required
        />
        <input
          type="text"
          onChange={(e) => handleVehicleChange('plate', e.target.value)}
          value={captainInput.vehicle.plate}
          placeholder="Vehicle Plate"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          required
        />
        <input
          type="number"
          onChange={(e) => handleVehicleChange('capacity', e.target.value)}
          value={captainInput.vehicle.capacity}
          placeholder="Vehicle Capacity"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          required
        />
        <input
          type="text"
          onChange={(e) => handleVehicleChange('vehicleType', e.target.value)}
          value={captainInput.vehicle.vehicleType}
          placeholder="Vehicle Type"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          required
        />

        {/* Location */}
        <input
          type="text"
          onChange={(e) => handleCoordinatesChange(0, e.target.value)}
          value={captainInput.location.coordinates[0]}
          placeholder="Longitude"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          required
        />
        <input
          type="text"
          onChange={(e) => handleCoordinatesChange(1, e.target.value)}
          value={captainInput.location.coordinates[1]}
          placeholder="Latitude"
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
