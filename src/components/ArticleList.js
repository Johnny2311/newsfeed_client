import React from 'react';
import Article from "./Article";
import { getArticles, deleteArticle } from "../services/ArticleService";

class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            articles: []
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    componentDidMount() {
        this.fetchArticles();
    }

    async fetchArticles() {
        this.setState({
            isFetching: true
        });
        const articles = await getArticles();
        this.setState({
            isFetching: false,
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
            await this.fetchArticles();
        }
    }

    render() {
        const { articles } = this.state;
        return (
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
        );
    }
}

export default ArticleList;