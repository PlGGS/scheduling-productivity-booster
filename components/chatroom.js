import React, { useEffect, useRef, useState } from "react";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import { addDoc, collection, onSnapshot, Timestamp } from "firebase/firestore";
import { auth, db } from "../services/firebase";

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
    <div>
      <div style={{"height": "300px", "overflow-y": "scroll"}}>
        <h1>⚛️🔥💬</h1>
        <main>
          {messages &&
            messages.map((msg, i) => <ChatMessage key={i} message={msg} />)}
          {console.log(messages)}

          <span ref={dummy}></span>
        </main>

        
      </div>
      <form onSubmit={sendMessage}>
      <input
        className="chatInput"
        value={formValue}
        onChange={(e) => setFormValue(e.target.value)}
        placeholder="say something nice"
      />
      <button className="chatButton" type="submit" disabled={!formValue}>
        ⬆️
      </button>

    </form>
    <style jsx>{`
        .chatInput {
          height:40px;
          font-size: 20pt;
        }
        .chatButton {
          font-size: 20pt;
        }
      `}</style>
  </div>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
          alt="profile"
        />
        <p>{text}</p>
      </div>
    </>
  );
}

export default ChatRoom;