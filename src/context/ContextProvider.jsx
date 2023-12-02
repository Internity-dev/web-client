import React, { createContext, useContext, useState } from "react";

const StateContext = createContext({
  token: null,
  setToken: () => {},
});

const initialState = {
  userProfile: false,
};

export const ContextProvider = ({ children }) => {
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#1191FF");
  const [currentMode, setCurrentMode] = useState("Light");
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const setMode = (e) => {
    const newMode = e.target.checked ? "Dark" : "Light";
    setCurrentMode(newMode);
    localStorage.setItem("currentMode", newMode);
  };
  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true });

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <StateContext.Provider
      value={{
        token,
        setToken,
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
