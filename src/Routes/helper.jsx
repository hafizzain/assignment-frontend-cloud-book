import { Outlet } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"; // Your authentication route

import Home from '../Pages/Dashboard/Home/index';
import NotFoundPage from '../Components/Element/NotFoundPage';
import Dashboard from "@/Pages/Dashboard/index";
import MainOutlet from "@/MainLayout/MainLayout";
import HomePage from "@/Pages/HomePage";

const routes = [
  {
    path: "/",
    element: <div className="app">
      <Outlet />
      <MainOutlet />
    </div>,
    errorElement: <NotFoundPage />,
    children: [
      // Public Routes
      {
        path: "/",
        element: <HomePage />,
      },
      // Protected Routes
      {
        path: "/dashboard",
        element: <PrivateRoute element={<Dashboard />} />,
        children: [
          {
            index: true,
            path: "/dashboard",
            element:<Home />
          },
        ],
      },
    ],
  },
];

export default routes;
