import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Coverage from "../pages/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Rider from "../pages/rider/Rider";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../pages/sendParcel/SendParcel";


export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
        },
        {
            path: '/coverage',
            Component: Coverage,
            loader: () => fetch('./serviceCenter.json').then(res => res.json())
        },
        {
            path: "rider",
            element: <PrivateRoute>
                <Rider></Rider>
            </PrivateRoute>
        },
        {
            path: "/sendParcel",
            element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
            loader: () => fetch('./serviceCenter.json').then(res => res.json())
        }
    ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: "/login",
                Component: Login
            },
            {
                path: "/register",
                Component: Register
            }
        ]
    }
])