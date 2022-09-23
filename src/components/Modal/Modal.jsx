import { Component } from "react";
import PropTypes from "prop-types"
import { createPortal } from "react-dom";
const modalPortal = document.querySelector("#modal-root");

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
            createPortal(<div onClick={this.overlayClickHendler} className="Overlay">
                <div className="Modal">
                    <img src={this.props.path} alt="Big img"/>
                </div>
            </div>, modalPortal)
        )
    }
}

Modal.propTypes = {
    Path: PropTypes.string,
    onClick: PropTypes.func
}