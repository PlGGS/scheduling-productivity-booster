import React, { useEffect, useRef, useState } from "react";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
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

function Chatroom() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <section>{user ? <ChatRoom /> : <span>Login for chat</span>}</section>
    </div>
  );
}

function ChatRoom() {
  const dummy = useRef();
  // const messagesRef = firestore.collection('messages');
  // const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages, setMessages] = useState([]);
  useEffect(
    () =>
      onSnapshot(collection(db, "messages"), (snapshot) => {
        const userMessages = [];
        snapshot.forEach((doc) => {
          userMessages.push(doc.data());
        });
        setMessages(userMessages);
        dummy.current.scrollIntoView({ behavior: "smooth" });
      }),
    []
  );
  // onSnapshot(collection(db, "messages"), (snapshot) => {
  //   setMessages(JSON.stringify(snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))));
  // });
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await addDoc(collection(db, "messages"), {
      text: formValue,
      createdAt: Timestamp.now(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div style={{ height: "69.1vh", "overflow-y": "scroll" }}>
        <main>
          {messages &&
            //chat order fixed. > sooner on the bottom, < sooner on the top
            messages
              .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
              .map((msg, i) => <ChatMessage key={i} message={msg} />)}
          <span ref={dummy}></span>
        </main>
      </div>
      <form onSubmit={sendMessage}>
        <div className="chat">
          <table>
            <tr>
              <td>
                <input
                  className="chatInput"
                  value={formValue}
                  onChange={(e) => setFormValue(e.target.value)}
                  placeholder="say something nice"
                />
              </td>
              <td>
                <button
                  className="chatButton"
                  type="submit"
                  disabled={!formValue}
                >
                  ⬆️
                </button>
              </td>
            </tr>
          </table>
        </div>
      </form>
      <style jsx>{`
        .chat {
          font-size: 12pt;
        }
        .chatInput {
          height: 30px;
          width: 154%;
        }
        .chatButton {
          height: 28px;
          transform: translate(77px, 0px);
        }
      `}</style>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <table>
        <tr>
          <td>
            <div className={`message ${messageClass}`}>
              <img
                src={
                  photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
                }
                alt="profile"
              />
              
            </div>
          </td>
          <td>
            <p>{text}</p>
          </td>
        </tr>
      </table>
      <style jsx>{`
        .message img {
          width: 50px;
          border-radius: 50%;
        }
      `}</style>
    </>
  );
}

export default Chatroom;
