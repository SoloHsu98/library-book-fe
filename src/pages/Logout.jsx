import React from "react";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import LoginIcon from "../component/icons/LoginIcon";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  return (
    <div
      className="formContainer"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="registerForm"
        style={{
          maxHeight: "60vh",
        }}
      >
        <div className="registerIcon">
          <LoginIcon />
        </div>
        <p className="registerTitle">You're Logged Out</p>
        <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
          <p css={styles.text}>Thank you for visting our Library Book !!!</p>
          <Link to="/login" className="registerBtn">
            <button className="border-0 bg-transparent text-white">
              Sign In again
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Logout;
const styles = {
  text: css`
    font-size: 1.2rem;
  `,
};
