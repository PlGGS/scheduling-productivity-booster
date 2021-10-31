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
import GroupLayout from "../components/groupLayout";
import GroupList from "../components/groupList";

const Dashboard = (props) => {
  const [selectedWorkgroup, setSelectedWorkgroup] = useState("");

  useEffect(
    () =>
      onSnapshot(collection(db, "workgroup"), (snapshot) =>
      setSelectedWorkgroup(snapshot.docs[0].name)
      ),
    []
  );

  return (
    <Layout>
      <span>{selectedWorkgroup}</span>
      <GroupList />
      <GroupLayout />
    </Layout>
  );
}

export default Dashboard;