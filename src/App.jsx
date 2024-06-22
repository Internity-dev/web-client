import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";

import { GuestLayout, DefaultLayout } from "./components";
import {
  Login,
  NotFound,
  Register,
  Intern,
  News,
  Home,
  Activity,
  Report,
  Profile,
  ChangeProfile,
  InternDetail,
  Saved,
  Status,
  MyIntern,
  ChangePassword,
  NewsDetail,
  Presence,
  Notifications,
} from "./pages";
import "./index.css";

import { useStateContext } from "./context/ContextProvider";
import Test from "./pages/Test";

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <Router>
        <Routes>
          <Route path='/' element={<DefaultLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/activity' element={<Activity />} />
            <Route path='/presence' element={<Presence />} />
            <Route path='/report' element={<Report />} />
            <Route path='/intern' element={<Intern />} />
            <Route path='/myintern' element={<MyIntern />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/news' element={<News />} />
            <Route path='/change-profile' element={<ChangeProfile />} />
            <Route path='/change-password' element={<ChangePassword />} />
            <Route path='/vacancy/:id' element={<InternDetail />} />
            <Route path='/news/:id' element={<NewsDetail />} />
            <Route path='/saved' element={<Saved />} />
            <Route path='/status' element={<Status />} />
            <Route path='/notifications' element={<Notifications />} />
          </Route>
          <Route path='/' element={<GuestLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/test' element={<Test />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
