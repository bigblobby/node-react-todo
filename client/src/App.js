import React, {Fragment} from 'react';
import {NavLink, Link} from "react-router-dom";
import axios from 'axios';
import Pagination from "./Pagination";

export default class App extends React.Component{

    constructor() {
        super();

        this.state = {};

    }

    render(){
        return (
            <div className="App">
                <Pagination apiUrl={'/api/todo?page=' + this.props.match.params.page} url={'/todo/'}>
                    {(todos) => {
                        return todos.length > 0 && todos.map((todo, i) => {
                            return <div key={i}>{todo.id}: {todo.title} - {todo.priority}</div>;
                        })
                    }}
                </Pagination>
            </div>
        );
    }
}
