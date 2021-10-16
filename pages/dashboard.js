import { React } from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'

const Dashboard = () => {

  return (
    <Layout>
      <div className={styles.container}>
        <h1>This is temporary content on the main section of the dashboard</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </Layout>
  )
}

export default Dashboard;
