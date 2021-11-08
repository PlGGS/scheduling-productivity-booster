import { React, useEffect, useState } from 'react';
import { onSnapshot, collection } from '@firebase/firestore';
import { db } from '../services/firebase';

function CheckList({coll, field, checkAll, shouldCrossOut}) {
  const [items, setItems] = useState([{ id: "initial" }]);
  const [checked, setChecked] = useState([]);

  if (shouldCrossOut !== true) shouldCrossOut = false;
  if (checkAll !== true) checkAll = false;

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const isChecked = (value) => checked.includes(value) ? "checked-item" : "unchecked-item";

  //TODO make this only pull from the currently selected workgroup
  useEffect(
    () =>
      onSnapshot(collection(db, coll), (snapshot) =>
      setItems(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  return (
    <>
      <div className="checkList">
        <div className="list-container">
          {items.map((item, index) => (
            <div className="list-item" key={index}>
              <input value={item[field]} type="checkbox" defaultChecked={checkAll} onChange={handleCheck} />
              <span className={shouldCrossOut ? isChecked(item[field]) : "unchecked-item"}>{item[field]}</span>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .list-container {
          padding-top: 10px;
        }
        .list-item {
          padding-bottom: 10px;
        }
        .checked-item {
          text-decoration: line-through;
        }
      `}</style>
    </>
  )
}

export default CheckList;