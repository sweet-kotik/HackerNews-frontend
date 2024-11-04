import React from "react";
import PageHeader from "./components/pageHeader";
import Button from "./components/Button";
import NewsArea from "./components/NewsArea";
import htmx from "htmx.org";


export default class NewsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsId: 41992270
        }
    }

    toNewsList() {
        htmx.ajax('get', '/', {target: '#container', swap: "afterbegin"});
    }

    render() {
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