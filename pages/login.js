import { React, useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Footer from '../components/footer.js'
import Collection from '../components/firebase/collection'
import Dashboard from './dashboard'
import { useRouter } from 'next/router'

import { app, db, auth, provider } from '../services/firebase.js'
import { signInWithPopup, signOut } from "firebase/auth";

const Login = ({ user }) => {
  return (
    <div className={styles.container}>
      <LoginLogout />
      {/* <h1>Hello, {user}</h1> */}
    </div>
  )
}


function LoginLogout() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  //Google Authentication implemented for Login
  const handleLogin = () => {
    signInWithPopup(auth, provider);
  };

  //LogOut
  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log("signed out");
      setLoggedIn(false);
    })
  };

  //Saving the username after sucessfull login
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        console.log("signed in");
        setLoggedIn(true);
      }
    });
  }, []);

  return (
    <div className="App">
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      {loggedIn && router.push('./dashboard')}
    </div>
  );
}

export default Login;
