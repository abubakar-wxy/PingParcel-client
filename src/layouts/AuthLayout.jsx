import React from "react";
import { Outlet } from "react-router";
import Navbar from "../shared/Navbar/Navbar";

const AuthLayout = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AuthLayout;
