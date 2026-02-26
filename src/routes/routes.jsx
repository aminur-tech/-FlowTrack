import React from 'react';
import { createBrowserRouter } from 'react-router';
import Dashboard from '../pages/dashboard/Dashboard';

export const routes = () => {
    return createBrowserRouter([
        {
            path: '/',
            element: <Dashboard />,
        }
    ])
}
