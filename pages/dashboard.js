import { React, useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Footer from '../components/footer.js'
import Collection from '../components/firebase/collection'

import { app, db, auth, provider } from '../services/firebase.js'
import { signInWithPopup, signOut } from "firebase/auth";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <h1>Hello, {getDisplayName()}</h1>
    </div>
  )
}

function getDisplayName() {
  const [user, setUser] = useState(null);

  //Saving the username after sucessfull login
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        console.log(user.displayName);
        setUser(user.displayName);
      }
    });
  }, []);

  return user;
}

export default Dashboard;
