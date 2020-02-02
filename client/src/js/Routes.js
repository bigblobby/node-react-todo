import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TodoListPage from "./pages/TodoListPage";
import TodoEdit from "./components/TodoEdit";
import TodoCreate from "./components/TodoCreate";
import ArticleListPage from "./pages/ArticleListPage";
import ProductListPage from "./pages/ProductListPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

export default class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div id="content">
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/register" component={RegisterPage}/>
                        <Route exact path="/login" component={LoginPage}/>
                        <Route exact path="/todo" component={TodoListPage}/>
                        <Route path="/todo/create" component={TodoCreate}/>
                        <Route path="/todo/:id" component={TodoEdit}/>
                        <Route path="/article" component={ArticleListPage}/>
                        <Route path="/product" component={ProductListPage}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
