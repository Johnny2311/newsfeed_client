import React from 'react';
import Article from "./Article";
import { getArticles } from "../services/ArticleService";

class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            articles: []
        }
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

    render() {
        const { articles } = this.state;
        return (
            <div className="main">
                <div className="article-list">
                    {articles && articles.map((article, index) => (
                        <Article key={index} title={article.title} author={article.author} created_at={article.created_at} />
                    ))}
                </div>
            </div>
        );
    }
}

export default ArticleList;