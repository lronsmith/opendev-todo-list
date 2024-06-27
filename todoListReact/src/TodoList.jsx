import { React, useState } from 'react';
import TodoCard from './TodoCard';
import './TodoList.css'

export default function TodoList() {
    const [todoList, setTodoList] = useState([]);
    const [idCount, setIdCount] = useState(1);
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');

    function createTodo() {
        setTodoList((curr) => [...curr, {'id': idCount, 'title': newTitle, 'description': newDesc}])
        setIdCount((id) => id+1);
        setNewDesc('');
        setNewTitle('');
    }

    function deleteTodo(remove_id) {
        setTodoList((curr) => curr.filter((ele) => ele.id != remove_id))
    }
    
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