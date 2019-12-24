import React from 'react';
import { Link } from "react-router-dom";
import { range } from "../../utils/helpers";
import { getFirstPage, getLastPage } from "./helpers";

/**
 * Available options:
 * 1. page - The current page (REQUIRED)
 * 2. totalPages - The total number of pages (REQUIRED)
 * 3. setPage - A function used to set the url for each button (REQUIRED)
 * 4. changePage - A function thats executed when a button is clicked (when changing page) (REQUIRED)
 * 5. pageRangeDisplayed - This is the number of page numbers you want to display. e.g. If you're on page 4 and have passed in '2' the pages displayed will be 2,3,4,5,6 (2 on either side). USAGE: pageRangeDisplayed={2}
 * 6. showFirst - Will show the 'first' button in the pagination
 * 7. showLast - Will show the 'last' button in the pagination
 * 8. showPageNumbers - Will show the page numbers in the pagination
 */
export default class Pagination extends React.Component {
    static defaultProps = {
        page: 1,
        totalPages: 1,
        setPage: () => {},
        changePage: () => {},
        pageRangeDisplayed: 1,
        showFirst: false,
        showLast: false,
        showPageNumbers: true
    };

    constructor() {
        super();

        this.renderPaginationNumbers = this.renderPaginationNumbers.bind(this);
    }

    renderPaginationNumbers(pageRangeDisplayed, totalPages, page){
        let first = getFirstPage(pageRangeDisplayed, totalPages, page);
        let last = getLastPage(pageRangeDisplayed, totalPages, page);

        return range(first, last).map(page => {
            return (
                <Link
                    className={"page-num " + (this.props.page == page ? 'active' : '')}
                    key={page}
                    onClick={() => this.props.changePage(page)}
                    to={() => this.props.setPage(page)}
                >{page}</Link>
            );
        });
    }

    render(){
        const {page, totalPages, pageRangeDisplayed, showFirst, showLast, showPageNumbers, changePage, setPage} = this.props;

        return (
            <div className="pagination">
                {
                    page && page > 1 && showFirst ? (
                        <Link
                            className="page-first"
                            onClick={() => changePage(1)}
                            to={() => setPage(1)}
                        >First</Link>
                    ) : null
                }
                {
                    page > 1 ? (
                        <Link
                            className="page-prev"
                            onClick={() => changePage(page - 1)}
                            to={() => setPage(page - 1)}
                        >Prev</Link>
                    ) : null
                }
                {
                    page && showPageNumbers && this.renderPaginationNumbers(pageRangeDisplayed, totalPages, page)
                }
                {
                    page < totalPages ? (
                        <Link
                            className="page-next"
                            onClick={() => changePage(page + 1)}
                            to={() => setPage(page + 1)}
                        >Next</Link>
                    ) : null
                }
                {
                    page && page < totalPages && showLast ? (
                        <Link
                            className="page-last"
                            onClick={() => changePage(totalPages)}
                            to={() => setPage(totalPages)}
                        >Last</Link>
                    ) : null
                }
            </div>
        )
    }
}
