import React from 'react';
import queryString from 'query-string';
import Pagination from "../components/Pagination/Pagination";
import {Link} from "react-router-dom";
import { deleteTodo, getDataAtUrl } from "../api";
import TodoList from "../components/TodoList/TodoList";

export default class TodoListPage extends React.Component{

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
            modalId: null,
        };

        this.getTodos = this.getTodos.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleYes = this.handleYes.bind(this);
        this.handleNo = this.handleNo.bind(this);
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

        getDataAtUrl('/api/todo?' + qs, true)
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

    handleModal(id){
        this.setState({
            modalId: id
        });
    }

    handleYes(id){
        deleteTodo(id).then(() => {
            this.setState({
                modalId: null
            }, this.getTodos)
        });
    }

    handleNo(){
        this.setState({
            modalId: null
        })
    }

    handleSelect(e, stateName){
        this.setState({
            [stateName]: e.target.value
        }, this.getTodos)
    }

    changePage(pageNumber){
        if(pageNumber !== this.state.page){
            this.setState({
                page: pageNumber
            }, this.getTodos);
        }
    }

    // This isnt required, its used to sync up the url with the data
    setPage(page){
        let qs = queryString.stringify({
            page: page,
            limit: this.state.limit,
            order: this.state.order
        });

        return '/todo?' + qs;
    }

    render(){
        const {limit, order, todos, page, totalPages, modalId} = this.state;
        const TodoListProps = {
            todos: todos,
            limit: limit,
            order: order,
            handleSelect: this.handleSelect,
            handleModal: this.handleModal,
            handleYes: this.handleYes,
            handleNo: this.handleNo,
            modalId: modalId
        };

        if(todos.length) {
            return (
                <div className="todo-listing-page">
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
