import React, { useEffect, useRef, useState } from "react";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import { makeStyles } from "@material-ui/core/styles";
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
import { Grid, Paper } from "@material-ui/core";
import { Dropdown, Selection } from "react-dropdown-now";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
  },
}));

const Feedback = (props) => {
  const [allUsers, setAllUsers] = useState([
    { name: "Loading...", id: "initial" },
  ]);

  useEffect(() => {
    onSnapshot(collection(db, "user"), (snapshot) => {
      setAllUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  return (
    <>
      <Layout>
        <Grid
          container
          className="groupLayoutContainer"
          padding={false}
          maxWidth={true}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10.5vh",
          }}
        >
          {allUsers.map((user, index) => (
            <Grid item xs={12} sm={2} md={3}>
              <div className="gridItem">
                <Paper>
                  <h2 className="username">
                    {user.firstname} {user.lastname}
                  </h2>
                  <div className="dropdownContainer">
                    <div className="dropdown">
                      <Dropdown
                        placeholder="Select a badge"
                        key={index}
                        options={["Scribe", "Leader", "Mediator", "Creative", "Positive"]}
                        value=""
                        onChange={(value) => console.log("change!", value)}
                        onSelect={(value) => console.log("selected!", value)} // always fires once a selection happens even if there is no change
                        onClose={(closedBySelection) =>
                          console.log("closedBySelection?:", closedBySelection)
                        }
                        onOpen={() => console.log("open!")}
                      />
                    </div>
                  </div>
                </Paper>
              </div>
            </Grid>
          ))}
        </Grid>
      </Layout>
      <style jsx>{`
        .gridItem {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding-left: 50px;
          padding-right: 50px;
          padding-top: 10%;
          padding-bottom: 10%;
        }
        .username {
          padding-left: 50px;
          padding-right: 50px;
          padding-top: 10%;
        }
        .dropdownContainer {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-bottom: 25px;
        }
        .dropdown {
          font-size: 14pt;
          width: 75%;
          border:1px solid #000;
        }
        .dropdown-control {
          font-weight: bold;

        }
      `}</style>
    </>
  );
};

export default Feedback;
