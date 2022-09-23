import { Component } from "react";
import PropTypes from "prop-types"

export class Modal extends Component{
    escapeHendler = () => {
        this.props.onClick("");
    }
    overlayClickHendler = event => {
        if(event.target === event.currentTarget){
            this.props.onClick("");
        }
    }
    componentDidMount(){
        window.addEventListener("keydown", this.escapeHendler);
    }
    componentWillUnmount(){
        window.removeEventListener("keydown", this.escapeHendler);
    }
    render(){
        return(
            <div onClick={this.overlayClickHendler} className="Overlay">
                <div className="Modal">
                    <img src={this.props.path} alt="Big img"/>
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    Path: PropTypes.string,
    onClick: PropTypes.func
}