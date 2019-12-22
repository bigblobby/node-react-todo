import React from 'react';
import axios from 'axios';

export default class TodoEdit extends React.Component {
    constructor() {
        super();

        this.state = {
            todoTitle: '',
            todoPriority: null,
            todoCompleted: null,
            loading: true,
            serverMessage: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.toggleCompleted = this.toggleCompleted.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
    }

    componentDidMount(){
        axios.get('/api/todo/' + this.props.match.params.id)
            .then(result => {
                this.setState({
                    todoTitle: result.data.title,
                    todoPriority: result.data.priority,
                    todoCompleted: result.data.completed,
                    loading: false
                });
            })
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

    updateTodo(e){
        e.preventDefault();

        axios.put('/api/todo/' + this.props.match.params.id, [
            {"property": "title", "value": this.state.todoTitle},
            {"property": "priority", "value": this.state.todoPriority},
            {"property": "completed", "value": this.state.todoCompleted},
        ]).then(result => {
            if(result.data.message) this.setState({
                serverMessage: result.data.message
            })
        });
    }

    render(){
        if(!this.state.loading){
            return (
                <div>
                    <form onSubmit={this.updateTodo}>
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
            )
        } else {
            return null;
        }
    }
}
