import { Component } from "react";
import { SearchBar } from "./SearchBar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "components/Modal/Modal";
import { Loader } from "./Loder/Loader";
import { Button } from "./Button/Button";
import axios from "axios";


export class App extends Component {
  apiKey = "29155901-7a6502b1ec64ba72602e491fa"
  url = "https://pixabay.com/api/"
  state = {
    searchKeyword: "",
    bigImagePath: "",
    renderImages: [],
    page: 1,
    isLoading: false,
    totalItems: 0
  }
  componentDidUpdate(prevProps, prevState){
    if(this.state.searchKeyword && (prevState.searchKeyword !== this.state.searchKeyword || prevState.page !== this.state.page)){
        this.setState({
            isLoading: true
        })
        axios.get(this.url, 
        {
            params:{
                key: this.apiKey,
                q: this.state.searchKeyword,
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
            if(prevState.searchKeyword !== this.state.searchKeyword){
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
  changeSerachKeyword = word => {
    this.setState({
      searchKeyword: word,
      page: 1
    })
  }
  setModalPath = (path) => {
    this.setState({
      bigImagePath: path
    })
  }

  incrementPage = () => {
    this.setState(prevState => {
        return {page: prevState.page + 1}
    })
  }

  render(){
    return (
      <div className="App">
        <SearchBar onSubmit={this.changeSerachKeyword}/>
        {this.state.renderImages.length !== 0 && <ImageGallery renderImages={this.state.renderImages} setModalPath={this.setModalPath}/>}
        {(this.state.renderImages.length !== 0 && this.state.renderImages.length < this.state.totalItems) && <Button onClick={this.incrementPage}/>}
        {this.state.bigImagePath && <Modal onClick={this.setModalPath} path={this.state.bigImagePath}/>}
        {this.state.isLoading && <Loader/>}
      </div>
    );
  }
};
