import React, { useState, useEffect } from "react";

const StarRatingBig = () => {
  const [rating, setRating] = useState(1);

  useEffect(() => {
    const randomRating = Math.floor(Math.random() * 5) + 3;
    setRating(randomRating);
  }, []);

  const getStarColor = (index) => {
    return index <= rating ? "#ffc107" : "gray";
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill={getStarColor(index + 1)}
          className="bi bi-star-fill"
          viewBox="0 0 16 16"
        >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRatingBig;