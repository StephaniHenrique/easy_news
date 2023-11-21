const newsAPIurl = "https://newsapi.org/v2/top-headlines?country=us&apiKey=22eae92dba794c89b68f6c2989ae3c87";

export async function getNews() {
    let result = await fetch(newsAPIurl).then(response => response.json());
    return result.articles;
  }