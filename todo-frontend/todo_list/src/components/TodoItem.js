import React, {Component} from 'react'

class TodoItem extends Component {
    render(){
        const {text, done, id } = this.props
        return(
            <div>
                <li className="list-group-item">
                    <input type="checkbox" checked={done} onChange={() => this.props.isDone(id)} />
                    <label className='taskText'style={{
                    textDecoration: done ? 'line-through' : 'none'
                    }}>{text}</label>
                </li>
            </div>
        )
    }
}

export default TodoItem