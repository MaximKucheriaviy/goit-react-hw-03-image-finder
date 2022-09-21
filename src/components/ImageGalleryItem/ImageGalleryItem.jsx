import { Component } from "react";

export class ImageGalleryItem extends Component{
    render(){
        const {src, alt, key} = this.props;
        return(
            <li className="gallery-item">
                <img src={src} alt={alt} key={key}/>
            </li>
        )
    }
}