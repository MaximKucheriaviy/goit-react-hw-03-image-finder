import { Component } from "react";

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