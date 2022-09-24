import { Component } from "react";
import { SearchBar } from "./SearchBar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "components/Modal/Modal";
import { Loader } from "./Loder/Loader";
import { Button } from "./Button/Button";
import { getDataFromPixabay } from "js/pixabayApi";



export class App extends Component {
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
        getDataFromPixabay(this.state.searchKeyword, this.state.page)
        .then(data => {
            if(prevState.searchKeyword !== this.state.searchKeyword){
                this.setState({
                    renderImages: data.hits,
                    totalItems: data.totalHits
                })
            }
            else{
                this.setState(prevState => {
                    const newImages = prevState.renderImages.concat(data.hits);
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
