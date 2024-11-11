import React from "react";
import PageHeader from "./components/pageHeader";
import Button from "./components/Button";
import NewsArea from "./components/NewsArea";
import htmx from "htmx.org";


export default class NewsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsId: 0,
            loading: true,
            json: {}
        }
        this.fetchId = this.fetchId.bind(this);
    }

    async componentDidMount() {
        try {
            await this.fetchId();
        } catch (error) {
            console.error(error);
        }
    }

    async fetchId() {
            await fetch(`/id`)
            .then(res =>  res.json())
            .then(json => {
                this.setState({newsId: json.id});
                this.setState({ loading: false });
            });
        }

    toNewsList() {
        htmx.ajax('get', '/', {target: '#container', swap: "afterbegin"});
    }

    render() {
        if (this.state.loading) {
            return (<p>Loading...</p>)
        } else {
            return (
                <>
                    <PageHeader />
                    <Button onClick={this.toNewsList} title="Назад к списку новостей"/>
                    <NewsArea newsId={this.state.newsId}/>
                    <div id="container"></div>
                    
                </>
            )
        }
    }
}