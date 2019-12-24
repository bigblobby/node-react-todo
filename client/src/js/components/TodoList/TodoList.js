import React from 'react';
import queryString from 'query-string';
import Pagination from "../Pagination/index";
import {Link} from "react-router-dom";
import { getDataAtUrl } from "../../api";

export default class App extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            page: queryString.parse(this.props.location.search).page || 1,
            limit: queryString.parse(this.props.location.search).limit || 10,
            total: null,
            totalOnPage: null,
            totalPages: 1,
            order: queryString.parse(this.props.location.search).order || 'new',
        };

        this.getTodos = this.getTodos.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.setPage = this.setPage.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount(){
        this.getTodos();
    }

    getTodos(){
        let qs = queryString.stringify({
            page: this.state.page,
            limit: this.state.limit,
            order: this.state.order
        });

        getDataAtUrl('/api/todo?' + qs, false)
            .then(result => {
                this.setState({
                    todos: result.data.items,
                    page: result.data.page,
                    limit: result.data.limit,
                    total: result.data.total,
                    totalOnPage: result.data.totalOnPage,
                    totalPages: result.data.totalPages
                });
            });
    }

    handleSelect(e, stateName){
        this.setState({
            [stateName]: e.target.value
        }, this.getTodos)
    }

    changePage(pageNumber){
        this.setState({
            page: pageNumber
        }, this.getTodos);
    }

    setPage(page){
        let qs = queryString.stringify({
            page: page,
            limit: this.state.limit,
            order: this.state.order
        });

        return '/todo?' + qs;
    }

    render(){
        if(this.state.total) {
            return (
                <div className="App">
                    <div>
                        <Link to={ '/todo/create' }>Create todo</Link>
                    </div>
                    <label htmlFor="per-page-dropdown">Per Page:</label>
                    <select id="per-page-dropdown" value={ this.state.limit }
                            onChange={ (e) => this.handleSelect(e, 'limit') }>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                    <label htmlFor="order-dropdown">Sort by:</label>
                    <select id="order-dropdown" value={ this.state.order }
                            onChange={ (e) => this.handleSelect(e, 'order') }>
                        <option value="ph">Priority High</option>
                        <option value="pl">Priority Low</option>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                        <option value="new">Newest</option>
                        <option value="old">Oldest</option>
                    </select>
                    {
                        this.state.todos.length > 0 && this.state.todos.map((todo, i) => {
                            return (
                                <div key={ i }>
                                    { todo.id }: { todo.title } - { todo.priority } - { todo.completed ? 'Complete' : 'Incomplete' }
                                    <Link to={ '/todo/' + todo.id }>Edit</Link>
                                </div>
                            );
                        })
                    }
                    <Pagination
                        page={ this.state.page }
                        totalPages={ this.state.totalPages }
                        setPage={ this.setPage }
                        changePage={ this.changePage }
                        showFirst
                        showLast
                    />
                </div>
            );
        } else {
            return null;
        }
    }
}
