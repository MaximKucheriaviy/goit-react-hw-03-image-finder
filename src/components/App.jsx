import { Component } from "react";
import { SearchBar } from "./SearchBar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";

export class App extends Component {
  state = {
    searchKeyword: "",
  }
  changeSerachKeyword = word => {
    this.setState({
      searchKeyword: word
    })
  }
  render(){
    return (
      <div className="App">
        <SearchBar onSubmit={this.changeSerachKeyword}/>
        <ImageGallery keyword={this.state.searchKeyword} page={1}/>
      </div>
    );
  }
};
