import React from "react";
import BookIcon from "./icons/bookIcon";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { css } from "@emotion/react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("cookie");
    localStorage.removeItem("userInfo");
    navigate("/logout");
  };
  return (
    <>
      <div
        style={{
          color: "white",
          backgroundColor: "#2B3A55",
          padding: "0.5em",
        }}
      >
        <nav className="navbar navbar-expand-lg ">
          <div className=" container d-md-flex flex-row justify-content-center align-items-center ">
            <BookIcon />
            <h4 className="mx-3">Book Library</h4>

            <div className="collapse navbar-collapse  " id="navbarNav">
              <ul className="navbar-nav  mx-auto">
                <li className="nav-item mx-4">
                  <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    Home
                  </Link>
                </li>

                <li className="nav-item mx-4">
                  <Link
                    to="/horror"
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    Horror
                  </Link>
                </li>

                <li className="nav-item mx-4">
                  <Link
                    to="/comedy"
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    Comedy
                  </Link>
                </li>
                <li className="nav-item mx-4">
                  <Link
                    to="/romance"
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    Romance
                  </Link>
                </li>
                <li className="nav-item mx-4">
                  <Link
                    to="/manga"
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    Manga
                  </Link>
                </li>
                <li className="nav-item mx-4">
                  <Link
                    to="/browse-books"
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    Browse Books
                  </Link>
                </li>
                <li className="nav-item mx-4 ">
                  <Link
                    to="/saved"
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    Saved
                  </Link>
                </li>

                <li className="nav-item mx-4">
                  <Link
                    to="/aboutus"
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div style={{ width: "250px", cursor: "pointer" }}>
            {auth?.userInfo ? (
              <div className="d-flex align-items-center gap-2">
                <div css={styles.placeholder}>
                  {auth?.userInfo?.username?.charAt(0)}
                </div>

                <div className="dropdown">
                  <button
                    css={styles.username}
                    className="dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth?.userInfo?.username}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Account Setting
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Saved
                      </a>
                    </li>
                    <li onClick={handleLogout}>
                      <a className="dropdown-item">Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginLeft: "82px",
                  fontSize: "1.2rem",
                }}
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
const styles = {
  placeholder: css`
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 8px;
    background-color: #3966b4;
    color: #fff;
    display: inline-flex;
    align-items: center;
    font-size: 1.25rem;
    font-weight: 500;
    justify-content: center;
    margin-right: 10px;
  `,
  username: css`
    font-size: 15px;
    border: none;
    background: none;
    color: white;
  `,
};
