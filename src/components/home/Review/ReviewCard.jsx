import React from "react";
import { FaQ, FaQuoteLeft } from "react-icons/fa6";

const ReviewCard = ({ review }) => {
  return (
    <div className=" rounded-xl p-4 shadow-sm bg-white max-w-sm">
      {/* Review Text */}
      <FaQuoteLeft className="text-2xl text-primary mb-2" />
      <p className="text-gray-700 text-sm">{review.review}</p>

      {/* Divider */}
      <hr className="my-3 border-gray-200" />

      {/* User Info */}
      <div className="flex items-center gap-3">
        {/* Photo */}
        <img
          src={review.user_photoURL}
          alt={review.userName}
          className="w-12 h-12 rounded-full object-cover"
        />

        {/* Name + Email */}
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">
            {review.userName}
          </h3>
          <p className="text-gray-500 text-xs">{review.user_email}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
