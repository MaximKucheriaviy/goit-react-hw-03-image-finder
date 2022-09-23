import { Component } from "react";
import PropTypes from "prop-types";

export class Button extends Component{
    handlerClick = () => {
        this.props.onClick();
    }
    render(){
        return(
            <button type="button" className="Button" onClick={this.handlerClick}>Load more</button>
        )
    }
}

Button.propTypes = {
    onClick: PropTypes.func
}