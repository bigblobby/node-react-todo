import React from 'react';
import {BrowserRouter, NavLink, Route, Switch} from 'react-router-dom';
import App from "./App";

export default class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div id="content">
                    <Switch>
                        <Route path="/todo/:page" component={App}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
