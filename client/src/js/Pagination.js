import React, { Fragment } from 'react';
import {NavLink, Link} from "react-router-dom";
import axios from "axios";
import queryString from 'query-string';
import { range } from "./helpers";

export default class Pagination extends React.Component {
    static defaultProps = {
        pageOffset: 1
    };

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
        const url = this.props.url.split('?')[0];
        const qs = this.props.url.split('?')[1];
        const parsedString = queryString.parse(qs);
        parsedString.page = page;

        const newqs = queryString.stringify(parsedString);

        return url + '?' + newqs;
    }

    renderPaginationNumbers(){
        function getFirstPage(totalPages, page){
            const offset = page === totalPages ? this.props.pageOffset + 1 : this.props.pageOffset;
            return Math.max(1, page - offset)
        }

        function getLastPage(totalPages, page){
            const offset = page === 1 ? this.props.pageOffset + 1 : this.props.pageOffset;
            return Math.min(totalPages, page + offset);
        }

        let first = getFirstPage.call(this, this.state.totalPages, this.state.page);
        let last = getLastPage.call(this, this.state.totalPages, this.state.page);

        return range(first, last).map(page => {
            return <Link className={"page-num " + (this.state.page == page ? 'active' : '')} key={page} to={() => this.changePage(page)}>{page}</Link>
        });
    }

    render(){
        return (
            <Fragment>
                <div className="items">
                    {this.props.children(this.state.items)}
                </div>
                <div className="pagination">
                    {
                        this.state.page && this.state.page > 1 && this.props.showFirst ? (
                            <Link className="page-first" to={() => this.changePage(1)}>First</Link>
                        ) : null
                    }
                    {
                        this.state.page > 1 ? (
                            <Link className="page-prev" to={() => this.changePage(this.state.page - 1)}>Prev</Link>
                        ) : null
                    }
                    {
                        this.state.page && this.props.showPageNumbers && this.renderPaginationNumbers()
                    }
                    {
                        this.state.page < this.state.totalPages ? (
                            <Link className="page-next" to={() => this.changePage(this.state.page + 1)}>Next</Link>
                        ) : null
                    }
                    {
                        this.state.page && this.state.page < this.state.totalPages && this.props.showLast ? (
                            <Link className="page-last" to={() => this.changePage(this.state.totalPages)}>Last</Link>
                        ) : null
                    }
                </div>
            </Fragment>
        )
    }
}
