import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Footer from '../components/footer.js'
import Collection from '../components/firebase/collection'

const Dashboard = ({ user }) => {
  return (
    <div className={styles.container}>
      <h1>Hello, {user}</h1>
    </div>
  )
}


export default Dashboard;
