
function Article(props) {
    return (
        <div className="article-row">
            <p className="article-title">{props.title} <span className="article-author">- {props.author} -</span>
            </p>
            <p className="article-time">{props.created_at}</p>
            <figure className="trash-figure">
                <i className='trash-icon fa fa-trash-o'></i>
            </figure>
        </div>
    );
}

export default Article;