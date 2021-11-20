import { doc, setDoc, updateDoc, addDoc, collection, Timestamp, arrayUnion, getDoc } from "@firebase/firestore";
import { auth, db, provider } from "../services/firebase";
import { React, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function GroupButtons({ ...props }) {
  const [newGroupName, setNewGroupName] = useState("");
  const [groupNameToJoin, setGroupNameToJoin] = useState("");
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [showJoinGroupModal, setShowJoinGroupModal] = useState(false);

  const handleNewShow = () => setShowNewGroupModal(true);
  const handleNewClose = () => setShowNewGroupModal(false);

  const handleJoinShow = () => setShowJoinGroupModal(true);
  const handleJoinClose = () => setShowJoinGroupModal(false);

  async function createNewGroup() {
    if (newGroupName !== "") {
      //Check if group already exists, so we don't overwrite its admin and datecreated
      const group = doc(db, "workgroup", newGroupName);
      const docExists = await getDoc(group);
      if (docExists.exists()) {
        alert("Group with that name already exists");
      }
      else {
        await setDoc(doc(db, "workgroup", newGroupName), {
          name: newGroupName,
          datecreated: Timestamp.now(),
          admin: props.user.uid,
          members: [props.user]
        });
      }
      //Add group to workgroups collection with a list of 
      // users in that group containing the user that just created the group
      //switch the dashboard to that group
      props.setWorkgroup(newGroupName);
      setShowNewGroupModal(false);
      setNewGroupName("");
    }
  }

  async function joinGroup() {
    if (groupNameToJoin !== "") {
      //Add group to workgroups collection with a list of 
      // users in that group containing the user that just created the group
      const group = doc(db, "workgroup", groupNameToJoin);
      console.log(group);
      await updateDoc(group, {
        members: arrayUnion(props.user)
      }).then((status) => {
        alert("Successfully added to " + groupNameToJoin)
      }).catch((error) => {
        alert("Fail");
      });
      //switch the dashboard to that group
      props.setWorkgroup(groupNameToJoin);
      setShowJoinGroupModal(false);
      setGroupNameToJoin("");
    }
  }

  return (
    <>
      <Button className="newGroupBtn" variant="primary" style={{width: "50%"}} onClick={handleNewShow}>
        New Group
      </Button>
      <Button className="joinGroupBtn" variant="secondary" style={{width: "50%"}} onClick={handleJoinShow}>
        Join Group
      </Button>
      <Modal show={showNewGroupModal} onHide={handleNewClose}>
        <Modal.Header>
          <Modal.Title>New group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="newGroupNameInput"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="Group name"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleNewClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createNewGroup}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showJoinGroupModal} onHide={handleJoinClose}>
        <Modal.Header>
          <Modal.Title>Join a new group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="newGroupNameInput"
            value={groupNameToJoin}
            onChange={(e) => setGroupNameToJoin(e.target.value)}
            placeholder="Group name"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleJoinClose}>
            Close
          </Button>
          <Button variant="primary" onClick={joinGroup}>
            Join
          </Button>
        </Modal.Footer>
      </Modal>
      <style>{`
      `}</style>
    </>
  );
}

export default GroupButtons;
