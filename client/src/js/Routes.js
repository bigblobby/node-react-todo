import React from 'react';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TodoListPage from "./pages/TodoListPage";
import TodoEdit from "./components/TodoEdit";
import TodoCreate from "./components/TodoCreate";
import ArticleListPage from "./pages/ArticleListPage";
import ProductListPage from "./pages/ProductListPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";
import AdminPage from "./pages/AdminPage";

import rootReducer from "./reducers";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from 'react-redux';

const middleware = [
    thunk
];

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ),
);

export default class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Provider store={ store }>
                    <div id="content">
                        <Switch>
                            <Route exact path="/" render={ (props) => <HomePage { ...props } /> }/>
                            <Route exact path="/admin" component={ AdminPage }/>
                            <Route exact path="/register" component={ RegisterPage }/>
                            <Route exact path="/login" component={ LoginPage }/>
                            <Route exact path="/account" component={ AccountPage }/>
                            <Route exact path="/todo" component={ TodoListPage }/>
                            <Route path="/todo/create" component={ TodoCreate }/>
                            <Route path="/todo/:id" component={ TodoEdit }/>
                            <Route path="/article" component={ ArticleListPage }/>
                            <Route path="/product" component={ ProductListPage }/>
                        </Switch>
                    </div>
                </Provider>
            </BrowserRouter>
        );
    }
}
