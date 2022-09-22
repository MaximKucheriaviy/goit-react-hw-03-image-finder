import { Component } from "react";
import axios from "axios";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Loader } from "components/Loder/Loader";


export class ImageGallery extends Component{
    apiKey = "29155901-7a6502b1ec64ba72602e491fa"
    url = "https://pixabay.com/api/"
    
    state = {
        renderImages: [],
        isLoading: false
    }
    
    componentDidUpdate(prevProps, prevState){
        if(this.props.keyword && (prevProps.keyword !== this.props.keyword || prevProps.page !== this.props.page)){
            this.setState({
                isLoading: true
            })
            axios.get(this.url, 
            {
                params:{
                    key: this.apiKey,
                    q: this.props.keyword,
                    page: this.props.page,
                    per_page: 12
                }
            })
            .then(response => {
                const images = response.data.hits.map(item => {
                    return {
                        id: item.id,
                        webUrl: item.webformatURL,
                        largeUrl: item.largeImageURL
                    }
                })
                if(this.props.page === 1){
                    this.setState({
                        renderImages: images
                    })
                }
                else{
                    this.setState(prevState => {
                        const newImages = prevState.renderImages.concat(images);
                        return {renderImages: newImages};
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(data => {
                this.setState({
                    isLoading: false
                })
            })
            
        }
    }
    render(){
        return(
            <ul className="ImageGallery">
                {this.state.isLoading && <Loader/>}
                {this.state.renderImages.map(item => 
                <ImageGalleryItem 
                    src={item.webUrl} 
                    alt={this.state.keyword}
                    key={item.id}
                />)}
            </ul>
        )
    }
}