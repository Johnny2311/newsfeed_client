const BACKEND = 'http://localhost:8080';

export const getArticles = (page=1, perPage=10) => {
    return fetch(`${BACKEND}/article/?page=${page}&size${perPage}`)
        .then(response => response.json())
        .catch(error => console.log(error))
};

export const deleteArticle = articleId => {
    return fetch(`${BACKEND}/article/${articleId}`, { method: 'DELETE' })
        .then(response => response.json())
        .catch(error => console.log(error))
};
