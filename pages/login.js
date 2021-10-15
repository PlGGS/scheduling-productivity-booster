import { React, useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Footer from '../components/footer.js'
import Collection from '../components/firebase/collection'
import Dashboard from './dashboard'
import { useRouter } from 'next/router'

import { app, db, auth, provider } from '../services/firebase.js'
import { signInWithPopup, signOut } from "firebase/auth";

const Login = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  const loginLogout = async function () {
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
      <div className="LoginLogout">
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  loginLogout().then((res)=>{
    // console.log(res);
    // setRes(res);
    router.push('./dashboard')
  });

  return (
    <div className={styles.container}>

      {/* <h1>Hello, {user}</h1> */}
    </div>
  )
}




export default Login;
