export function getFirstPage(pageRangeDisplayed, totalPages, page){
    const offset = page === totalPages ? pageRangeDisplayed + 1 : pageRangeDisplayed;
    return Math.max(1, page - offset);
}

export function getLastPage(pageRangeDisplayed, totalPages, page){
    const offset = page === 1 ? pageRangeDisplayed + 1 : pageRangeDisplayed;
    return Math.min(totalPages, page + offset);
}
