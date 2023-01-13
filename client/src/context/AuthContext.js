import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const navigate = useNavigate();
    const [isSignedIn, setIsSignedIn] = useState(false);
    
    const handleSignIn = (userProfile) => {

    }

    const handleSignOut = () => {

    }

    const handleSignUp = () => {

    }

    return (
        <AuthContext.Provider value={{handleSignIn, handleSignOut, handleSignUp, isSignedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
