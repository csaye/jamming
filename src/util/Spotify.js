import credentials from './Credentials';

let userAccessToken;
let expiresIn;
const clientID = credentials.clientID;
const redirectURI = 'https://csaye.com/jamming/';

const Spotify = {
  getAccessToken() {
    if (userAccessToken) {
      return userAccessToken;
    }
    const accessTokenRegex = /access_token=([^&]*)/;
    const expiresInRegex = /expires_in=([^&]*)/;
    const accessTokenMatch = window.location.href.match(accessTokenRegex);
    const expiresInMatch = window.location.href.match(expiresInRegex);
    if (accessTokenMatch && expiresInMatch) {
      userAccessToken = accessTokenMatch[1];
      expiresIn = expiresInMatch[1];
      window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/jamming/');
      return userAccessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },
  search(term) {
    const data = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userAccessToken}`
      }
    };
    const url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
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
          uri: track.uri,
          preview: track.preview_url
        }));
      }
      console.log('no tracks found');
      console.log(jsonResponse);
      return [];
    });
  },
  savePlaylist(name, trackURIs) {
    if (!name || !trackURIs) {
      return;
    }
    const accessToken = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    let userID;
    let playlistID;
    return fetch('https://api.spotify.com/v1/me', {
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
          return response.json();
        }
        throw new Error('Post request failed!');
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
