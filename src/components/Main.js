import React from 'react';
import { css } from 'glamor';

import MovieCard from './MovieCard';
import Spinner from './Spinner';

const fallbackImg =
  'http://nonton01.online/wp-content/uploads/2017/05/bbXyknvBVwbdjz4nWJXHfbptBgi-185x278.jpg';

const listStyles = css({
  position: 'relative',
  display: 'flex',
  flexWrap: 'wrap',
  padding: '15px 0 0 15px',
  height: '100%',
  // justifyContent: 'space-between',
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

    // Set the fetched data in the state
    this.getMovies([]);
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
    const movies = this.state.likes
      ? this.state.likes.map(movie => ({
          type: 'movie',
          liked,
          id: movie.id,
        }))
      : [];
    const payload = movies;
    console.log(payload);
    this.getMovies(payload);
  };

  // Likes & Dislikes
  like = movie => {
    // Removes the items to clear the page and start the spinner
    this.setState({ data: { items: null } });

    this.setState({ likes: [...this.state.likes, movie] }, () =>
      this.fetchRecommendations(true),
    );
  };

  dislike = movie => {
    // this.setState({ data: { items: null } });
    // this.setState(
    //   { dislikes: [...this.state.dislikes, movie] }, () => this.fetchRecommendations(false),
    // );

    console.log('disliked:', movie.title);
  };

  remove = item => {
    this.setState({ data: { items: null } });
    let { likes, dislikes } = this.state;
    let favourite = false;

    this.setState({
      likes: likes.filter(movie => {
        if (item.id === movie.id) {
          favourite = true;
          console.log('from likes, favourite: ' + favourite);
          return false;
        }
        return true;
      }),
    });

    // this.setState({
    //   dislikes: dislikes.filter(movie => {
    //     if (item.id === movie.id) {
    //       favourite = false;
    //       console.log('from dislikes, favourite: ' + favourite);
    //       return false;
    //     }
    //     return true;
    //   }),
    // });

    this.fetchRecommendations(favourite);
  };
  // Convert the movies array into <MovieItem />'s
  renderMovies = items =>
    items
      ? items.map((item, i) => (
          <MovieCard
            item={item}
            like={this.like}
            dislike={this.dislike}
            key={i}
          />
        ))
      : null;

  render() {
    let recommendations = this.renderMovies(this.state.data.items);
    console.log(this.state);
    return (
      <React.Fragment>
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
              <button onClick={() => this.remove(item)} {...removeButtonStyles}>
                <i className="fas fa-trash-alt" />
              </button>
            </div>
          ))}
        </div>
        <div className="movies-list" {...listStyles}>
          {recommendations || <Spinner />}
        </div>
      </React.Fragment>
    );
  }
}
