import { Component } from "react";
import PropTypes from "prop-types"

export class ImageGalleryItem extends Component{
    clckHendler = () => {
        this.props.onClick(this.props.bigImage);
    }
    render(){
        const {src, alt} = this.props;
        return(
            <li className="ImageGalleryItem">
                <img onClick={this.clckHendler} className="ImageGalleryItem-image" src={src} alt={alt}/>
            </li>
        )
    }
}


ImageGalleryItem.propTypes = {
    onClick: PropTypes.func,
    src: PropTypes.string,
    alt: PropTypes.string,
    bigImage: PropTypes.string
}