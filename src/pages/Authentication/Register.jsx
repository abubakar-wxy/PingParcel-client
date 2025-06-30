import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router";
import rightImage from "../../assets/authImage.png";
import PingParcelLogo from "../../shared/PingParcelLogo/PingParcelLogo";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";

const Register = () => {
    const [nameError, setNameError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    // const { createUser, setUser, updateUser, signInWithGoogle } =
    //     useAuth(AuthProvider);
    const location = useLocation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { createUser, updateUser, setUser } = useAuth();

    // sign in with username and password
    const handleRegistration = (data) => {
        createUser(data.email, data.password);
        console
            .log("this is from data ====== ", data)
            .then((result) => {
                const user = result.user;
                console.log(user);
                updateUser({ displayName: data.name })
                    .then(() => {
                        setUser({ ...user, displayName: data.name });
                        navigate(location.state ? location.state : "/");
                    })
                    .catch((error) => {
                        console.log(error);
                        setUser(user);
                    });
            })
            .catch((error) => setNameError(error.code));
    };

    return (
        <div className="flex h-screen">
            {/* Left Section - Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-10">
                <div className="w-full max-w-md">
                    <div className="absolute top-10 lg:left-40 md:hidden lg:block">
                        <Link to="/">
                            <PingParcelLogo />
                        </Link>
                    </div>
                    <h2 className="text-3xl font-bold mb-1">
                        Create an Account
                    </h2>
                    <p className="text-sm mb-5 text-gray-500">
                        Register with Ping-Parcel
                    </p>

                    <form onSubmit={handleSubmit(handleRegistration)}>
                        {/* Name Field */}
                        <div className="mb-4">
                            <input
                                {...register("name", {
                                    required: "Name is required",
                                })}
                                type="text"
                                placeholder="Name"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="mb-4">
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email format",
                                    },
                                })}
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="mb-4 relative">
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters",
                                    },
                                    maxLength: {
                                        value: 32,
                                        message:
                                            "Password must be Under 32 characters",
                                    },
                                })}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring pr-10"
                            />
                            <span
                                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </span>
                            {errors.password && (
                                <p className="text-red-500 text-sm">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 mt-2 rounded-md bg-lime-300 hover:bg-lime-400 text-black font-semibold cursor-pointer"
                        >
                            Register
                        </button>
                    </form>

                    <p className="mt-4 text-sm text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-lime-600 font-medium">
                            Login
                        </Link>
                    </p>

                    <SocialLogin />
                </div>
            </div>

            {/* Right Section - Illustration */}
            <div className="hidden md:flex md:w-1/2 bg-[#f8faef] justify-center items-center">
                <img
                    src={rightImage}
                    alt="Delivery Illustration"
                    className="w-full max-w-md"
                />
            </div>
        </div>
    );
};

export default Register;
