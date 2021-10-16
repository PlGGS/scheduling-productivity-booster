import { React, useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { app, db, auth, provider } from '../services/firebase.js'

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        setUser(user.displayName);
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1>Hello, {user}</h1>
    </div>
  )
}

export default Dashboard;
