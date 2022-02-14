import React, { useState } from 'react';
import TodoItems from './TodoItems.jsx';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA6QzKXrIQsjKF-hwXQClAMDpTD0NZDfow",
    authDomain: "to-do-list-e99e2.firebaseapp.com",
    projectId: "to-do-list-e99e2",
    storageBucket: "to-do-list-e99e2.appspot.com",
    messagingSenderId: "157707173794",
    appId: "1:157707173794:web:578a20b6880e42dd477cfb"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();


function Card() {

    const [value, setValue] = useState("");
    const [items, setItems] = useState([]);

    db.collection("Todos")
           .get()
             .then((snapshot)=>{
                 const todoItem=snapshot.docs.map((doc)=>{
                     const docs=doc.data();
                     docs['id']=doc.id;
                     return docs;
                 })
                 console.log(todoItem);
                 setItems(todoItem);
             })

    function eventHandler(event) {
        setValue(event.target.value);
    }

    function addItem() {
        db.collection("Todos").add({
            notes:value
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        

        db.collection("Todos")
          .get()
            .then((snapshot)=>{
                const todoItem=snapshot.docs.map((doc)=>{
                    const docs=doc.data();
                    docs['id']=doc.id;
                    return docs;
                })
                console.log(todoItem);
                setItems(todoItem);
            })    

        setValue("");
    }

    function deleteItem(id) {

        const docRef=db.collection('Todos').doc(id);

        docRef.delete()
          .then(()=>{
              console.log("Deleted successfully");
          })
           .catch((error)=>{
               console.log("Error: ",error);
           })

         
        db.collection("Todos")
           .get()
             .then((snapshot)=>{
                 const todoItem=snapshot.docs.map((doc)=>{
                     const docs=doc.data();
                     docs['id']=doc.id;
                     return docs;
                 })
                 console.log(todoItem);
                 setItems(todoItem);
             })

    }

    return <div className='card'>
        <div className='heading'>
            <h1>To Do List</h1>
        </div>
        <input onChange={eventHandler} id='input' className="input" value={value} />
        <button onClick={addItem} >
            <span>Add</span>
        </button>

        <div id="listcontent">
            <ul>
                {items.map((todo, index) =>
                    (<TodoItems key={index} id={todo.id} text={todo.notes} onChecked={deleteItem} />)
                )}
            </ul>
        </div>

    </div>
}

export default Card;