import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative">
      <div className="absolute top-6 left-6">
        <img
          className="w-32 md:w-40"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber logo"
        />
      </div>

      <div className="mt-32 w-full max-w-md px-6 text-center space-y-6">
        <h2 className="text-3xl font-bold text-black">Get started with Uber</h2>
        <Link to='/login' className="inline-block w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition duration-300">
          Get Started with Uber
        </Link>
      </div>
    </div>
  )
}

export default Start