import React from 'react';
import queryString from 'querystring';
import Pagination from "./Pagination";

export default class App extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            page: queryString.parse(this.props.location.search.split('?')[1]).page || 1
        };
    }

    componentDidUpdate(prevProps, prevState){
        let pageNo = queryString.parse(this.props.location.search.split('?')[1]).page;

        if(prevState.page !== pageNo){
            this.setState({page: pageNo});
        }
    }

    render(){
        if(this.state.page){
            return (
                <div className="App">
                    <Pagination
                        apiUrl={'/api/todo?page=' + this.state.page}
                        url={'/todo?'}
                        activePage={this.state.page}
                        showFirst
                        showLast
                    >
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
}
