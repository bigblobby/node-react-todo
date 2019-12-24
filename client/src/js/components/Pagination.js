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

        this.renderPaginationNumbers = this.renderPaginationNumbers.bind(this);
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

        let first = getFirstPage.call(this, this.props.totalPages, this.props.page);
        let last = getLastPage.call(this, this.props.totalPages, this.props.page);

        return range(first, last).map(page => {
            console.log(page);
            return <Link className={"page-num " + (this.props.page == page ? 'active' : '')} key={page} onClick={() => this.props.changePage(page)} to={() => this.props.setPage(page)}>{page}</Link>
        });
    }

    render(){
        return (
            <div className="pagination">
                {
                    this.props.page && this.props.page > 1 && this.props.showFirst ? (
                        <Link className="page-first" onClick={() => this.props.changePage(1)} to={() => this.props.setPage(1)}>First</Link>
                    ) : null
                }
                {
                    this.props.page > 1 ? (
                        <Link className="page-prev" onClick={() => this.props.changePage(this.props.page - 1)} to={() => this.props.setPage(this.props.page - 1)}>Prev</Link>
                    ) : null
                }
                {
                    this.props.page && this.props.showPageNumbers && this.renderPaginationNumbers()
                }
                {
                    this.props.page < this.props.totalPages ? (
                        <Link className="page-next" onClick={() => this.props.changePage(this.props.page + 1)} to={() => this.props.setPage(this.props.page + 1)}>Next</Link>
                    ) : null
                }
                {
                    this.props.page && this.props.page < this.props.totalPages && this.props.showLast ? (
                        <Link className="page-last" onClick={() => this.props.changePage(this.props.totalPages)} to={() => this.props.setPage(this.props.totalPages)}>Last</Link>
                    ) : null
                }
            </div>
        )
    }
}
