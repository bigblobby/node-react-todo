import React from 'react';
import queryString from 'query-string';
import Pagination from "./Pagination";
import {Link} from "react-router-dom";

export default class App extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            page: queryString.parse(this.props.location.search).page || 1,
            limit: queryString.parse(this.props.location.search).limit || 10
        };

        this.changeAmount = this.changeAmount.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        let pageNo = queryString.parse(this.props.location.search).page || 1;

        if(prevState.page !== pageNo){
            this.setState({page: pageNo});
        }
    }

    changeAmount(e){
        this.setState({limit: e.target.value});
    }

    render(){
        if(this.state.page){
            let qs = queryString.stringify({
                page: this.state.page,
                limit: this.state.limit
            });

            return (
                <div className="App">
                    <select value={this.state.limit} onChange={this.changeAmount}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                    <Pagination
                        apiUrl={'/api/todo?' + qs}
                        url={'/todo?' + qs}
                        showFirst
                        showLast
                        showPageNumbers
                    >
                        {(todos) => {
                            return todos.length > 0 && todos.map((todo, i) => {
                                return (
                                    <div key={i}>
                                        {todo.id}: {todo.title} - {todo.priority}
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
