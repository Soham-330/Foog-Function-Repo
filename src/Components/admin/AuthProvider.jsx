import React from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {


  const [password, setPassword] = useState("HareKrishna");

  return (
    <AuthContext.Provider value={[password, setPassword]}>
      {props.children}
    </AuthContext.Provider>
  );
};
