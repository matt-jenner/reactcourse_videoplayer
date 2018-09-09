import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import Config from './config/config';

const {API_KEY, INITIAL_SEARCHTERM} = Config;

class App extends Component {
    constructor(props){
        super(props);

        this.state = { 
            term: INITIAL_SEARCHTERM,
            selectedVideo: null,
            videos: []
        };

        this.videoSearch(INITIAL_SEARCHTERM);
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = debounce((term) => {this.videoSearch(term)}, 300);
        return (
            <div>
                <SearchBar onSearchTermChange={term => videoSearch(term)}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList 
                    videos={this.state.videos}
                    onVideoSelect={selectedVideo => this.setState({selectedVideo}) } />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));
