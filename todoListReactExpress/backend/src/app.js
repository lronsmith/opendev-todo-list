const express = require('express');
const app = express();
var cors = require('cors')
app.use(cors())
app.use(express.json())
const port = 3000;

let todos = []

let idCounter = 1

app.get('/', (req, res) => {
    res.send("Hello, World!");
})

app.get('/todos/list/', (req, res) => {
    res.json({todos: todos})
})

app.post('/todos/create/', (req, res) => {
    todos.push({id: idCounter++, title: req.body.title, description: req.body.description})
    res.sendStatus(200);
})

app.delete('/todos/delete/', (req, res) => {
    todos = todos.filter((elem) => elem.id != req.body.id);
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`TodoList app listening on port ${port}`)
  })