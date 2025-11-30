import React from "react";
import { useNavigate } from "react-router";
 // If using Next.js

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md w-full">

        {/* Lock Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-5 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 10V7a4 4 0 10-8 0v3m-2 0h12v10H6V10z"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold mb-3 text-gray-800">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don’t have permission to view this page.  
          Please contact the admin if you think this is a mistake.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Go Back
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
