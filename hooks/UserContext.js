import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userSnapTest, setUserSnapTest] = useState({});

  return (
    <UserContext.Provider value={{ userSnapTest, setUserSnapTest }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
