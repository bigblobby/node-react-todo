import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import App from "./App";
import TodoEdit from "./TodoEdit";
import TodoCreate from "./TodoCreate";

export default class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div id="content">
                    <Switch>
                        <Route exact path="/todo" component={App}/>
                        <Route path="/todo/create" component={TodoCreate}/>
                        <Route path="/todo/:id" component={TodoEdit}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
