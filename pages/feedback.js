import React, { useEffect, useRef, useState } from "react";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../services/firebase";
import Layout from "../components/layout";
import GroupLayout from "../components/groupLayout";
import { Grid, Paper } from "@material-ui/core";
import { Dropdown } from "react-dropdown-now";


const Feedback = (props) => {
  const [allUsers, setAllUsers] = useState([
    { name: "Loading...", photoURL: "", id: "initial" },
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
            <Grid key={user.firstname} item xs={12} sm={2} md={3}>
              <div className="gridItem">
                <Paper key={user.firstname}>
                  <img className="photo" src={user.photoURL} width="180em" height="180em" />
                  <h4 className="username">{user.displayname}</h4>
                  <div className="dropdownContainer">
                    <div className="dropdown">
                      <Dropdown
                        placeholder="Select a badge"
                        key={user.firstname}
                        options={[
                          "Scribe",
                          "Leader",
                          "Mediator",
                          "Creative",
                          "Positive",
                        ]}
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
        .photo {
          padding: 10%;
          border-radius: 50%;
        }
        .username {
          width: 10em;
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
          border: 1px solid #000;
        }
        .dropdown-control {
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

export default Feedback;
