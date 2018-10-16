import React from 'react';

export default class MovieItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="movie-item">{this.props.movie.title}</div>;
  }
}
