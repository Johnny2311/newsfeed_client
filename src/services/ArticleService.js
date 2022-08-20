const BACKEND = 'http://localhost:8080';

export const getArticles = () => {
    return fetch(`${BACKEND}/article/`)
        .then(response => response.json())
        .catch(error => console.log(error))
};

export const deleteArticle = articleId => {
    return fetch(`${BACKEND}/article/${articleId}`)
        .then(response => response.json())
        .catch(error => console.log(error))
};
