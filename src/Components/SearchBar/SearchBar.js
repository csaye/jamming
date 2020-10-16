import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
    this.search = this.search.bind(this);
    this.reset = this.reset.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  search() {
    this.props.onSearch(this.state.term);
  }
  reset() {
    this.props.onReset();
  }
  handleTermChange(event) {
    this.setState({
      term: event.target.value
    });
  }
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.search();
    }
  }
  render() {
    return (
      <div className="SearchBar">
      <input
      placeholder="Enter A Song, Album, or Artist"
      onChange={this.handleTermChange}
      onKeyPress={this.handleKeyPress}
      />
      <button className="SearchBarButton" onClick={this.search}>SEARCH</button>
      <button className="SearchBarButton" onClick={this.reset}>RESET</button>
    </div>
  );
  }
}

export default SearchBar;
