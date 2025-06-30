import React from 'react';
import logo from "../../assets/logo.png"
import { Link } from 'react-router';

const PingParcelLogo = () => {
    return (
        <div className="items-end inline-flex font-extrabold">
            {/* <img className="mb-1" src={logo} alt="PingParcel Logo" /> */}
            {/* <p className="text-3xl -ml-3">PingParcel</p> */}
            <img
                className="mb-1 w-8 sm:w-10 md:w-auto"
                src={logo}
                alt="PingParcel Logo"
            />
            <p className="text-xl sm:text-2xl md:text-3xl -ml-3">
                PingParcel
            </p>
        </div>
    );
};

export default PingParcelLogo;