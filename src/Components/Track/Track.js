import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
  }
  addTrack() {
    this.props.onAdd(this.props.track);
  }
  renderAction() {
    if (this.props.isRemoval) {
      return <button className="Track-action">-</button>
    } else {
      return <button className="Track-action" onClick={this.addTrack}>+</button>
    }
  }
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3></h3>
          <p></p>
        </div>
        <button className="Track-action">{this.renderAction()}</button>
      </div>
    );
  }
}

export default Track;
