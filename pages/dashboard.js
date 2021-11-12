import React, { useEffect, useRef, useState } from "react";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import styles from "../styles/Home.module.css";
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

const Dashboard = (props) => {
  return (
    <>
      <div>
          <Layout>
        <div className="wrapper">
            <GroupLayout />
        </div>
          </Layout>
      </div>
      <style>{`
        .wrapper {
          // border-style: solid;
          // border-color: green;
          width: 100%;
        height: 91.1vh; //fullscreen without footer

        }
    `}</style>
    </>
  );
};

export default Dashboard;
