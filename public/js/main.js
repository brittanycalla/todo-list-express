const deleteBtn = document.querySelectorAll('.fa-trash') // create a variable and assign it to all elements with a class of the trash can
const item = document.querySelectorAll('.item span') // create a variable and assign it to all span tags inside of a parent that has a class of 'item'
const itemCompleted = document.querySelectorAll('.item span.completed') // creating a variable and assinging it to create a variable and assign it to all span tags with a class of 'completed' inside of a parent with a class of 'item'

Array.from(deleteBtn).forEach((element)=>{ // create an array from selection and start a loop
    element.addEventListener('click', deleteItem) // add event listener to the current item that waits for a click and then calls a function called deleteItem
}) // close loop

Array.from(item).forEach((element)=>{ // create an array from selection and start a loop
    element.addEventListener('click', markComplete) // add event listener to the current item that waits for a click and then calls a function called markComplete
}) // close loop

Array.from(itemCompleted).forEach((element)=>{ // create an array from selection and start a loop
    element.addEventListener('click', markUnComplete) // add event listener to only completed items
}) // close loop

async function deleteItem(){ // declare asynchronous function
    const itemText = this.parentNode.childNodes[1].innerText // look inside list item and grab only the inner text within the list span
    try{ // start try block
        const response = await fetch('deleteItem', { // create response variable that waits on a fetch to get data from the result of the deleteItems route
            method: 'delete', // set CRUD method for the route
            headers: {'Content-Type': 'application/json'}, // specify the type of cotent expevted (JSON)
            body: JSON.stringify({ // declare the message content being passed and stringify that content
              'itemFromJS': itemText // set the content of the body to the inner text of the list item and name it 'itemFromJS'
            }) // close body
          }) // close object
        const data = await response.json() // wait on JSON from the response to be converted
        console.log(data) // log result in console
        location.reload() // refresh the page to update the content displayed

    }catch(err){ // if error occurs, pass the error into the catch block
        console.log(err) // log error in console
    } // close catch block
} // close function

async function markComplete(){ // declare asynchronous function
    const itemText = this.parentNode.childNodes[1].innerText // look inside list item and grabs only the inner text within the list span
    try{ // start try block
        const response = await fetch('markComplete', { // declare response variable that waits on a fetch to get data from the result of the markComplete route
            method: 'put', // set CRUD method for the route
            headers: {'Content-Type': 'application/json'}, // specify the type of cotent expevted (JSON)
            body: JSON.stringify({ // declare the message content being passed and stringify that content
                'itemFromJS': itemText // set the content of the body to the inner text of the list item and name it 'itemFromJS'
            }) // close body
          }) // close object
        const data = await response.json() // wait on JSON from the response to be converted
        console.log(data) // log result in console
        location.reload() // refresh the page to update the content displayed

    }catch(err){ // if error occurs, pass the error into the catch block
        console.log(err) // log error in console
    } // close catch block
} // close function

async function markUnComplete(){ // declare asynchronous function
    const itemText = this.parentNode.childNodes[1].innerText // look inside list item and grabs only the inner text within the list span
    try{ // start try block
        const response = await fetch('markUnComplete', { // declare response variable that waits on a fetch to get data from the result of the markUncomplete route
            method: 'put', // set CRUD method for the route
            headers: {'Content-Type': 'application/json'}, // specify the type of cotent expevted (JSON)
            body: JSON.stringify({ // declare the message content being passed and stringify that content
                'itemFromJS': itemText // set the content of the body to the inner text of the list item and name it 'itemFromJS'
            }) // close body
          }) // close object
        const data = await response.json() // wait on JSON from the response to be converted
        console.log(data) // log result in console
        location.reload() // refresh the page to update the content displayed

    }catch(err){ // if error occurs, pass the error into the catch block
        console.log(err) // log error in console
    } // close catch block
} // close function