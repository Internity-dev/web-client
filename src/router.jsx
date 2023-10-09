import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Vacancies from "./pages/Vacancies.jsx";
import Landing from "./pages/Landing";
import News from "./pages/News";
import GuestLayout from "./components/GuestLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/vacancies",
        element: <Vacancies />,
      }
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      }
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
