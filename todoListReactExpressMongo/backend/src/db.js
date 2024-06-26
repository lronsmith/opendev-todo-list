const { MongoClient, ServerApiVersion } = require('mongodb');
var ObjectId = require('mongodb').ObjectId; 
let dotenv = require('dotenv').config();

console.log(process.env.DB_URI);


async function getTodos() {
    const client = new MongoClient(process.env.DB_URI);
    const todoList = [];
    try {
        const database = client.db("Todos");
        const todos = database.collection("Todos");

        const query = {}

        const options = {
            sort: { id: 1 },
          };
        
        const cursor = todos.find(query, options);

        for await (const doc of cursor) {
            todoList.push(doc);
        }
    } finally {
        await client.close();
        return todoList;
    }
}

async function addTodo(title, description) {
    const client = new MongoClient(process.env.DB_URI);
    try {
        // Connect to the "insertDB" database and access its "haiku" collection
        const database = client.db("Todos");
        const todos = database.collection("Todos");
        
        // Create a document to insert
        const doc = {
            title: title,
            description: description,
        }
        // Insert the defined document into the "haiku" collection
        const result = await todos.insertOne(doc);
        // Print the ID of the inserted document
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        // Close the MongoDB client connection
        await client.close();
    }
}

async function deleteTodo(id) {
    const client = new MongoClient(process.env.DB_URI);
  try {
    const database = client.db("Todos");
    const todos = database.collection("Todos");

    /* Delete the first document in the "movies" collection that matches
    the specified query document */
    const query = { _id: new ObjectId(id) };
    const result = await todos.deleteOne(query);

    /* Print a message that indicates whether the operation deleted a
    document */
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } finally {
    // Close the connection after the operation completes
    await client.close();
  }
}

module.exports = {getTodos, addTodo, deleteTodo}