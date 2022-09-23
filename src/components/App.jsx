import { Component } from "react";
import { createPortal } from "react-dom";
import { SearchBar } from "./SearchBar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "components/Modal/Modal";

const modalPortal = document.querySelector("#modal-root");

export class App extends Component {
  state = {
    searchKeyword: "",
    bigImagePath: ""
  }
  changeSerachKeyword = word => {
    this.setState({
      searchKeyword: word
    })
  }
  setModalPath = (path) => {
    this.setState({
      bigImagePath: path
    })
  }
  render(){
    return (
      <div className="App">
        <SearchBar onSubmit={this.changeSerachKeyword}/>
        <ImageGallery keyword={this.state.searchKeyword} page={1} setModalPath={this.setModalPath}/>
        {this.state.bigImagePath && createPortal(<Modal onClick={this.setModalPath} path={this.state.bigImagePath}/>, modalPortal)}
      </div>
    );
  }
};
