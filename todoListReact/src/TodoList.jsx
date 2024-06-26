import { useState } from 'react';
import TodoCard from './TodoCard';
import './TodoList.css'
export default function TodoList() {
    const [todoList, setTodoList] = useState([]);
    const [idCount, setIdCount] = useState(1);
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    return <>
    <div>
        <h2>Create new Todo:</h2>
        <input placeholder='title' value={newTitle} onChange={(event) => {setNewTitle(event.target.value)}}/>
        <input placeholder='description' value={newDesc} onChange={(event) => {setNewDesc(event.target.value)}}/>
        <button onClick={() => {setTodoList((curr) => [...curr, {'id': idCount, 'title': newTitle, 'description': newDesc}]);setNewTitle('');setNewDesc('');setIdCount((id) => id+1)}}>Create</button>
    </div>
    {todoList && todoList.map((element) => <TodoCard todoEntry={element} onDone={() => {setTodoList((curr) => curr.filter((ele) => ele.id != element.id))}} />)}
    </>
}