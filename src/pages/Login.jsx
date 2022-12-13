import React from "react";
import { useState } from "react";
import { LOGIN_MUTATION } from "../graphql/mutations/auth";
import apolloClient from "../utils/apolloClient";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import LoginIcon from "../component/icons/LoginIcon";
import { useNavigate, useLocation } from "react-router-dom";
import { destroyCookie, setCookie } from "nookies";

const Login = () => {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const verifyLogin = async (e) => {
    e.preventDefault();

    try {
      const { data, errors } = await apolloClient.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          identifier,
          password,
        },
      });

      if (data) {
        setCookie(null, "token", data?.login?.jwt, {
          secure: false,
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          sameSite: "strict",
        });
        localStorage.setItem("cookie", data?.login?.jwt);
        localStorage.setItem("userInfo", JSON.stringify(data?.login?.user));
        setAuth({
          identifier,
          password,
          userInfo: data?.login?.user,
          jwt: data?.login?.jwt,
        });
      }
      navigate(from, { replace: true });
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <div
      className="formContainer"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={verifyLogin}
        className="registerForm"
        style={{
          maxHeight: "60vh",
        }}
      >
        <div className="registerIcon">
          <LoginIcon />
        </div>
        <p className="registerTitle">Login</p>
        <div className="formInputGroup">
          <label className="mb-2">Email address</label>
          <input
            type="email"
            className="form-input"
            placeholder="Enter email"
            name="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>
        <div className="formInputGroup">
          <label className="mb-2">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="form-input"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center mt-5">
          <button type="submit" className="registerBtn">
            Submit
          </button>
          <p className="redirectLogin">
            Create New Account? <Link to="/register">Register</Link> here.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
