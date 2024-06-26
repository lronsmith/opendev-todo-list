import { React, useEffect, useState } from 'react';
import TodoCard from './TodoCard';
import './TodoList.css'
export default function TodoList() {
    const [todoList, setTodoList] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [mySwitch, setMySwitch] = useState(false);

    function flipSwitch() {
        setMySwitch((curr) => !curr);
    }

    function getTodoList() {
        fetch('http://localhost:3000/todos/list/', {
            mode: "cors",
            headers: {
              'Access-Control-Allow-Origin':'*'
            }
        })
        .then((data) => data.json())
        .then((json_data) => {console.log(json_data);setTodoList(json_data.todos)})
    }

    function createTodo() {
        fetch('http://localhost:3000/todos/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: newTitle,
                description: newDesc,
            })
        })
        .then(() => {
            flipSwitch();
            setNewTitle('');
            setNewDesc('');
        })
    }

    function deleteTodo(id) {
        fetch('http://localhost:3000/todos/delete/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
            })
        })
        .then(() => {
            flipSwitch();
        });
    }

    useEffect(() => {
        getTodoList();
    }, [mySwitch])

    return <>
    <div>
        <h2>Create new Todo:</h2>
        <input placeholder='title' value={newTitle} onChange={(event) => {setNewTitle(event.target.value)}}/>
        <input placeholder='description' value={newDesc} onChange={(event) => {setNewDesc(event.target.value)}}/>
        <button onClick={createTodo}>Create</button>
    </div>
    {todoList && todoList.map((element) => <TodoCard key={element.id} todoEntry={element} onDone={() => {deleteTodo(element.id)}} />)}
    </>
}