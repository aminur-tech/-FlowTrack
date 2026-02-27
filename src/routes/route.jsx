import { createBrowserRouter } from "react-router";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import Analytics from "../components/dashboard/Analytics/Analytics";
import Calendar from "../components/dashboard/Calendar/Calendar";
import Help from "../components/dashboard/help/Help";
import Settings from "../components/dashboard/settings/Settings";
import Products from "../components/dashboard/products/products";
import Users from "../components/dashboard/users/users";
import DashboardHome from "../components/dashboard/home/DashboardHome";
import Dashboard from "../pages/Dashboard";


export const routes = createBrowserRouter(
  [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
      children: [
        { index: true, element: <DashboardHome /> },
        {path: "analytics", element: <Analytics />},
        {path: "calendar", element: <Calendar />},
        {path: "products", element: <Products />},
        {path: "users", element: <Users />},
        {path: "help", element: <Help />},
        {path: "settings", element: <Settings />},
    ]
        ,
    },
    { path: "*", element: <Login /> },
  ]
);