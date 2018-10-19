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
  backgroundColor: '#f2f2f2',
  justifyContent: 'center',
});

const likesPanelStyles = css({
  display: 'flex',
  width: '100%',
  height: '121px',
  backgroundColor: '#2778AA',
  textAlign: 'center',
  fontSize: '.5rem',
  padding: '10px',
  boxSizing: 'border-box',
});

const likedMovieStyles = css({
  width: '67',
  height: '101px',
  padding: '4px',
  boxSizing: 'border-box',
  margin: 'auto 10px',
  color: 'white',
  borderRadius: '5px',
  boxShadow: '0 0 0 2px white',
});

const removeWrapperStyles = css({
  position: 'relative',
  width: '100%',
  height: '100%',
  opacity: 0,
  transition: 'all .1s',
  '&:hover': {
    opacity: '1',
  },
});

const removeButtonStyles = css({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '6px 14px',
  border: 'none',
  backgorund: 'none',
  fontSize: '2rem',
  // backgroundColor: '#fff',
  // color: 'rgb(252, 25, 93)',
  transition: 'all .2s',
  borderRadius: '50%',
  color: '#fff',
  backgroundColor: 'rgb(252, 25, 93)',
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
      })
      .catch(err => console.error(err));
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
    console.table(movies);
    this.getMovies(movies);
  };

  // Likes & Dislikes
  like = movie => {
    // Removes the items to clear the page and start the spinner
    this.setState(
      { data: { items: null }, likes: [...this.state.likes, movie] },
      () => this.fetchRecommendations(true),
    );
  };

  dislike = movie => {
    // this.setState({ data: { items: null } });
    // this.setState(
    //   { dislikes: [...this.state.dislikes, movie] }, () => this.fetchRecommendations(false),
    // );
  };

  remove = unlikedItem => {
    this.setState(
      {
        data: { items: null },
        likes: this.state.likes.filter(item => item.id !== unlikedItem.id),
      },
      () => this.fetchRecommendations(true),
    );
    // let { likes, dislikes } = this.state;
    // let favourite = false;

    // this.setState({
    //   likes: likes.filter(movie => {
    //     if (item.id === movie.id) {
    //       favourite = true;
    //       console.log('from likes, favourite: ' + favourite);
    //       return false;
    //     }
    //     return true;
    //   }),
    // });

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
              <div {...removeWrapperStyles}>
                <button
                  onClick={() => this.remove(item)}
                  {...removeButtonStyles}
                >
                  <i className="fas fa-trash-alt" />
                </button>
              </div>
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
