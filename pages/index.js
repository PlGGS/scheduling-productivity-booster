import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Footer from '../components/footer.js'
import Collection from '../components/firebase/collection'
import App from '../components/firebase/app'

class Index extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Scheduling Productivity Booster</title>
          <meta name="DePaul University CSC394 Scheduler" content="By: Saiyed Irfanullah, Isaiah Antonio, Kuiper Poznyak, Nathan Santiago, David Shargorodsky, Blake Boris" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

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

          <App/>
        </main>
        <Footer />
      </div>
    )
  }
}

export default Index;
