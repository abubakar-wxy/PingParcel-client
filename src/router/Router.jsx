import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import PageNotFound from "../pages/PageNotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home/>
            }
        ]
    },
    {
        path: "/",
        element: <AuthLayout/>,
        children: [
            {
                path: "register",
                element: <Register/>
            },
            {
                path: "login",
                element: <Login/>
            },
        ]
    },
    {
        path: "*",
        element: <PageNotFound/>
    },
]);
