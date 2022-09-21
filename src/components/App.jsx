import { Component } from "react";
import { SearchBar } from "./SearchBar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";

export class App extends Component {
  state = {
    searchKeyword: ""
  }
  changeSerachKeyword = word => {
    this.setState({
      searchKeyword: word
    })
  }
  render(){
    return (
      <>
        <SearchBar onSubmit={this.changeSerachKeyword}/>
        <ImageGallery keyword={this.state.searchKeyword}/>
      </>
    );
  }
};
