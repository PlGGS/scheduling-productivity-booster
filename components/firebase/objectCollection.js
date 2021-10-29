import {useEffect, useState } from 'react'
import { app, db, auth } from '../../services/firebase.js'
import { doc, collection, query, where, getDocs, onSnapshot } from "firebase/firestore";

const ObjectCollection = ({name}) => {
  const [coll, setColl] = useState([]);

  //The following console log takes place after useEffect has updated coll
  console.log(coll);

  useEffect(() =>
      onSnapshot(collection(db, name), (snapshot) => {
        setColl(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
      }), []
  );

  return (
    coll
  )
}

export default ObjectCollection;