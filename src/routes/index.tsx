import { createBrowserRouter } from "react-router-dom";


import AuthLayout from "@/layout/AuthLayout";
import MainLayout from "@/layout/RootLayout";
import Login from "@/pages/Login";
import About from "../pages/About";
import Home from "../pages/Home";


export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
