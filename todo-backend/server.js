const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const knexConfig = require('./knexfile')
const knex = require('knex')(knexConfig)
const bookshelf = require('bookshelf')(knex)
const Todo = bookshelf.Model.extend({ tableName: 'todos' })
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// retrieves all the todos' from database
app.get('/todos', (req, res) => {
    const _todos = []
    Todo
        .fetchAll()
        .then(todos => {
            todos.models.map(todo => _todos.push(todo.attributes))
            res.json(_todos)
        })
})

//--- creates a new todo in the database
app.post('/todos', (req, res) => {
    const {task, done} = req.body
    const newTodo = new Todo({
        task,
        done
    })
    newTodo
        .save()
        .then(todo => res.json(todo))
})

// update an existing row in the database
app.post('/todos/update', (req, res) => {
    const {id, task, done} = req.body.task
    const attributesToUpdate = {
        task: task,
        done: done
    }
    console.log(id)
    new Todo({id: id})
        .save(attributesToUpdate)
})

// delete exisiting todo from database that is equal to true
app.post('/todos/delete', (req, res) => {
    const _todos = []
    Todo
        .where({done: true})
        .destroy()
        .then(self => {
            Todo.fetchAll()
            .then(todos=>{
                todos.models.map(todo => _todos.push(todo.attributes))
                res.json(_todos)
        })
        })
})


//-- port configuration
app.listen(8080,()=>{console.log('listening on port 8080')})

