import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track =>
          <Track
            key={track.id}
            name={track.name}
            artist={track.artist}
            album={track.album}
          />
        )}
      </div>
    );
  }
}

export default TrackList;
