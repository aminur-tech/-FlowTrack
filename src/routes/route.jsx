import { createBrowserRouter } from "react-router";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import Analytics from "../components/dashboard/Analytics/Analytics";
import Help from "../components/dashboard/help/Help";
import Settings from "../components/dashboard/settings/Settings";
import DashboardHome from "../components/dashboard/home/DashboardHome";
import Dashboard from "../pages/Dashboard";
import Calendar from "../components/dashboard/Calendar/Calendar";
import Products from "../components/dashboard/products/Products";
import Users from "../components/dashboard/users/Users";



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
                { path: "home", element: <DashboardHome /> },
                { path: "analytics", element: <Analytics /> },
                { path: "calendar", element: <Calendar /> },
                { path: "products", element: <Products /> },
                { path: "users", element: <Users/> },
                { path: "help", element: <Help /> },
                { path: "settings", element: <Settings /> },
            ]
            ,
        },
        { path: "*", element: <Login /> },
    ]
);