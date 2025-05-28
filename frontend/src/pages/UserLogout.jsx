import React from 'react'
import axios from 'axios'

const UserLogout = () => {

    const token = localStorage.getItem('token')


    const handleLogout = async () => {

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/users/logout`,
                {},
                { withCredentials: true }
            );

            console.log(response.data.message);
            localStorage.removeItem('token');
            // Optionally, you can redirect the user to the login page or home page
            window.location.href = '/login'; // Redirect to login page
        } catch (error) {
            console.error('Logout failed:', error);
            alert(error.response?.data?.message || 'Logout failed');
        }
    }


  return (
    <div>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <div className="flex justify-center mb-6">
                <img
                className="w-20 md:w-20"
                src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                alt="Uber logo"
                />
            </div>
            <h2 className="text-center text-2xl font-bold mb-4">Logout</h2>
            <p className="text-center mb-6">Are you sure you want to logout?</p>
            <button
                onClick={handleLogout}
                className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition duration-300 font-semibold"
            >
                Logout
            </button>
            </div>
        </div>
    </div>
  )
}

export default UserLogout