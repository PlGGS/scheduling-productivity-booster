import styles from "../styles/Home.module.css";
import Image from "next/image";
import { React, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import {
  onSnapshot,
  collection,
  setDoc,
  doc,
  Timestamp,
} from "@firebase/firestore";
import { auth, db, provider } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Calendar from "./calendar";
import CheckList from "./checkList";
import Chatroom from "./chatroom";
import GroupList from "./groupList";
import GroupButtons from "./groupButtons";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
  },
}));

function GridItem(props) {
  return (
    // From 0 to 600px wide (smart-phones), I take up 12 columns, or the whole device width!
    // From 600-690px wide (tablets), I take up 6 out of 12 columns, so 2 columns fit the screen.
    // From 960px wide and above, I take up 25% of the device (3/12), so 4 columns fit the screen.
    <Grid item xs={16} sm={8} md={4}>
      <Paper className={useStyles().paper}>{props.children}</Paper>
    </Grid>
  );
}

function GroupLayout() {
  const [allWorkgroups, setAllWorkgroups] = useState([
    { name: "Loading...", id: "initial" },
  ]);
  const [userWorkgroups, setUserWorkgroups] = useState([
    { name: "Loading...", id: "initial" },
  ]);
  const [allUsers, setAllUsers] = useState([
    { name: "Loading...", id: "initial" },
  ]);
  const [allMemberships, setAllMemberships] = useState([
    { name: "Loading...", id: "initial" },
  ]);
  const [userSelectedWorkgroup, setUserSelectedWorkgroup] = useState("");

  const [user] = useAuthState(auth);
  const { uid, photoURL, displayName } =
    auth.currentUser !== null
      ? auth.currentUser
      : { uid: "", photoURL: "", displayName: "" };

  // const { creationTime } = auth.currentUser.metadata;

  const [currentUser, setCurrentUser] = useState({});

  //When user first logs in with google
  //1. add them to user collection if they're not already in it
  //2. check the groups they're already a part of by checking membership collection
  //3. have a button on the dashboard that lets them be added to or create a new group
  //4. if they're added to a workgroup or they create a new workgroup, add their userid and the new workgroup groupid to the membership collection

  useEffect(() => {
    onSnapshot(collection(db, "workgroup"), (snapshot) => {
      setAllWorkgroups(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      ),
        setUserSelectedWorkgroup(snapshot.docs[0].data().name);
    }),
      onSnapshot(collection(db, "user"), (snapshot) => {
        setAllUsers(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
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
      });
    // ,
    // auth.onAuthStateChanged((user) => {
    //     if (user !== null) {
    //       setUser("Hello, " + user.displayName);
    //       setButtonText("Logout")
    //     }
    //   }
    // )
  }, []);

  useEffect(() => {
    if (uid !== "") {
      setDoc(doc(db, "user", uid), {
        displayname: displayName,
        datecreated: Timestamp.now(),
        isadmin: false,
      }),
        setCurrentUser({
          displayname: displayName,
          datecreated: Timestamp.now(),
          isadmin: false,
          uid: uid,
        });
    }
  }, [uid]);

  return (
    <>
      <div className="wrapper">
        <Grid
          container
          className="groupLayoutContainer"
          padding={false}
          maxWidth={false}
          maxHeight={false}
        >
          <Grid item xs={12} sm={2} md={2}>
            <Paper>
              <div className="sectionContainer">
                <GroupList
                  setWorkgroup={setUserSelectedWorkgroup}
                  workgroup={userSelectedWorkgroup}
                  workgroups={allWorkgroups}
                />
                <span>View availability for: {userSelectedWorkgroup}</span>
                <CheckList
                  coll="user"
                  field="firstname"
                  checkAll={true}
                  shouldCrossOut={false}
                />
                <span>To-do:</span>
                {/* The checklist below currently pulls from workgroup collection until I can figure out how to pull from a workgroup's checklist collection */}
                <CheckList
                  coll="workgroup"
                  field="name"
                  shouldCrossOut={true}
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={10} md={8}>
            <Paper className={useStyles().paper}>
              <div className="sectionContainer">
                <Calendar />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <Paper className={useStyles().paper}>
              <div className="sectionContainer">
                <GroupButtons />
                <Chatroom />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <style jsx>{`
        .newGroupBtn {
          width: 100%;
        }
        .calendarGrid {
          overflow: clip;
        }
        .sectionContainer {
          height: 90.99vh;
        }
        .wrapper {
          height: 71.7vh;
          // border-style: solid;
          // border-color: red;
          // grid-template-columns: repeat(3, 1fr);
          // grid-template-rows: repeat(2, 1fr);
          // grid-gap: 10px;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
}

export default GroupLayout;
