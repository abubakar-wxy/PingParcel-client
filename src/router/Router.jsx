import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import PageNotFound from "../pages/PageNotFound";
import PublicRoute from "./PublicRoute";
import Coverage from "../pages/Coverage";
import SendParcel from "../pages/SendParcel/SendParcel";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/coverage",
                element: <Coverage />,
                loader: () => fetch("./warehouses.json"),
            },
            {
                path: "/sendParcel",
                element: (
                    <PrivateRoute>
                        <SendParcel />
                    </PrivateRoute>
                ),
                loader: () => fetch("./warehouses.json"),
            },
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "register",
                element: (
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                ),
            },
            {
                path: "login",
                element: (
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                ),
            },
        ],
    },
    {
        path: "*",
        element: <PageNotFound />,
    },
]);
