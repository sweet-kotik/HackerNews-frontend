//TODO:
// baseUrl: https://hacker-news.firebaseio.com/v0/newstories.json
// itemUrl: https://hacker-news.firebaseio.com/v0/item/{}.json
// последниие 100 новостей могут не иметь поле kids, то есть не иметь комментарии
import axios from "axios";

const BASE_URL = "https://hacker-news.firebaseio.com/v0/";

//получение последних 100 новостей
export async function getLastestNews() {
    const {data: news} = await axios.get(`${BASE_URL}/newstories.json`);
    
    const lastetsNews = news.slice(0, 100);
    
    return lastetsNews;

}

//получение новости по id
export async function getNewsItem(id) {
    const { data } = await axios.get(`${BASE_URL}/item/${id}.json`);
    return data;
}
