import React, { useEffect } from "react";
import htmx from "htmx.org";
import {
    FeedSummary,
    FeedMeta,
    FeedLike,
    FeedContent,
    FeedEvent,
    FeedExtra,
    FeedUser
 } from "semantic-ui-react";
import { getNewsItem } from "../services/api";

export default function NewsItem({newsId}) {
    const [newsItem, setNewsItem] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getNewsItem(newsId);
                setNewsItem(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
            htmx.process(document.body);
        };

        fetchData();
    }, [newsId]);


    useEffect(() => {
        if (!loading && newsItem) {
            htmx.on(`#id${newsId}`, "click", () => {
                htmx.ajax('get', `/update?id=${newsId}`, {target: '#root', swap: 'afterbegin'});
            });
        }
    }, [loading, newsItem]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.log(error.message);
    }

    if (newsItem.dead) {
        return; 
    }

    const { title, time, id, by, score } = newsItem;

    
    return (
            <FeedEvent>
                <FeedContent>
                    <FeedSummary content={title} date={new Date(time * 1000).toLocaleString()} id={"id" + newsId} hx-push-url="true"/>

                    <FeedExtra>
                        id: {id}
                    </FeedExtra>
                    <FeedMeta>
                        <FeedUser content={by} />
                        <FeedLike>
                            Rank: {score}
                        </FeedLike>
                    </FeedMeta>
                </FeedContent>
            </FeedEvent>        
    )
}