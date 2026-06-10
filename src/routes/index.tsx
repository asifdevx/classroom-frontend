import { createBrowserRouter } from "react-router-dom";


import AuthLayout from "@/layout/AuthLayout";
import MainLayout from "@/layout/RootLayout";
import Login from "@/pages/Login";

import CreateClassPage from "@/pages/classes/create";
import ClassListPage from "@/pages/classes/list";
import SubjectListPage from "@/pages/subjects/list";
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
        path: "/subjects",
        element: <SubjectListPage />,
      },
      {
        path: "/classes",
        element: <ClassListPage />,
      },
      {
        path: "/classes/create",
        element: <CreateClassPage />,
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
