
function Article(props) {
    return (
        <div className="article-row">
            <p className="article-title">{props.title} <span className="article-author">- {props.author} -</span>
            </p>
            <p className="article-time">{formatDate(props.created_at)}</p>
            <figure className="trash-figure">
                <i className='trash-icon fa fa-trash-o'></i>
            </figure>
        </div>
    );
}

function formatDate(d) {
    let date = new Date(d);
    if (isToday(date))
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();
    else if (isYesterday(date))
        return 'Yesterday';
    else
        return date.toLocaleDateString([], {month: 'short', day: 'numeric'});
}

function isToday(date) {
    let today = new Date();
    today.setHours(0, 0, 0);
    return date >= today;
}

function isYesterday(date) {
    let today = new Date();
    today.setHours(0, 0, 0);
    let yesterday = new Date(today.getTime());
    yesterday.setDate(yesterday.getDate() - 1);
    return date >= yesterday && date < today;
}

export default Article;