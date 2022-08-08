import { createContext, useContext, useEffect, useState } from "react";

const FilesContext = createContext({});

export const FilesContextProvider = ({ children }) => {
  useEffect(() => {}, []);

  return (
    <FilesContext.Provider value={{ files, filesData }}>
      {children}
    </FilesContext.Provider>
  );
};
