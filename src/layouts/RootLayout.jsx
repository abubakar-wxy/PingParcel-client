import React from "react";
import { Outlet } from "react-router";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";

const RootLayout = () => {
    return (
        <div className="container mx-auto">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default RootLayout;
