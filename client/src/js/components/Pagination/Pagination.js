import React from 'react';
import { Link } from "react-router-dom";
import { range } from "../../utils/helpers";
import { getFirstPage, getLastPage } from "./helpers";

/**
 * Available options:
 * 1. page - The current page (REQUIRED)
 * 2. totalPages - The total number of pages (REQUIRED)
 * 3. changePage - A function thats executed when a button is clicked (when changing page) (REQUIRED)
 * 4. setPage - A function used to set the url for each button, this is used to sync up the url with the current page you are on. (OPTIONAL)
 * 5. pageRangeDisplayed - This is the number of page numbers you want to display. e.g. If you're on page 4 and have passed in '2' the pages displayed will be 2,3,4,5,6 (2 on either side). USAGE: pageRangeDisplayed={2} (OPTIONAL)
 * 6. showFirst - Will show the 'first' button in the pagination (OPTIONAL)
 * 7. showLast - Will show the 'last' button in the pagination (OPTIONAL)
 * 8. showPageNumbers - Will show the page numbers in the pagination (OPTIONAL)
 */
export default class Pagination extends React.Component {
    static defaultProps = {
        page: 1,
        totalPages: 1,
        changePage: () => {},
        setPage: () => {},
        pageRangeDisplayed: 1,
        showFirst: false,
        showPrev: true,
        showNext: true,
        showLast: false,
        showPageNumbers: true,
        firstIcon: 'First',
        prevIcon: 'Prev',
        nextIcon: 'Next',
        lastIcon: 'Last'
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
                    className={"page-num " + (this.props.page === page ? 'active' : '')}
                    key={page}
                    onClick={() => this.props.changePage(page)}
                    to={() => this.props.setPage(page)}
                >{page}</Link>
            );
        });
    }

    render(){
        const {
            page,
            totalPages,
            changePage,
            setPage,
            pageRangeDisplayed,
            showFirst,
            showPrev,
            showNext,
            showLast,
            showPageNumbers,
            firstIcon,
            prevIcon,
            nextIcon,
            lastIcon
        } = this.props;

        return (
            <div className="pagination">
                {
                    page && page > 1 && showFirst ? (
                        <Link
                            className="page-first"
                            onClick={() => changePage(1)}
                            to={() => setPage(1)}
                        >{firstIcon}</Link>
                    ) : null
                }
                {
                    page > 1 && showPrev ? (
                        <Link
                            className="page-prev"
                            onClick={() => changePage(page - 1)}
                            to={() => setPage(page - 1)}
                        >{prevIcon}</Link>
                    ) : null
                }
                {
                    page && showPageNumbers && this.renderPaginationNumbers(pageRangeDisplayed, totalPages, page)
                }
                {
                    page < totalPages && showNext ? (
                        <Link
                            className="page-next"
                            onClick={() => changePage(page + 1)}
                            to={() => setPage(page + 1)}
                        >{nextIcon}</Link>
                    ) : null
                }
                {
                    page && page < totalPages && showLast ? (
                        <Link
                            className="page-last"
                            onClick={() => changePage(totalPages)}
                            to={() => setPage(totalPages)}
                        >{lastIcon}</Link>
                    ) : null
                }
            </div>
        )
    }
}
