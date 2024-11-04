import React from "react";
import PageHeader from "./components/pageHeader";
import NewsItem from "./components/NewsItem";
import NewsList from "./components/NewsList";
import Button  from "./components/Button";
import { getLastestNews} from "./services/api";
import htmx from "htmx.org";



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            loading: true,
            error: null
            };
            this.fetchNews = this.fetchNews.bind(this);
        }

        componentDidMount() {
            this.fetchNews();
            this.interval = setInterval(this.fetchNews, 60000);
            htmx.process(document.body)
        }  

        fetchNews() {
            getLastestNews().then(response => {
                this.setState({news: response, loading: false});
            });
            console.log('GET NEWS - 200')
            htmx.process(document.body)
        }


        componentWillUnmount() {
            console.log(`${this.interval} - unmount`);
            clearInterval(this.interval);
        }
            
    render() {
        const { news, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }


        return (
            <>
                <PageHeader />
                <NewsList>
                    <Button onClick={this.fetchNews} title="Обновить"/>
                    {news.map((Item, index) => (
                        <NewsItem key={index} newsId={Item} />
                        
                    ))}
                </NewsList>
            </>
        )
    }
}

export default App;