import React from "react";
import { REGISTER } from "../graphql/mutations/auth";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useState, useEffect, useContext } from "react";
import apolloClient from "../utils/apolloClient";
import AuthContext from "../context/AuthProvider";
import { Link } from "react-router-dom";
import RegisterIcon from "../component/icons/RegisterIcon";
const Register = () => {
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const REGISTER_URL = "/register";
  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const registerUser = async (e) => {
    e.preventDefault();
    const nameValidation = USER_REGEX.test(username);
    const passwordValidation = PWD_REGEX.test(pwd);
    if (!nameValidation || !passwordValidation) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const { data, errors } = await apolloClient.mutate({
        mutation: REGISTER,
        variables: {
          username,
          password: pwd,
          email,
        },
      });
      console.log("data error", data, errors);
      if (data) {
        setAuth({
          identifier: email,
          password: pwd,
          userInfo: data?.register?.user,
          jwt: data?.register?.jwt,
        });
      }
      if (errors) {
        console.log("login errors", errors);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, pwd, matchPwd]);

  console.log("validation", validName, validMatch, validPwd);
  return (
    <div className="formContainer">
      <form className="registerForm">
        <div className="registerIcon">
          <RegisterIcon />
        </div>
        <p className="registerTitle">Create New Account</p>
        <div className="formInputGroup">
          <label className="mb-2">Username</label>
          <input
            type="text"
            id="usernameInput"
            className="form-input"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="username"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="usernameInput"
            className={
              userFocus && username && !validName ? "instructions" : "offscreen"
            }
          >
            <AiOutlineInfoCircle size={15} />
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
        </div>
        <div className="formInputGroup">
          <label className="mb-2">Email</label>
          <input
            type="text"
            id="emailInput"
            className="form-input"
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="email"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            id="emailInput"
            className={
              emailFocus && email && !validEmail ? "instructions" : "offscreen"
            }
          >
            <AiOutlineInfoCircle />
            Please enter a valid email address
          </p>
        </div>
        <div className="formInputGroup">
          <label className="mb-2">Password</label>
          <input
            type="password"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            className="form-input"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
          >
            <AiOutlineInfoCircle />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>
        </div>
        <div className="formInputGroup">
          <label className="mb-2">Confirm Password</label>
          <input
            type="password"
            id="confirmnote"
            placeholder="Confirm Password"
            name="password"
            className="form-input"
            value={matchPwd}
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p
            id="confirmnote"
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
          >
            <AiOutlineInfoCircle />
            Must match the first password input field.
          </p>
        </div>
        <div className="text-center mt-5">
          <button
            type="submit"
            onClick={registerUser}
            disabled={!validName || !validPwd || !validMatch ? true : false}
            className={
              !validName || !validPwd || !validMatch
                ? "disabledBtn"
                : "registerBtn"
            }
          >
            Register
          </button>
          <p className="redirectLogin">
            Already have an account? <Link to="/login">Sign in</Link> here.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
