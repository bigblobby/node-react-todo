import React from 'react';
import queryString from 'query-string';
import Pagination from "./Pagination";
import {Link} from "react-router-dom";

export default class App extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            page: queryString.parse(this.props.location.search).page || 1
        };
    }

    componentDidUpdate(prevProps, prevState){
        let pageNo = queryString.parse(this.props.location.search).page;

        if(prevState.page !== pageNo){
            this.setState({page: pageNo});
        }
    }

    render(){
        if(this.state.page){
            let qs = queryString.stringify({
                page: this.state.page
            });

            return (
                <div className="App">
                    <Pagination
                        apiUrl={qs ? '/api/todo?' + qs : '/api/todo'}
                        url={'/todo'}
                        showFirst
                        showLast
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
        }
    }
}
