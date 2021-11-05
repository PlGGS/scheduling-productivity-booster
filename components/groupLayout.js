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
import Calendar from './calendar';
import CheckList from './checkList';
import Chatroom from './chatroom';
import UserList from './userList';
import GroupList from "../components/groupList";

function GroupLayout() {
  const [allWorkgroups, setAllWorkgroups] = useState([{ name: "Loading...", id: "initial" }]);
  const [userWorkgroups, setUserWorkgroups] = useState([{ name: "Loading...", id: "initial" }]);
  const [allUsers, setAllUsers] = useState([{ name: "Loading...", id: "initial" }]);
  const [allMemberships, setAllMemberships] = useState([{ name: "Loading...", id: "initial" }]);
  const [userSelectedWorkgroup, setUserSelectedWorkgroup] = useState("");

  const [user] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState("");

  //When user first logs in with google
  //1. add them to user collection if they're not already in it
  //2. check the groups they're already a part of by checking membership collection
  //3. have a button on the dashboard that lets them be added to or create a new group
  //4. if they're added to a workgroup or they create a new workgroup, add their userid and the new workgroup groupid to the membership collection

  useEffect(
    () => {
      onSnapshot(collection(db, "workgroup"), (snapshot) => {
        setAllWorkgroups(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))),
        setUserSelectedWorkgroup(snapshot.docs[0].data().name)
      }),
      onSnapshot(collection(db, "user"), (snapshot) => {
        setAllUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        // ,
        // setCurrentUser(snapshot.docs.map((doc) =>  {
        //   if ()
        //   ({ ...doc.data(), id: doc.id }))
        // })
      }),
      onSnapshot(collection(db, "membership"), (snapshot) => {
        // setUserWorkgroups(snapshot.docs.map((doc) => {
        //   if (doc.data().userid === currentuserid)
        //     return ({ ...doc.data(), id: doc.id });
        // }))
      })
      // ,
      // auth.onAuthStateChanged((user) => {
      //     if (user !== null) {
      //       setUser("Hello, " + user.displayName);
      //       setButtonText("Logout")
      //     }
      //   }
      // )
    }, []
  );

  return (
    <>
      <Container padding={false} maxWidth={false}>
        <Grid container spacing={3} xs={12}>
          <Grid item xs={16} sm={4} md={4}>
            <GroupList setWorkgroup={setUserSelectedWorkgroup} workgroup={userSelectedWorkgroup} workgroups={allWorkgroups}/>
            <span>View availability for: {userSelectedWorkgroup}</span>
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

export default GroupLayout;