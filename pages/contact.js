import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Collection from '../components/firebase/collection'
import Link from 'next/link'
import Layout from '../components/layout'

class Index extends React.Component {
  render() {
    return (
      <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Contact Us
          </h1>
          <br />
          <br />
          <br />
          <a style={{fontSize: "24pt", textDecoration: 'underline', color: "blue"}} href="mailto:iantoni1@depaul.edu">iantoni1@depaul.edu</a>
          <br />
          <a style={{fontSize: "24pt", textDecoration: 'underline', color: "blue"}} href="mailto:bboris1@depaul.edu">bboris1@depaul.edu</a>
          <br />
          <a style={{fontSize: "24pt", textDecoration: 'underline', color: "blue"}} href="mailto:sirfanul@depaul.edu">sirfanul@depaul.edu</a>
          <br />
          <a style={{fontSize: "24pt", textDecoration: 'underline', color: "blue"}} href="mailto:dshargor@depaul.edu">dshargor@depaul.edu</a>
          <br />
          <a style={{fontSize: "24pt", textDecoration: 'underline', color: "blue"}} href="mailto:mzhang61@depaul.edu">mzhang61@depaul.edu</a>
        </main>
      </div>
      </Layout>
    )
  }
}

export default Index;
