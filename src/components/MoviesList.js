import React from 'react';

import MovieItem from './MovieItem';

export default class MoviesList extends React.Component {
  constructor() {
    super();
    this.state = { movies: [] };
    this.getMovies({ type: 'movie', liked: true, id: '11177' });
  }
  getMovies = payload => {
    const options = {
      method: 'POST',
      body: JSON.stringify([payload]),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    };
    return fetch(`https://movix.ai/api/recommendations`, options)
      .then(res => res.json())
      .then(data => this.setState({ movies: data.items }));
  };
  render() {
    return (
      <div className="movie-list">
        {this.state.movies[0] ? this.state.movies[0].title : 'wait'}
      </div>
    );
  }
}
