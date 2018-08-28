import React, {Component} from 'react'
import TodoItem from './TodoItem'

class TodoList extends Component {
    render(){
        const todos = this.props.todos.map((todo, i) => 
            <TodoItem
                text={todo.task}
                done={todo.done}
                isDone={this.props.isDone}
                id={i}
                key={i}
            />
        )
        return(
            <ul className='list-group'>
                {todos}
            </ul>
        )
    }
}

export default TodoList