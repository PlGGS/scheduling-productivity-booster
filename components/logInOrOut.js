import { React, useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { signInWithPopup, signOut } from "firebase/auth";
import { app, db, auth, provider } from '../services/firebase.js'
import { useRouter } from 'next/router'

const LogInOrOut = (props) => {
  const [buttonText, setButtonText] = useState("Login");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        setUser("Hello, " + user.displayName);
        setButtonText("Logout")
      }
    });
  }, []);

  //Google Authentication implemented for Login
  const handleLoginLogout = () => {
    if (buttonText == "Login") {
      signInWithPopup(auth, provider).then((res) => {
        console.log("signed in");
        router.push('./dashboard')
      });
    }
    else {
      signOut(auth).then(() => {
        console.log("signed out");
        router.push('/')
      });
    }
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <p id="username">{user} </p>
            </td>
            <td>
              <button id="button" onClick={handleLoginLogout}>{buttonText}</button>
            </td>
          </tr>
        </tbody>
      </table>
      <style jsx>{`
        #username {
          padding-right: 10px
        }
        #button {
          
        }
      `}</style>
    </div>
  );
}

export default LogInOrOut