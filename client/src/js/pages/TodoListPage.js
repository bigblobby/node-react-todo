import React from 'react';
import queryString from 'query-string';
import Pagination from "../components/Pagination/Pagination";
import {Link} from "react-router-dom";
import { getDataAtUrl } from "../api";
import TodoList from "../components/TodoList/TodoList";

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
        const {total, limit, order, todos, page, totalPages} = this.state;
        const TodoListProps = {
            todos: todos,
            limit: limit,
            order: order,
            handleSelect: this.handleSelect
        };

        if(total) {
            return (
                <div className="App">
                    <div>
                        <Link to={ '/todo/create' }>Create todo</Link>
                    </div>
                    <TodoList {...TodoListProps}/>
                    <Pagination
                        page={ page }
                        totalPages={ totalPages }
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
