const db = require('./db');
const express = require('express');
const app = express();
var cors = require('cors')
app.use(cors())
app.use(express.json())
const port = 3000;

let todos = []

async function updateTodos() {
    return new Promise(async (res, rej) => {
        data = await db.getTodos();
        todos = data;
        res(true);
    });
    
}

updateTodos();

app.get('/', (req, res) => {
    res.send("Hello, World!");
})

app.get('/todos/list/', async (req, res) => {
    await updateTodos();
    res.json({todos: todos})
})

app.post('/todos/create/', async (req, res) => {
    await db.addTodo(req.body.title, req.body.description);
    res.sendStatus(200);
})

app.delete('/todos/delete/:id', async(req, res) => {
    await db.deleteTodo(req.params.id);
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`TodoList app listening on port ${port}`)
  })