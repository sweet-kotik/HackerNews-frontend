import React, { useEffect } from "react";
import { 
    Comment,
    CommentAuthor,
    CommentMetadata,
    CommentContent,
    CommentText,
    CommentGroup
} from "semantic-ui-react";
import { getNewsItem } from "../services/api";

export default function CommentsItem({newsId}) {
    const [newsItem, setNewsItem] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getNewsItem(newsId);
                setNewsItem(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
            
        };

        fetchData()
    }, [newsId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    const {by, text, time } = newsItem;

    return(
        <Comment>
            <CommentContent>
                <CommentMetadata>
                    <CommentAuthor>{by}</CommentAuthor>
                    <div>{new Date(time * 1000).toLocaleString()}</div>
                </CommentMetadata>
                <CommentText id={"id" + newsItem.id}>{text}</CommentText>
            </CommentContent>
            <CommentGroup>
                {newsItem.kids && newsItem.kids.map((item, index) => (
                        <CommentsItem newsId={item} key={index} />
                ))}
            </CommentGroup>
        </Comment>
    );
}