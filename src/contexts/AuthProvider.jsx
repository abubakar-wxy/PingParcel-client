import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.init";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
const provider = new GoogleAuthProvider();

// ===========================
// Auth Provider
// ===========================
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // =============================
    // ----> Write all the code and logic to share with entire project <----
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogle = () => {
        return signInWithPopup(auth, provider);
    };

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    };

    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    };

    const resetUserPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    // check user log in or not using this and update the user
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unSubscribe();
        };
    }, []);

    const authInfo = {
        user,
        setUser,
        createUser,
        logOut,
        loginUser,
        loading,
        setLoading,
        updateUser,
        signInWithGoogle,
        resetUserPassword,
    };

    return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
