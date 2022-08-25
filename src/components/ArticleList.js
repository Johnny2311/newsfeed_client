import React from 'react';
import Article from "./Article";
import { getArticles, deleteArticle } from "../services/ArticleService";

class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            count: 0,
            curPage: 1,
            perPage: 10,
            articles: []
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    componentDidMount() {
        this.fetchArticles();
    }

    async fetchArticles() {
        this.setState({
            isFetching: true
        });
        const { curPage, perPage } = this.state;
        const res = await getArticles(curPage, perPage);

        const { articles, count } = res;

        this.setState({
            isFetching: false,
            count,
            articles
        });
    }

    handleClick(url) {
        window.open(url, "_blank");
    }

    async handleDeleteClick(id, e) {
        e.stopPropagation();
        if (window.confirm("Seguro que quieres eliminar este artículo?")) {
            await deleteArticle(id);
            const { count, curPage, perPage } = this.state;
            // last element deleted
            console.log(count, perPage, curPage)
            if (count % perPage === 1 && curPage > 1) {
                this.setState((prevState) => ({
                    curPage: prevState.curPage - 1
                }), () => {
                    this.fetchArticles();
                });
            } else {
                this.fetchArticles();
            }
        }
    }

    handlePrev() {
        this.setState((prevState) => ({
            curPage: prevState.curPage - 1
        }), () => {
            this.fetchArticles();
        })
    }

    handleNext() {
        this.setState((prevState) => ({
            curPage: prevState.curPage + 1
        }), () => {
            this.fetchArticles();
        })
    }

    render() {
        const { articles, count, curPage, perPage } = this.state;
        const lastPage = Math.ceil(count / perPage);
        return (
            <React.Fragment>
                <div className="main">
                    <div className="article-list">
                        {articles && articles.map((article, index) => (
                            <Article
                                key={index}
                                onClick={this.handleClick.bind(this, article.url)}
                                onDeleteClick={this.handleDeleteClick.bind(this, article._id)}
                                title={article.title}
                                author={article.author}
                                created_at={article.created_at}
                            />
                        ))}
                    </div>
                </div>
                <div className="pagination">
                    <button disabled={curPage === 1} onClick={this.handlePrev}>❮</button>
                    <button disabled={curPage === lastPage} onClick={this.handleNext}>❯</button>
                </div>
            </React.Fragment>
        );
    }
}

export default ArticleList;