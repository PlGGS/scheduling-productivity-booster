import { React, useState, useEffect } from "react";
import { app, db, auth, provider } from '../../services/firebase.js'
import { signInWithPopup, signOut } from "firebase/auth";
import Dashboard from "../../pages/dashboard.js";

function App() {
  const [user, setUser] = useState(null);

  //Google Authentication implemented for Login
  const handleLogin = () => {
    signInWithPopup(auth, provider);
  };

  //LogOut
  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log("signed out");
      setUser(null);
    })
  };
  //Saving the username after sucessfull login
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        setUser(user.displayName);
      }
    });
  }, []);
  
  return (
    <div className="App">
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      {user && <Dashboard user={user}/>}
    </div>
  );
}

export default App;