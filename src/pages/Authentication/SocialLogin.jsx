import React from "react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { updateUser, setUser, signInWithGoogle } = useAuth();

    // sign in with google directly
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                updateUser({
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                })
                    .then(() => {
                        setUser(user);
                        navigate(location.state ? location.state : "/");
                    })
                    .catch((error) => {
                        console.log("Profile update error:", error);
                        setUser(user);
                        navigate(location.state ? location.state : "/");
                    });
            })
            .catch((error) =>
                console.error("Google login failed:", error.code)
            );
    };

    return (
        <div className="mt-6">
            <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center border py-2 rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200 cursor-pointer"
            >
                <FcGoogle className="mr-2" size={20} />
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;
