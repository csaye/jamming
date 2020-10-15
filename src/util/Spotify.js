import credentials from './Credentials';

let accessToken;
let expiresIn;
const clientID = credentials.clientID;
const redirectURI = 'http://localhost:3000/';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else if (window.location.href.match(/access_token=([^&]*)/) != null) {
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },
  search(term) {
    const data = {
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`
      }
    };
    const url = `https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?type=track&q=${term}`;
    return fetch(url, data).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Search request failed!');
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }))
      }
      return [];
    });
  },
  savePlaylist(name, trackURIs) {
    if (!name || !trackURIs) {
      return;
    }
    const headers = {
      Authorization: `Bearer ${this.getAccessToken()}`
    };
    let userID;
    let playlistID;
    return fetch('https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: headers
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Get request failed!');
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
      userID = jsonResponse.id;
      fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          name: name
        })
      }).then(response => {
        if (response.ok) {
          return response.json;
        }
        throw new Error('Post request failed');
      }, networkError => console.log(networkError.message)).then(jsonResponse => {
        playlistID = jsonResponse.id;
        fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            uris: trackURIs
          })
        });
      });
    });
  }
};

export default Spotify;
