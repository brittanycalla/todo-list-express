const express = require('express') // load express
const app = express() // declare constant for express
const MongoClient = require('mongodb').MongoClient // load module to manipulate, create, connect to a mongo database
const PORT = 2121 // set port to 2121
require('dotenv').config() // load and use .env file


let db, // declare db
    dbConnectionStr = process.env.DB_STRING, // create variable to hold db connection string url
    dbName = 'todo' // create variable db name and assign the name of the database we will be using

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }) // connecting to db and passing option to use new engine and remove warniing
    .then(client => { // wait for connection and proceed if successful, passing in all the client information
        console.log(`Connected to ${dbName} Database`) // log a message confirming db connection
        db = client.db(dbName) // assign db client factory method to variable 
    }) // close .then

// middleware
app.set('view engine', 'ejs') // tell express to use EJS as the template engine
app.use(express.static('public')) // tell express to make this public folder accessible to the public (middleware) 
app.use(express.urlencoded({ extended: true })) // convert form data to JSON
app.use(express.json()) // convert request body to JSON


app.get('/',async (request, response)=>{ // start GET method when the root route is passed in, set up req and res parameters
    const todoItems = await db.collection('todos').find().toArray() // declare constant and await all items from db
    const itemsLeft = await db.collection('todos').countDocuments({completed: false}) // declare constant and await count of items in db that have not been completed
    const itemsDone = await db.collection('todos').countDocuments({completed: true}) // declare constant and await count of items in db that have been completed
    response.render('index.ejs', { items: todoItems, left: itemsLeft, done: itemsDone }) // render ejs files and pass above constants from this file to ejs file
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
}) // end method

app.post('/addTodo', (request, response) => { // start POST method when addTodo route is passed in
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false}) // insert new item into todos collection
    .then(result => { // start then
        console.log('Todo Added') // log confirmation in console
        response.redirect('/') // return back to the root route
    }) // close try block
    .catch(error => console.error(error)) // catch errors
}) // end method

app.put('/markComplete', (request, response) => { // start PUT method when markComplete route is passed in
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{ // look in the db for one item matching the name of them item passed in from the main.js file that was clicked on
        $set: {
            completed: true // set completed status to true
          }
    },{
        sort: {_id: -1}, // sort in descending order
        upsert: false // prevent insertion if item does not already exists
    })
    .then(result => { // start then if update successful
        console.log('Marked Complete') // log confirmation in console
        response.json('Marked Complete') // send response back to the sender
    }) // close then
    .catch(error => console.error(error)) // catch errors
}) // end method

app.put('/markUnComplete', (request, response) => { // start PUT method when markUncomplete route is passed in
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{ // look in the db for one item matching the name of them item passed in from the main.js file that was clicked on
        $set: {
            completed: false // set completed status to false
          }
    },{
        sort: {_id: -1}, // sort in descending order
        upsert: false // prevent insertion if item does not already exists
    })
    .then(result => { // start then if update successful
        console.log('Marked Complete') // log confirmation in console
        response.json('Marked Complete') // send response back to the sender
    }) // close then
    .catch(error => console.error(error)) // catch errors

}) // end method

app.delete('/deleteItem', (request, response) => { // start DELETE method when delete route is passed in
    db.collection('todos').deleteOne({thing: request.body.itemFromJS}) // look in the db for one item matching the name of them item passed in from the main.js file that was clicked on
    .then(result => { // start then if delete successful
        console.log('Todo Deleted') // log confirmation in console
        response.json('Todo Deleted') // send response back to the sender
    }) // close then
    .catch(error => console.error(error)) // catch errors

}) // end method

app.listen(process.env.PORT || PORT, ()=>{ //set up port to listen on, either .env file or PORT constant declared above
    console.log(`Server running on port ${PORT}`) // log the running port in console
}) // end method