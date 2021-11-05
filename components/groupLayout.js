import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { React, useEffect, useState } from 'react';
import { Container, Row, Col } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import Link from './link';
import { IconContext } from 'react-icons';
import { ObjectCollection } from './firebase/objectCollection';
import { onSnapshot, collection } from '@firebase/firestore';
import { auth, db, provider } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Calendar from './Calendar';
import CheckList from './checkList';
import Chatroom from './chatroom';
import UserList from './userList';
import GroupList from "../components/groupList";

function GroupLayout() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Container padding={false} maxWidth={false}>
        <Grid container spacing={3} xs={12}>
          <Grid item xs={16} sm={4} md={4}>
            <GroupList />
            <span>View availability for:</span>
            <CheckList coll="user" field="firstname" shouldCrossOut={false} />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Calendar />
            <span>To-do:</span>
            {/* The checklist below currently pulls from workgroup collection until I can figure out how to pull from a workgroup's checklist collection */}
            <CheckList coll="workgroup" field="name" shouldCrossOut={true} />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <span>This will be buttons</span>
            <Chatroom />
          </Grid>
        </Grid>
      </Container>
    </>
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

export default GroupLayout;