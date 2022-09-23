import { Component } from "react";
import PropTypes from "prop-types";
import { AiOutlineSearch } from "react-icons/ai";

export class SearchBar extends Component{
    state = {
        photoSerach: ""
    }
    handleChage = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }
    hendlerSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.photoSerach.trim());
    }
    render(){
        return(
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={this.hendlerSubmit}>
                    <button type="submit" className="SearchForm-button">
                        <AiOutlineSearch size={20}/>
                    </button>
                    <input
                    className="SearchForm-input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={this.handleChage}
                    name="photoSerach"
                    value={this.state.photoSerach}
                    />
                </form>
            </header>
        )
    } 
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func
}