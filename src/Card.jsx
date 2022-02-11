// import { FirebaseError } from 'firebase/app';
import React, { useState } from 'react';
import TodoItems from './TodoItems.jsx';

function Card() {

    const [value, setValue] = useState("");
    const [items, setItems] = useState([]);

    function eventHandler(event) {
        setValue(event.target.value);
    }

    function addItem() {

        // firebase
        //   .firestore
        //      .collections('todos')
        //         .add({value})
        //           .then((docref)=>
        //           console.log('Product has been added', docref))
        //             .catch((error)=>console.log(error))


        setItems(prevItems => {
            return [...prevItems, value];
        })
        setValue("");
    }

    function deleteItem(id) {
        setItems(prevItems => prevItems.filter((item, index) => index !== id))
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
                    (<TodoItems key={index} id={index} text={todo} onChecked={deleteItem} />)
                )}
            </ul>
        </div>

    </div>
}

export default Card;