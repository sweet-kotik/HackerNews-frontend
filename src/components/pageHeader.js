import React from "react";
import { Header } from "semantic-ui-react";

class pageHeader extends React.Component {
    render() {
        return (
            <header className="header">
                <Header as="h1" >Hacker News</Header>
            </header>
        )
    }
}

export default pageHeader;