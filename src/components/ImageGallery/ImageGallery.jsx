import { Component } from "react";
import PropTypes from "prop-types"
import axios from "axios";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Loader } from "components/Loder/Loader";
import { Button } from "components/Button/Button";


export class ImageGallery extends Component{
    apiKey = "29155901-7a6502b1ec64ba72602e491fa"
    url = "https://pixabay.com/api/"
    
    state = {
        renderImages: [],
        isLoading: false,
        page: this.props.page,
        totalItems: 0
    }
    
    incrementPage = () => {
        this.setState(prevState => {
            return {page: prevState.page + 1}
        })
    }
    
    componentDidUpdate(prevProps, prevState){
        if(this.props.keyword && (prevProps.keyword !== this.props.keyword || prevState.page !== this.state.page)){
            this.setState({
                isLoading: true
            })
            axios.get(this.url, 
            {
                params:{
                    key: this.apiKey,
                    q: this.props.keyword,
                    page: this.state.page,
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
                if(prevProps.keyword !== this.props.keyword){
                    this.setState({
                        renderImages: images,
                        totalItems: response.data.totalHits
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
            <>
                <ul className="ImageGallery">
                    {this.state.isLoading && <Loader/>}
                    {this.state.renderImages.map((item, index) => 
                    <ImageGalleryItem 
                        onClick={this.props.setModalPath}
                        src={item.webUrl} 
                        alt={this.state.keyword}
                        bigImage={item.largeUrl}
                        key={item.id * 10 + index}
                    />)}
                </ul>
                {(this.state.renderImages.length !== 0 && this.state.renderImages.length < this.state.totalItems) && <Button onClick={this.incrementPage}/>}
            </>
        )
    }
}

ImageGallery.propTypes = {
    keyword: PropTypes.string,
    page: PropTypes.number,
    setModalPath: PropTypes.func
}