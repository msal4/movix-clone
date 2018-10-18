import React from 'react';
import { css } from 'glamor';

import MovieItem from './MovieItem';
import Spinner from './Spinner';

const fallbackImg =
  'http://nonton01.online/wp-content/uploads/2017/05/bbXyknvBVwbdjz4nWJXHfbptBgi-185x278.jpg';

const listStyles = css({
  display: 'flex',
  flexWrap: 'wrap',
  padding: '15px 0 0 15px',
});

const likesPanelStyles = css({
  display: 'flex',
  width: '100%',
  height: '200px',
  backgroundColor: 'pink',
  textAlign: 'center',
  fontSize: '.5rem',
});

const likedMovieStyles = css({
  width: '80px',
  height: '120px',
  margin: 'auto 10px',
  color: 'white',
});

const removeButtonStyles = css({
  border: 'none',
  backgorund: 'none',
});

export default class Main extends React.Component {
  constructor() {
    super();

    this.state = { data: {}, likes: [], dislikes: [] };

    // Set the fetch data in the state
    this.getMovies([]);
  }

  render() {
    let recommendations = this.renderMovies(this.state.data.items);
    return (
      <div>
        <div className="likes-panel" {...likesPanelStyles}>
          {[...this.state.likes, ...this.state.dislikes].map(item => (
            <div
              style={{
                background: `url(${
                  item.backdrop_path
                    ? 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' +
                      item.backdrop_path
                    : fallbackImg
                })`,
                backgroundSize: 'contain',
              }}
              {...likedMovieStyles}
              key={item.id}
            >
              <h2>{item.title}</h2>
              <button
                onClick={() => this.like(item, true)}
                {...removeButtonStyles}
              >
                unlike
              </button>
            </div>
          ))}
        </div>
        <div className="movies-list" {...listStyles}>
          {recommendations || <Spinner />}
        </div>
      </div>
    );
  }

  // Fetch movies from movix.ai API
  getMovies = payload => {
    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    };

    return fetch(`https://movix.ai/api/recommendations`, options)
      .then(res => res.json())
      .then(data => {
        this.setState({ data });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  };

  // Fetch recommendations
  fetchRecommendations = liked => {
    const movies = this.state.likes.map(movie => ({
      type: 'movie',
      liked,
      id: movie.id,
    }));
    const payload = movies ? movies : [];
    console.log(payload);
    this.getMovies(payload);
  };

  // Likes & Dislikes
  like = (movie, liked) => {
    // Removes the items to clear the page and start the spinner
    this.setState({ data: { items: null } });

    const { likes } = this.state;
    // Toggle
    if (liked) {
      this.setState({ likes: likes.filter(item => item.id !== movie.id) }, () =>
        this.fetchRecommendations(),
      );
    } else {
      this.setState({ likes: [...likes, movie] }, () =>
        this.fetchRecommendations(true),
      );
    }
  };

  dislike = (movie, disliked) => {
    let { dislikes } = this.state;
    if (disliked)
      this.setState(
        {
          dislikes: dislikes.filter(item => item.id !== movie.id),
        },
        () => this.fetchRecommendations(),
      );
    else
      this.setState({ dislikes: [...dislikes, movie] }, () =>
        this.fetchRecommendations(false),
      );
  };

  // Convert the movies array into <MovieItem />'s
  renderMovies = items =>
    items
      ? items.map((item, i) => (
          <MovieItem
            movie={item}
            like={this.like}
            dislike={this.dislike}
            key={i}
          />
        ))
      : null;
}
