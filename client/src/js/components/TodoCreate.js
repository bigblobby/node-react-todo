import React from 'react';
import axios from 'axios';

export default class TodoCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todoTitle: '',
            todoPriority: 1,
            todoCompleted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.toggleCompleted = this.toggleCompleted.bind(this);
        this.createTodo = this.createTodo.bind(this);
    }

    handleChange(e, stateName){
        this.setState({
            [stateName]: e.target.value
        });
    }

    toggleCompleted(){
        this.setState((prevState) => ({
            todoCompleted: !prevState.todoCompleted
        }));
    }

    createTodo(e){
        e.preventDefault();

        axios.post('/api/todo', {
            'title': this.state.todoTitle,
            'priority': this.state.todoPriority,
            'completed': this.state.todoCompleted
        }).then(result => {
            if(result.data.message) this.setState({
                serverMessage: result.data.message
            })
        });
    }

    render(){
        return (
            <div>
                <form onSubmit={this.createTodo}>
                    <input value={this.state.todoTitle} onChange={(e) => this.handleChange(e, 'todoTitle')} type="text"/>
                    <input value={this.state.todoPriority} onChange={(e) => this.handleChange(e, 'todoPriority')} type="number"/>
                    <input defaultChecked={this.state.todoCompleted} onChange={this.toggleCompleted} type="checkbox"/>
                    <button type="submit">Submit</button>
                </form>
                {
                    this.state.serverMessage &&
                    <div>
                        <p>{this.state.serverMessage}</p>
                    </div>
                }
            </div>
        );
    }
}
