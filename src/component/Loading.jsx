import React from "react";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center w-100 h-100">
      <div className="spinner-grow text-white me-2" role="status"></div>
      <div className="spinner-grow text-white me-2" role="status"></div>
      <div className="spinner-grow text-white" role="status"></div>
    </div>
  );
};

export default Loading;
