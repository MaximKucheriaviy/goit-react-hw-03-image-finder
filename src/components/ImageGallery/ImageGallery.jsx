import { Component } from "react";
import PropTypes from "prop-types"
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

import { Button } from "components/Button/Button";


export class ImageGallery extends Component{        
    render(){
        return(
            <>
                <ul className="ImageGallery">
                    {this.props.renderImages.map((item, index) => 
                    <ImageGalleryItem 
                        onClick={this.props.setModalPath}
                        src={item.webUrl} 
                        alt={item.index}
                        bigImage={item.largeUrl}
                        key={item.id * 10 + index}
                    />)}
                </ul>
            </>
        )
    }
}

ImageGallery.propTypes = {
    setModalPath: PropTypes.func,
    renderImages: PropTypes.arrayOf(PropTypes.shape({
        webUrl: PropTypes.string,
        id: PropTypes.number,
        bigImage: PropTypes.string
    }))
}