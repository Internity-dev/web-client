import React, { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
};

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [news, setNews] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [activity, setActivity] = useState([]);
  const [avatar, setAvatar] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#1191FF");
  const [currentMode, setCurrentMode] = useState("Light");
  const [activeMenu, setActiveMenu] = useState(true);
  const [saved, setSaved] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);

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
        user,
        setUser,
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
        isLoading,
        setIsLoading,
        avatar,
        setAvatar,
        news,
        setNews,
        notifications,
        setNotifications,
        recommendations,
        setRecommendations,
        vacancies,
        setVacancies,
        activity,
        setActivity,
        saved,
        setSaved,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
