import React, { createContext, useContext, useState } from "react";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(null); 

  
  const login = ({ email }) => {
    const fakeToken = Math.random().toString(); // simple token
    const username = email.split("@")[0]; // get name from email

    const userData = { name: username, email }; // create user object

    setUser(userData);
    setToken(fakeToken);

    return { success: true };
  };

 
  const signup = ({ name, email }) => {
    const fakeToken = Math.random().toString();

    const userData = { name, email };

    setUser(userData);
    setToken(fakeToken);

    return { success: true };
  };


  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
