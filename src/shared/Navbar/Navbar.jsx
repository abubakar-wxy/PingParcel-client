import React from "react";
import { Link, NavLink } from "react-router";
import PingParcelLogo from "../PingParcelLogo/PingParcelLogo";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const { user, logOut, loading } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log("LogOut successfully");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const navItems = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/services">Services</NavLink>
            </li>
            <li>
                <NavLink to="/coverage">Coverage</NavLink>
            </li>
            <li>
                <NavLink to="/trackOrder">Track Order</NavLink>
            </li>
            <li>
                <NavLink to="/pricing">Pricing</NavLink>
            </li>
            <li>
                <NavLink to="/beRider">Be a Rider</NavLink>
            </li>
        </>
    );
    return (
        <div className="navbar bg-base-100 shadow-sm rounded-2xl mt-5">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {" "}
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />{" "}
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        {navItems}
                    </ul>
                </div>
                <Link to="/" className="text-xl ml-3">
                    <PingParcelLogo />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>
            <div className="navbar-end flex gap-3">
                {loading ? (
                    <span className="loading loading-spinner loading-sm mr-5"></span>
                ) : (
                    <>
                        {!user ? (
                            <Link to="/login" className="btn btn-sm">
                                Login
                            </Link>
                        ) : (
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div className="w-10 rounded-full outline-3 outline-[#CAEB66]">
                                        {user?.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt={
                                                    user?.displayName || "User"
                                                }
                                            />
                                        ) : (
                                            <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
                                                {user?.displayName
                                                    ?.slice(0, 3)
                                                    .toUpperCase() || "U"}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                                >
                                    <li>
                                        <a className="justify-between">
                                            {user?.displayName || "User"}
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={handleLogOut}>Logout</a>
                                    </li>
                                </ul>
                                <Link
                                    onClick={handleLogOut}
                                    className="btn btn-sm ml-3"
                                >
                                    LogOut
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
