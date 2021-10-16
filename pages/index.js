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
            Scheduling Productivity Booster
          </h1>
          <br />
          <p className={styles.description}>
            By: Saiyed Irfanullah, Isaiah Antonio, Kuiper Poznyak, Ming Zhang, David Shargorodsky, Blake Boris{' '}
            <br />
            <br />
          </p>

          
        </main>
      </div>
      </Layout>
    )
  }
}

export default Index;
