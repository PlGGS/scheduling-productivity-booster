import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Footer from '../components/footer.js'

export default function Home() {
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
        <br/>
        <p className={styles.description}>
          By: Saiyed Irfanullah, Isaiah Antonio, Kuiper Poznyak, Nathan Santiago, David Shargorodsky, Blake Boris{' '}
          <br/>
          <br/>
          <code className={styles.code}>Team 2</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>
      <Footer/>
    </div>
  )
}
