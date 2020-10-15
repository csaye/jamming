import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [
        {
          name: 'name a',
          artist: 'artist a',
          album: 'album a',
          id: 'id a'
        },
        {
          name: 'name b',
          artist: 'artist b',
          album: 'album b',
          id: 'id b'
        },
        {
          name: 'name c',
          artist: 'artist c',
          album: 'album c',
          id: 'id c'
        }
      ]
    };
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
