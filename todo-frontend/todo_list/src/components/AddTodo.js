import React, {Component} from 'react'

class AddTodo extends Component {
    state = {
        value: ''
    }

    render(){
        return(
            <div>
                <form onSubmit={(e)=>{e.preventDefault()
                                    this.props.addTodo(e.target.todoText.value)}}>
                <div className="input-group">
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="submit">Add</button>
                    </span>
                    <input className="form-control" placeholder="enter task here" name='todoText' />
                </div>
            </form>
            </div>
        )
    }
}

export default AddTodo