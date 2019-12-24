import React from 'react';
import queryString from 'query-string';
import Pagination from "../components/Pagination/Pagination";
import { getDataAtUrl } from "../api";
import ArticleList from "../components/ArticleList";

export default class ArticleListPage extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            page: queryString.parse(this.props.location.search).page || 1,
            total: null,
            totalOnPage: null,
            totalPages: 1,
        };

        this.getArticles = this.getArticles.bind(this);
        this.setPage = this.setPage.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount(){
        this.getArticles();
    }

    getArticles(){
        const qs = queryString.stringify({ page: this.state.page });

        getDataAtUrl('/api/article?' + qs, false)
            .then(result => {
                this.setState({
                    articles: result.data.items,
                    page: result.data.page,
                    total: result.data.total,
                    totalOnPage: result.data.totalOnPage,
                    totalPages: result.data.totalPages
                });
            });
    }

    changePage(pageNumber){
        this.setState({ page: pageNumber }, this.getArticles);
    }

    setPage(page){
        const qs = queryString.stringify({ page: page });
        return '/article?' + qs;
    }

    render(){
        const {articles, page, totalPages} = this.state;
        const ArticleListProps = {
            articles: articles
        };

        if(articles.length) {
            return (
                <div className="article-listing-page">
                    <ArticleList {...ArticleListProps} />
                    <Pagination
                        page={ page }
                        totalPages={ totalPages }
                        setPage={ this.setPage }
                        changePage={ this.changePage }
                    />
                </div>
            );
        } else {
            return null;
        }
    }
}
