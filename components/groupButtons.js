import { doc, updateDoc, addDoc, collection, Timestamp } from "@firebase/firestore";
import { auth, db, provider } from "../services/firebase";
import { React, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function GroupButtons({ ...props }) {
  const [newGroupName, setNewGroupName] = useState("");
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [showJoinGroupModal, setJoinNewGroupModal] = useState(false);

  const handleClose = () => setShowNewGroupModal(false);
  const handleShow = () => setShowNewGroupModal(true);

  async function createNewGroup() {
    if (newGroupName !== "") {
      //Add group to workgroups collection with a list of 
      // users in that group containing the user that just created the group
      await addDoc(collection(db, "workgroup"), {
        name: newGroupName,
        datecreated: Timestamp.now(),
        members: [props.user]
      });
      //switch the dashboard to that group
      props.setWorkgroup(newGroupName);
      setShowNewGroupModal(false);
    }
  }

  return (
    <>
      <Button className="newGroupBtn" variant="primary" style={{width: "50%"}} onClick={handleShow}>
        New Group
      </Button>
      <Button className="joinGroupBtn" variant="secondary" style={{width: "50%"}} onClick={handleShow}>
        Join Group
      </Button>
      <Modal show={showNewGroupModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>New Group</Modal.Title>
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createNewGroup}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      <style>{`
      `}</style>
    </>
  );
}

export default GroupButtons;
