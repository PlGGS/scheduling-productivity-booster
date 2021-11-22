import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Collection from "../components/firebase/collection";
import Link from "next/link";
import Layout from "../components/layout";

class Index extends React.Component {
  render() {
    return (
      <Layout>
        <div className={styles.container}>
          <main className={styles.main}>
            <h1 className={styles.title}>Tutorial Video</h1>
            <br />
            <iframe
              width="853.3333333333334"
              height="480"
              src="https://www.youtube.com/embed/g8m56D6VKKo"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </main>
        </div>
      </Layout>
    );
  }
}

export default Index;
