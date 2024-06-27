# How will this workshop run

## General overview

1. Create a frontend only webapp that has our todo list
2. Add a backend that stores the data, so that we can access it across multiple devices
3. Add a database to store the data, so that it can be backed up, and not lost on server restart.

## Frontend only:

In the directory you want to work in, run

```shell
npm create vite@latest
```

Then name your project frontend, and select react as the framework to use. Then select Javascript as the language.

next do 

```shell
cd frontend
npm install
npm run dev
```

You should now be able to access your frontend on [http://localhost:5173/](http://localhost:5173)

Now lets do some other setup.

In the frontend folder there is a file `.eslintrc.cjs` which has some config for our linter (eslint), lets quickly turn off one of its linting rules.

Inside the file will be something like

```js
rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
```

Change it to

```js
rules: {
    'react/prop-types': 'off',
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
```

> Notice we added the line `'react/prop-types': 'off',`

Now open the file in the folder `src` called `App.jsx`. And remove basically all the unneccesary templates so that it looks like this:

```js
import './App.css'
import {React} from 'react';

function App() {
  return (
    <>
    </>
  )
}

export default App

```

And then save it.

Now we're going to make some files where we will start developing our todo list app. Create the following files:
- `TodoList.jsx`
    - This file will contain the functionality of making new todos and listing all the current ones
- `TodoList.css`
    - This file will contain our styles for the list
- `TodoCard.jsx`
    - This file will contain the component which represents each todo in our list.

Inside of `TodoCard.jsx` type

```js
import {React} from 'react';

export default function TodoCard({todoEntry, onDone}) {
    return <div className="todoCard">
        <h2>{todoEntry.title}</h2>
        <p>{todoEntry.description}</p>
        <button onClick={onDone}>Mark as done</button>
    </div>
}
```
> What this code is doing is taking in some data inside of todoEntry, specifically the title of the todo and its description, and also a function which will be called when we complete the todo and press the button.

Notice how we set the classname of the div to `"todoCard"`. Now inside of `TodoList.css` we will add some styles for that component.

```css
.todoCard {
    border: black 1px solid;
    padding: 10px;
    border-radius: 15px;
    margin-bottom: 15px;
}
.todoCard > h2, .todoCard > p {
    margin: 5px;
}
```

Finally lets start working on our `TodoList.jsx` file. At the end it will look like this:

```js
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

    function deleteTodo(id) {
        setTodoList((curr) => {curr.filter((ele) => ele.id != id)})
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
```

But lets break this down step by step.

Firstly create the function for the file and write the imports.

```js
import { React, useState } from 'react';
import TodoCard from './TodoCard';
import './TodoList.css'

export default function TodoList() {

}
```

Now lets plan out the return:

```js
return <>
    <div>
        <h2>Create new Todo:</h2>
        <input placeholder='title' />
        <input placeholder='description' />
        <button>Create</button>
    </div>
    </>
```

Now lets add our states and some helper functions:

We will be making a function createTodo that will take the values in our states newTitle and newDesc and idCount and add them to our todoList.

We will also make a function deleteTodo, which will take an id and remove that element from the todoList.

The states we're creating are:
- todoList
    - this state stores our list of todos
- idCount
    - this state stores the id of the next todo
- newTitle
    - this state stores the value in our title input box
- newDesc
    - this state stores the value in our description input box

```js
// ...
// export default function TodoList() {
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
// ...
```

Now lets work on our return statement again:
```js
return <>
    <div>
        <h2>Create new Todo:</h2>
        <input placeholder='title' value={newTitle} onChange={(event) => {setNewTitle(event.target.value)}}/>
        <input placeholder='description' value={newDesc} onChange={(event) => {setNewDesc(event.target.value)}}/>
        <button onClick={createTodo}>Create</button>
    </div>
    {todoList && todoList.map((element) => <TodoCard key={element.id} todoEntry={element} onDone={() => {deleteTodo(element.id)}} />)}
    </>
```

Now in `App.jsx`

Import `<TodoList>` and use it in the return like this:

```js
import './App.css'
import TodoList from './TodoList'
import {React} from 'react';

function App() {
  return (
    <>
      <TodoList /> 
    </>
  )
}

export default App
```

Now if your frontend server isn't already running type

```shell
npm run dev
```

and now you should now be able to access your todo app on [http://localhost:5173/](http://localhost:5173) 

## Adding backend

To add a backend, go to the folder outside of frontend, i.e. from inside frontend run

```shell
cd ..
```

then run

```shell
mkdir backend
cd backend
npm init
```

most of the questions can just be ignored by pressing enter without typing anything, but when it asks `entry point: (index.js)` type `app.js` and press enter.

Now run the following command

```shell
npm install express cors nodemon
```

next go to `package.json` and inside of scripts add:

```js
"scripts": {
    "dev": "nodemon src/app.js",
    "start": "node src/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

These are the commands to run our server. nodemon allows our server to reload whenever we make a change, which is useful for developing.

Now go into src/app.js and add the following

```js
const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())
app.use(express.json())
const port=3000;
```

This code allows our server to answer the calls from our frontend. CORS or Cross origin resource sharing, is required since our frontend is on the url localhost:5173 but our backend will be on localhost:3000

Now lets do some sanity testing, add the following:

```js

app.get('/', (req, res) => {
    res.send("Hello, World!");
})

app.listen(port, () => {
    console.log(`TodoList app listening on port ${port}`)
  })
```

then in /backend run:

```shell
npm run dev
```

and go to [http://localhost:3000/](http://localhost:3000/) and you should see the text 'Hello, World!'

Next: Lets think about what we need from our backend:
- A way to get all the todos that exist
- A way to add a todo
- A way to delete a todo

So lets add these starter bits of code:

```js
let todos = []

let idCounter = 1;

app.get('/todos/list/', (req, res) => {
    res.send('list of todos');
})
app.post('/todos/create/', (req, res) => {
    res.sendStatus(200);
})
app.delete('/todos/create/', (req, res) => {
    res.sendStatus(200);
})
```

Now lets work on our list. I'm assuming we will store todos like this:

```js
{
    id: int,
    title: string,
    description: string,
}
```

so lets turn our listing route into

```js
app.get('/todos/list/', (req, res) => {
    res.json({todos: todos})
})
```

and lets work on creating a todo

```js
app.post('/todos/create/', (req, res) => {
    todos.push({id: idCounter++, title: req.body.title, description: req.body.description})
    res.sendStatus(200);
})
```

What this function is doing, is getting the title and description of the new todo from the request, accessing it via req.body.VAR (we will understand this better when we integrate this with the frontend)

and for deleting lets do

```js
app.delete('/todos/delete/', (req, res) => {
    todos = todos.filter((elem) => elem.id != req.body.id);
    res.sendStatus(200);
})
```

If we left our server running it should still be running and have reloaded with no errors.

### Swapping the frontend from frontend only to with backend

Change out the start of our TodoList function to:

```js
// export default function TodoList() {
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
    // return <>
// ...
```

Now it should all be working.