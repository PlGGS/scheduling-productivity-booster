import React, { useEffect, useRef, useState } from "react";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import styles from '../styles/Home.module.css'
import {
  doc,
  addDoc,
  collection,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Layout from "../components/layout";
import ChatRoom from "../components/chatroom";
import GroupList from "../components/groupList";

const Dashboard = (props) => {
  const [user] = useAuthState(auth);

  return (
    <Layout>
      <GroupList/>
      <div className={styles.container}>
        <h1>This is temporary content on the main section of the dashboard</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        
        <section>{user ? <ChatRoom /> : <SignIn />}</section>
      </div>
    </Layout>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

export default Dashboard;