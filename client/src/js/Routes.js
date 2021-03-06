import React from 'react';
import thunk from 'redux-thunk';
import { Router, Route, Switch } from 'react-router-dom';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router'
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
import ContactUsPage from "./pages/ContactUsPage";

import rootReducer from "./reducers";
import history from "./history";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from 'react-redux';
import ApplicationForm from "./pages/ApplicationForm";

const middleware = [
    thunk,
    routerMiddleware(history)
];

const store = createStore(
    rootReducer(history),
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ),
);

export default class Routes extends React.Component {
    render() {
        return (
            <Provider store={ store }>
                <ConnectedRouter history={history}>
                    <div id="content">
                        <Switch>
                            <Route exact path="/" render={ (props) => <HomePage { ...props } /> }/>
                            <Route exact path="/admin" component={ AdminPage }/>
                            <Route exact path="/register" component={ RegisterPage }/>
                            <Route exact path="/login" component={ LoginPage }/>
                            <Route exact path="/account" component={ AccountPage }/>
                            <Route exact path="/todo" component={ TodoListPage }/>
                            <Route exact path="/contact-us" component={ ContactUsPage }/>
                            <Route exact path="/application-form" component={ ApplicationForm }/>
                            <Route path="/todo/create" component={ TodoCreate }/>
                            <Route path="/todo/:id" component={ TodoEdit }/>
                            <Route path="/article" component={ ArticleListPage }/>
                            <Route path="/product" component={ ProductListPage }/>
                        </Switch>
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}
