import React, { useEffect } from "react";
import {
    Feed,
    FeedSummary,
    FeedContent,
    FeedMeta,
    FeedEvent
 } from "semantic-ui-react";
import CommentsItem from "./Comments";
import { 
    CommentGroup,
    Header
} from "semantic-ui-react";
import Button from "semantic-ui-react";
import { getNewsItem } from "../services/api";

export default function NewsArea({newsId}) {
    const [newsItem, setNewsItem] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                getNewsItem(newsId).then(res => {
                    console.log(`res: ${res} newsId: ${newsId}`);
                    setNewsItem(res);
                });
                
            } finally {
                setLoading(false);
            }
        };

        fetchData()
    }, [newsId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    const { title, time, by, url } = newsItem;

    console.log(newsItem.kids);

    return (
        <>
            <Feed>
                <FeedEvent>
                    <FeedContent>
                        <FeedSummary content={title} date={new Date(time * 1000).toLocaleString()} user={by}></FeedSummary>
                        <FeedMeta>
                            <a href={url} target="_blank" rel="noopener noreferrer">Read more</a>
                        </FeedMeta>
                    </FeedContent>
                </FeedEvent>
            </Feed>
            <CommentGroup>
                <Header as="h3" dividing>Comments - {newsItem.kids}</Header>
                {newsItem.kids ? newsItem.kids.map((item, index) => (
                        <CommentsItem newsId={item} key={index} />
                )) :  <p>Нет комментариев</p>}
            </CommentGroup>
        </>
        
    )
}