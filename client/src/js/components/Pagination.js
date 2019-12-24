import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import queryString from 'query-string';
import { range } from "../utils/helpers";
import { getDataAtUrl } from "../api";

/**
 * Available options:
 * 1. apiUrl - This is your api endpoint, you must pass in the page number as a query string. e.g '/api/articles?page=3' USAGE: apiUrl={'/api/articles?page=3'}
 * 2. pageRangeDisplayed - This is the number of page numbers you want to display. e.g. If you're on page 4 and have passed in '2' the pages displayed will be 2,3,4,5,6 (2 on either side). USAGE: pageRangeDisplayed={2}
 * 3. cacheResults - Will cache the result from each api call
 * 4. showFirst - Will show the 'first' button in the pagination
 * 5. showLast - Will show the 'last' button in the pagination
 * 6. showPageNumbers - Will show the page numbers in the pagination
 */
export default class Pagination extends React.Component {
    static defaultProps = {
        pageRangeDisplayed: 1,
        cacheResults: false,
        showFirst: false,
        showLast: false,
        showPageNumbers: true
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
        getDataAtUrl(this.props.apiUrl, this.props.cacheResults)
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
        const stripedUrl = this.props.apiUrl.slice(4);

        const url = stripedUrl.split('?')[0];
        const qs = stripedUrl.split('?')[1];
        const parsedString = queryString.parse(qs);
        parsedString.page = page;

        const newqs = queryString.stringify(parsedString);

        return url + '?' + newqs;
    }

    renderPaginationNumbers(){
        function getFirstPage(totalPages, page){
            const offset = page === totalPages ? this.props.pageRangeDisplayed + 1 : this.props.pageRangeDisplayed;
            return Math.max(1, page - offset)
        }

        function getLastPage(totalPages, page){
            const offset = page === 1 ? this.props.pageRangeDisplayed + 1 : this.props.pageRangeDisplayed;
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
