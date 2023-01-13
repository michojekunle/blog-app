import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const navigate = useNavigate();
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isLoading, setIsLoading ] = useState(false);

    
    const handleSignIn = (userProfile) => {
      const { email, password } = userProfile;
      setIsLoading(true);
      axios.post('http://localhost:3000/signin', {
        email,
        password,
      })
      .then(function (res) {
        setIsLoading(false)
        setIsSignedIn(true);
        console.log(res);
        alert("Successfully Logged In, Redirecting Home.")
        navigate('/home');
      })
      .catch(function (err) {
        setIsLoading(false);
        console.log(err);
        alert("Oops!, There was An error Logging in to your Account, Please Try Again.")
      });
    }

    const handleSignOut = (userProfile) => {
      setIsSignedIn(false);
      navigate('/signin')
    }

    const handleSignUp = (userProfile) => {
        const { fullname, email, password } = userProfile;
        setIsLoading(true);

        axios.post('http://localhost:3000/signup', {
            fullname,
            email,
            password,
          })
          .then(function (res) {
            setIsLoading(false);
            setIsSignedIn(true);
            console.log(res);
            alert("Successfully Created Your Account, Redirecting Home.")
            navigate('/home')
          })
          .catch(function (err) {
            setIsLoading(false);
            console.log(err);
            alert("Oops!, There was An error creating your Account, Please Try Again.")
          });
    }

    return (
        <AuthContext.Provider value={{isLoading, handleSignIn, handleSignOut, handleSignUp, isSignedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
