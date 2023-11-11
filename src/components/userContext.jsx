import { useMutation } from "@tanstack/react-query";
import React, { useState, useContext, createContext } from "react";
import { loginUser } from "../constants/constants";

const Context = createContext();

const UserContext = ({ children }) => {
  const[userData,setUserData] = useState({})

  const { mutate, data, error } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: loginUser,
    onSuccess: (result) => {
      const resultData = result?.data;
      console.log(resultData,"result")
      if (resultData.code == 200) {
        sessionStorage.setItem("Token", resultData.Token);
        setUserData(resultData);
      }
    }
  });

  return (
    <Context.Provider
      value={{ mutate, userData: userData, error: error?.response.data.message }}
    >
      {children}
    </Context.Provider>
  );
};

export const useUserContext = () => {
  return useContext(Context);
};

export default UserContext;
