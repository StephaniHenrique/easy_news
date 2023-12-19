import  React, { createContext, useState } from 'react';

export const NewsContext = createContext({});

function NewsProvider({children}) {
    const [articles, setArticles] = useState({});

    function updateArticles(articles) {
        setArticles(articles);
    }

    return(
        <NewsContext.Provider value={{ articles, setArticles }}>
            {children}
        </NewsContext.Provider>
    )
}

export default NewsProvider;