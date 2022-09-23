import { Component } from "react";

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