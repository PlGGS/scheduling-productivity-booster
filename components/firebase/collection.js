import React from 'react'
import { app, db, auth } from '../../services/firebase.js'
import { doc, collection, query, where, getDocs } from "firebase/firestore";

async function getCollection() {
  const users = [];
    const q = query(collection(db, "users")/*, where("firstname", "==", "Blake")*/);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // Console logs aren't firing from this location, which is what's leading me to think getCollection() isn't even being called
      console.log(doc.id)
      users.push({
        ...doc.data(), 
        key: doc.id
      });
    });

    return users;
}

class Collection extends React.Component {
  // const [loading, setLoading] = useState(true);
  // const [users, setUsers] = useState([]);
  users = [];

  componentDidMount() {
    //Blake: Either getCollection() is not being called properly, or it's just not retrieving any users from the database
    this.users = getCollection();
    console.log(`users: "${this.users}"`)
  }

  render() {
    return (
      <div>
        <a>{this.users}</a> 
      </div>
    )
  }
}

export default Collection;