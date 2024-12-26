import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RenderStars = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="text-purple-800" />);
    } else if (i - 0.5 === rating) {
      stars.push(<FaStarHalfAlt key={i} className="text-purple-800" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-purple-800" />);
    }
  }
  return <div className="flex space-x-1">{stars}</div>;
};

export default RenderStars;
