import React from "react";
import useAuth from "./useAuth";
const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refreshToken = async () => {};
  return <div>useRefreshToken</div>;
};

export default useRefreshToken;
