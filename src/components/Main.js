import React from 'react';
import { css } from 'glamor';

import MovieCard from './MovieCard';
import Spinner from './Spinner';
import Footer from './Footer';

const fallbackImg =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBtTMWw84ZM3RzAg-uM8Fan6-Fo4nDJST12kirRcu62pfecC7U';

const styles = css({
  minHeight: '100%',
  // boxSizing: 'border-box',
  '& .hide': {
    display: 'none',
  },
  '& .show': {
    position: 'absolute',
    zIndex: '2',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: '15px',
    boxSizing: 'border-box',
    width: '100%',
    boxShadow: '7px 7px 10px rgba(100, 100, 100, .3)',
    color: '#836890',
    '& div': {
      flex: '1',
    },
  },
});

const listStyles = css({
  minHeight: '100%',
  position: 'relative',
  display: 'flex',
  flexWrap: 'wrap',
  padding: '15px 0 0 15px',
  // backgroundColor: '#f2f2f2',
  justifyContent: 'center',
  zIndex: '1',
  boxSizing: 'border-box',
});

const likesPanelStyles = css({
  display: 'flex',
  width: '100%',
  height: '121px',
  backgroundColor: 'gainsboro',
  textAlign: 'center',
  fontSize: '.5rem',
  padding: '10px',
  boxSizing: 'border-box',
});

const likedItemStyles = css({
  position: 'relative',
  width: '67px',
  height: '101px',
  padding: '4px',
  boxSizing: 'border-box',
  margin: 'auto 10px',
  color: 'white',
  borderRadius: '5px',
  boxShadow: '1px 1px 10px rgba(100, 100, 180, .3)',
  overflow: 'hidden',
});

const likedItemTitleStyles = css({
  position: 'absolute',
  top: '0',
  left: '0',
  fontSize: '.7rem',
  width: '100%',
  height: '100%',
  margin: '0',
  padding: '3px',
  textAlign: 'center',
  lineBreak: 'normal',
  boxSizing: 'border-box',
  cursor: 'pointer',
  transition: 'all .2s',
  opacity: 1,
  '&:hover': {
    opacity: 0,
  },
  '& span': {
    margin: 'auto',
  },
  '@media screen and (max-width: 600px)': {
    opacity: 0,
  },
});

const removeWrapperStyles = css({
  position: 'relative',
  width: '100%',
  height: '100%',
  transition: 'all .1s',
});

const removeButtonStyles = css({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '10px 12px',
  border: 'none',
  background: 'none',
  fontSize: '1.3rem',
  // backgroundColor: '#fff',
  // color: 'rgb(252, 25, 93)',
  opacity: '.8',
  borderRadius: '50%',
  color: '#fff',
  backgroundColor: 'rgb(252, 25, 93)',
});

const suggestionCardStyles = css({
  // opacity: '.8',
  margin: 'auto',
  opacity: '.6',
  color: '#868484',
  fontSize: '1.5rem',
  fontWeight: '700',
  padding: '5px 10px',
  borderRadius: '40px',
  boxSizing: 'border-box',
  backgroundColor: 'white',
  cursor: 'default',
  // boxShadow: '1px 1px 10px rgba(100, 100, 180, .3)',
});

const tagStyles = css({
  color: '#fff',
  backgroundColor: '#836890',
  margin: '5px',
  padding: '2px 4px',
  boxSizing: 'border-box',
  borderRadius: '3px',
  transition: 'all .2s',
  '&:hover': {
    boxShadow: '1px 1px 4px rgba(50, 50, 50, .5)',
  },
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
    const items = this.state.likes
      ? this.state.likes.map(item => ({
          type: item.type,
          liked,
          id: item.id,
        }))
      : [];
    console.table(items);
    this.getMovies(items);
  };

  // Likes & Dislikes
  like = item => {
    // Removes the items to clear the page and start the spinner
    this.setState(
      {
        data: { items: null },
        likes: [...this.state.likes, item],
      },
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
      () => this.fetchRecommendations(),
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

  filterTags = (tags, category) =>
    !!tags
      ? tags.filter(tag => tag.category === category).map(tag => (
          <button {...tagStyles} key={tag.id} onClick={() => this.like(tag)}>
            {tag.title}
          </button>
        ))
      : '';

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
    let { data, likes } = this.state;
    let recommendations = this.renderMovies(data.items);
    console.log(data);
    return (
      <div {...styles}>
        <div className="filter-panel hide">
          <div className="genres">
            <h3>Genres</h3>
            <span>{this.filterTags(data.tags, 'genre')}</span>
          </div>
          <div className="keywords">
            <h3>Keywords</h3>
            <span>{this.filterTags(data.tags, 'keyword')}</span>
          </div>
        </div>
        <div className="likes-panel" {...likesPanelStyles}>
          {!!likes.length ? (
            likes.map(item => (
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
                {...likedItemStyles}
                key={item.id}
              >
                <div {...removeWrapperStyles}>
                  <i className="fas fa-trash-alt" {...removeButtonStyles} />
                </div>
                <p
                  onClick={() => this.remove(item)}
                  style={{
                    background: `url(${
                      item.backdrop_path
                        ? 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' +
                          item.backdrop_path
                        : fallbackImg
                    })`,
                    backgroundSize: 'contain',
                  }}
                  {...likedItemTitleStyles}
                >
                  <span>{item.title}</span>
                </p>
              </div>
            ))
          ) : (
            <div {...suggestionCardStyles}>
              Like movies to improve recommendations
            </div>
          )}
        </div>
        <div className="movies-list" {...listStyles}>
          {recommendations || <Spinner />}
        </div>
        {recommendations ? <Footer /> : ''}
      </div>
    );
  }
}
