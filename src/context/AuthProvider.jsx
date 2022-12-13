import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    if (localStorage.getItem("cookie")) {
      setAuth({ userInfo: JSON.parse(localStorage.getItem("userInfo")) });
    }
  }, []);

  console.log("auth", auth);
  console.log("data", JSON.parse(localStorage.getItem("userInfo")));

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
