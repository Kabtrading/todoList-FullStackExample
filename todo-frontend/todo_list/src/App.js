import React, { Component } from 'react'
import axios from 'axios'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import './App.css';


class App extends Component {
  state = {
    todos: [],
    filter: 'all'
  }

  addTodo = (text) => {
    if (text){
      axios.post('http://localhost:8080/todos', {
        task: text,
        done: false
      })
      .then((res)=>{
          this.setState({
          todos: this.state.todos.concat(res.data)
          })
      })
      .catch((err)=>{
        console.log(err)
      })
  }}

  isDone = (id) => {
   axios.post('http://localhost:8080/todos/update', {
    task: this.state.todos[id]
   })
    const newTodos = [...this.state.todos]
    newTodos[id].done = !newTodos[id].done
    this.setState({
      todos: newTodos
    })
  }

  filterTodos = (val) => {
    this.setState({
      filter: val
    })
  }

  clearComplete = () => {
    axios.post('http://localhost:8080/todos/delete').then((res) => {
      console.log(res)
      this.setState({
        todos: res.data
      })
    })
  }

  componentDidMount() {
    axios.get('http://localhost:8080/todos')
    .then((res)=>{
      this.setState({
        todos: res.data
      })
    })
  }

  render() {
    const todos = this.state.todos.filter((todo)=>{
      if(this.state.filter === 'all') return true
      if(this.state.filter === 'active') return !todo.done
      else return todo.done
    })
    const {filter} = this.state

    return (
      <div className="App">
        <div className="container">
            <h1 className="text-center">Task Manager</h1>
            <AddTodo addTodo={this.addTodo} />
            <TodoList todos={todos}
                      isDone={this.isDone}
                  />
            <div className='text-center'>
                <select onChange={(e) => this.filterTodos(e.target.value)}>
                  <option value="all" selected={filter === 'all'}>all</option>
                  <option value="active" selected={filter === 'active'}>active</option>
                  <option value="complete" selected={filter === 'complete'}>complete</option>
                </select>
               <button className="clearButton btn-md btn-success" onClick={this.clearComplete}>Delete Completed Items</button>
            </div>
        </div>
      </div>
    )
  }
}

export default App;
