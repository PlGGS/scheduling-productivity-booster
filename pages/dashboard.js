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
import ChatRoom from "../components/chatRoom";
import GroupLayout from "../components/groupLayout";
import GroupList from "../components/groupList";

const Dashboard = (props) => {
  return (
    <Layout>
      <GroupList />
      <GroupLayout />
    </Layout>
  );
}

export default Dashboard;