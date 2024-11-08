import React from "react";


class Button extends React.Component {
    render() {
        return (
            <button className="ui button" onClick={this.props.onClick} >{this.props.title}</button>
        )
    }
}

export default Button;