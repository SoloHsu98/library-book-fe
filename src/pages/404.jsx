import React from "react";
import { Link } from "react-router-dom";
import Icon404 from "../component/icons/404Icon";

const Custom404 = () => {
  return (
    <div className="pageNotFoundContainer">
      <div>
        <Icon404 />
      </div>
      <h3 className="title">Page Not Found!</h3>
      <p className="notFoundContent">
        The page you are looking for doesn't exist or an other error occurred.
      </p>
      <Link to="/">
        <button className="goBackBtn">Go Back Home</button>
      </Link>
    </div>
  );
};

export default Custom404;
