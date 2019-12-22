import React from 'react';
import queryString from 'query-string';
import Pagination from "./Pagination";
import {Link} from "react-router-dom";

export default class App extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            page: queryString.parse(this.props.location.search).page || 1,
            limit: queryString.parse(this.props.location.search).limit || 10,
            order: queryString.parse(this.props.location.search).order || 'new',
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        let pageNo = queryString.parse(this.props.location.search).page || 1;

        if(prevState.page !== pageNo){
            this.setState({page: pageNo});
        }
    }

    handleSelect(e, stateName){
        this.setState({
            [stateName]: e.target.value
        })
    }

    render(){
        if(this.state.page){
            let qs = queryString.stringify({
                page: this.state.page,
                limit: this.state.limit,
                order: this.state.order
            });

            return (
                <div className="App">
                    <div>
                        <Link to={'/todo/create'}>Create todo</Link>
                    </div>
                    <label htmlFor="per-page-dropdown">Per Page:</label>
                    <select id="per-page-dropdown" value={this.state.limit} onChange={(e) => this.handleSelect(e, 'limit')}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                    <label htmlFor="order-dropdown">Sort by:</label>
                    <select id="order-dropdown" value={this.state.order} onChange={(e) => this.handleSelect(e, 'order')}>
                        <option value="ph">Priority High</option>
                        <option value="pl">Priority Low</option>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                        <option value="new">Newest</option>
                        <option value="old">Oldest</option>
                    </select>
                    <Pagination
                        apiUrl={'/api/todo?' + qs}
                        url={'/todo?' + qs}
                        pageOffset={1}
                        showFirst
                        showLast
                        showPageNumbers
                    >
                        {(todos) => {
                            return todos.length > 0 && todos.map((todo, i) => {
                                return (
                                    <div key={i}>
                                        {todo.id}: {todo.title} - {todo.priority} - {todo.completed ? 'Complete' : 'Incomplete'}
                                        <Link to={'/todo/' + todo.id}>Edit</Link>
                                    </div>
                                );
                            })
                        }}
                    </Pagination>
                </div>
            );
        } else {
            return null;
        }
    }
}
