import React from 'react';
import './Track.css';

class Track extends React.Component {
  renderAction() {
    let symbol;
    this.props.isRemoval ? symbol = '-' : symbol = '+';
    return symbol;
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
