import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TodoList from "./components/TodoList/TodoList";
import TodoEdit from "./components/TodoEdit";
import TodoCreate from "./components/TodoCreate";

export default class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div id="content">
                    <Switch>
                        <Route exact path="/todo" component={TodoList}/>
                        <Route path="/todo/create" component={TodoCreate}/>
                        <Route path="/todo/:id" component={TodoEdit}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
