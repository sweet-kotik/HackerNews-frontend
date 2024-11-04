import React from "react";
import { Feed } from "semantic-ui-react";

export default function NewsLsit({ children }) {
    return (
        <div className="container" id="container">
            <Feed>
                {children}
            </Feed>
        </div>
    )
}