import { Component } from "react";
import axios from "axios";
//import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";


export class ImageGallery extends Component{
    apiKey = "29155901-7a6502b1ec64ba72602e491fa"
    url = "https://pixabay.com/api/"
    constructor(props){
        super(props);
        this.state = {
            page: 1,
            renderImages: []
        }
    }
    async componentDidUpdate(prevProps, prevState){
        if(this.props.keyword && (prevProps.keyword !== this.props.keyword || prevState.page !== this.state.page)){
            try{
                const response = await axios.get(this.url, 
                {
                    params:{
                        key: this.apiKey,
                        q: this.props.keyword,
                        page: this.state.page,
                        per_page: 12
                    }
                })
                console.log(response);
            }
            catch(err){
                console.log(err);
            }
        }
    }
    render(){
        return(
            <ul className="ImageGallery">
                {this.props.keyword && `Cards and ${this.props.keyword}`}
            </ul>
        )
    }
}