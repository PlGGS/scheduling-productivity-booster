import styles from '../styles/Home.module.css';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import Link from './link';
import { IconContext } from 'react-icons';
import { ObjectCollection } from './firebase/objectCollection';
import { onSnapshot, collection } from '@firebase/firestore';
import { db } from '../services/firebase';

function UserList(props) {
  const [users, setUsers] = useState([{ name: "Loading...", id: "initial" }]);
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  //TODO make this only pull from props.workgroup
  useEffect(
    () =>
      onSnapshot(collection(db, "user"), (snapshot) =>
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <ul className='nav-menu-items' onClick={showSidebar}>
            {users.map((item, index) => {
              return (
                <li key={index} className={'text-' + index}>
                  <span>{item.firstname}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </IconContext.Provider>
      <style jsx>{`
            .navbar {
              background-color: #fff;
              height: 80px;
              display: flex;
              justify-content: start;
              align-items: center;
            }
            
            .menu-bars {
              margin-left: 2rem;
              font-size: 2rem;
              background: none;
            }
            
            .nav-menu {
              background-color: #fff; //change this later
              width: 250px;
              height: 100vh;
              display: flex;
              justify-content: center;
              position: fixed;
              top: 100px;
              left: -100%;
              transition: 800ms;
              border-style: solid;
              
            }
            
            .nav-menu.active {
              left: 0;
              transition: 350ms;
            }
            
            .nav-text {
              display: flex;
              justify-content: start;
              align-items: center;
              padding: 8px 0px 8px 16px;
              list-style: none;
              height: 60px;
            }
            
            .nav-text a {
              text-decoration: none;
              color: #f5f5f5;
              font-size: 18px;
              width: 95%;
              height: 100%;
              display: flex;
              align-items: center;
              padding: 0 16px;
              border-radius: 4px;
            }
            
            .nav-text a:hover {
              background-color: #1a83ff;
            }
            
            .nav-menu-items {
              width: 100%;
            }
            
            .navbar-toggle {
              background-color: #fff;
              width: 100%;
              height: 80px;
              display: flex;
              justify-content: start;
              align-items: center;
            }
            
            span {
              margin-left: 16px;
            }
        `}</style>
    </>
  );
}  

export default UserList;