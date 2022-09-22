import { Component } from "react";
import axios from "axios";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { TailSpin } from "react-loader-spinner";


export class ImageGallery extends Component{
    apiKey = "29155901-7a6502b1ec64ba72602e491fa"
    url = "https://pixabay.com/api/"
    constructor(props){
        super(props);
        this.state = {
            page: 1,
            renderImages: [],
            isLoading: false
        }
    }
    async componentDidUpdate(prevProps, prevState){
        if(this.props.keyword && (prevProps.keyword !== this.props.keyword || prevState.page !== this.state.page)){
            try{
                this.setState({
                    isLoading: true
                })
                const response = await axios.get(this.url, 
                {
                    params:{
                        key: this.apiKey,
                        q: this.props.keyword,
                        page: this.state.page,
                        per_page: 12
                    }
                })
                const images = response.data.hits.map(item => {
                    return {
                        id: item.id,
                        webUrl: item.webformatURL,
                        largeUrl: item.largeImageURL
                    }
                })
                this.setState({
                    renderImages: images
                })
            }
            catch(err){
                console.log(err);
            }
            finally{
                this.setState({
                    isLoading: false
                })
            }
        }
    }
    render(){
        return(
            <ul className="ImageGallery">
                {this.state.isLoading && <TailSpin
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />}
                {this.props.keyword && 
                this.state.renderImages.map(item => 
                    <ImageGalleryItem 
                        src={item.webUrl} 
                        alt={this.state.keyword}
                        key={item.id}
                    />)}
            </ul>
        )
    }
}