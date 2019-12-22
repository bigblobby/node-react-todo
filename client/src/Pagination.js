import React, { Fragment } from 'react';
import {NavLink, Link} from "react-router-dom";
import axios from "axios";

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            limit: null,
            page: null,
            total: null,
            totalOnPage: null,
            totalPages: null
        };

        this.getItems = this.getItems.bind(this);
        this.changePage = this.changePage.bind(this);
        this.renderPaginationNumbers = this.renderPaginationNumbers.bind(this);
    }

    componentDidMount(){
        this.getItems();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.apiUrl !== this.props.apiUrl){
            this.getItems();
        }
    }

    getItems(){
        axios.get(this.props.apiUrl)
            .then(result => {
                this.setState({
                    items: result.data.items,
                    limit: result.data.limit,
                    page: result.data.page,
                    total: result.data.total,
                    totalOnPage: result.data.totalOnPage,
                    totalPages: result.data.totalPages
                })
            })
    }
    changePage(page){
        return this.props.url + page;
    }

    renderPaginationNumbers(current){
        if(current === 1){
            return (
                <Fragment>
                    <NavLink to={() => this.changePage(current)}>{current}</NavLink>
                    <NavLink to={() => this.changePage(current + 1)}>{current + 1}</NavLink>
                    <NavLink to={() => this.changePage(current + 2)}>{current + 2}</NavLink>
                </Fragment>
            )
        } else if(current === this.state.totalPages){
            return (
                <Fragment>
                    <NavLink to={() => this.changePage(current - 2)}>{current - 2}</NavLink>
                    <NavLink to={() => this.changePage(current - 1)}>{current - 1}</NavLink>
                    <NavLink to={() => this.changePage(current)}>{current}</NavLink>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <NavLink to={() => this.changePage(current - 1)}>{current - 1}</NavLink>
                    <NavLink to={() => this.changePage(current)}>{current}</NavLink>
                    <NavLink to={() => this.changePage(current + 1)}>{current + 1}</NavLink>
                </Fragment>
            )
        }
    }

    render(){
        return (
            <Fragment>
                <div className="items">
                    {this.props.children(this.state.items)}
                </div>
                <div className="pagination">
                    {
                        this.state.page > 1 ? (
                            <Link to={() => this.changePage(this.state.page - 1)}>Prev</Link>
                        ) : null
                    }
                    {
                        this.state.page && this.renderPaginationNumbers(this.state.page)
                    }
                    {
                        this.state.page < this.state.totalPages ? (
                            <Link to={() => this.changePage(this.state.page + 1)}>Next</Link>
                        ) : null
                    }
                </div>
            </Fragment>
        )
    }
}
