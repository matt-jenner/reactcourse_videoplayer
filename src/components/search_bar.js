import React, { Component } from 'react';

const MIN_SEARCH_LENGTH = 3;

class SearchBar extends Component {

    constructor(props) {
        super(props);
        
        this.state = { term: '' };
    }

    render() {
        return (
            <div className="search-bar col-md-12">
                <input 
                    className="search-bar col-md-12"
                    value={this.state.term}
                    placeholder='type to search...'                    
                    onChange={evt => this.onInputChange(evt.target.value)} />
            </div>
        )
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
}

export default SearchBar;