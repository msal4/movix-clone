import React from 'react';
import { css } from 'glamor';

const fallbackImg =
  'http://nonton01.online/wp-content/uploads/2017/05/bbXyknvBVwbdjz4nWJXHfbptBgi-185x278.jpg';
const OVERVIEW_LENGTH = 348;

const containerStyles = css({
  width: '270px',
  margin: '0 20px 20px 0',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 0 20px rgba(0, 0, 0, .3)',
  background: 'rgba(40, 40, 70, .9)',
  '@media screen and (max-width: 600px)': {
    width: '135px',
  },
});

const cardStyles = css({
  position: 'relative',
  flexDirection: 'column',
  overflow: 'hidden',
  width: '270px',
  height: '406px',
  color: '#fff',
  '@media screen and (max-width: 600px)': {
    width: '135px',
    height: '203px',
  },
});

const cardBodyStyles = css({
  position: 'absolute',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: '100%',
  opacity: '0',
  cursor: 'default',
  backgroundColor: 'rgba(40, 40, 70, .9)',
  padding: '10px',
  transition: 'all .2s',
  '&:hover': {
    opacity: '1',
  },
  '@media screen and (max-width: 600px)': {
    opacity: '1',
    backgroundColor: 'unset',
  },
});

const cardTitleStyles = css({
  color: '#fff',
  fontSize: '1rem',
  fontWeight: '600',
  margin: '5px',
  textAlign: 'center',
  '@media screen and (max-width: 600px)': {},
});

const infoContainerStyles = css({
  fontSize: '.9rem',
  display: 'flex',
  flexDirection: 'column',
});

const infoStyles = css({
  display: 'flex',
  alignItems: 'center',
  // color: '#9FA7A9',
});

const ratingsStyles = css({
  display: 'flex',
  alignItems: 'center',
  marginRight: '1rem',
  '& i': {
    marginRight: '5px',
    color: 'orange',
  },
  '@media screen and (max-width: 600px)': {
    display: 'none',
  },
});

const ratingsMobileStyles = css({
  display: 'none',
  '@media screen and (max-width: 600px)': {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    marginTop: '-80px',
    backgroundColor: 'rgba(40, 40, 70, .8)',
    borderRadius: '25px',
    '& i': {
      marginRight: '5px',
      color: 'orange',
    },
  },
});

const descriptionStyles = css({
  color: '#fff',
  fontSize: '.9rem',
  overflow: 'hidden',
  flex: 1,
  '@media screen and (max-width: 600px)': {
    display: 'none',
  },
});

const actionsContainerStyles = css({
  display: 'flex',
  justifyContent: 'space-around',
  '& button': {
    margin: '10px',
    width: '36px',
    height: '36px',
    boxSizing: 'border-box',
    borderRadius: '50%',
    transition: 'all .2s',
    textAlign: 'center',
  },
  '& .like-btn': {
    color: 'rgb(57, 146, 219)',
    '&:hover': {
      backgroundColor: 'rgb(57, 146, 219)',
      color: '#fff',
    },
    '@media screen and (max-width: 600px)': {
      backgroundColor: 'rgb(57, 146, 219)',
      color: '#fff',
    },
  },
  '& .dislike-btn': {
    color: 'rgb(252, 25, 93)',
    '&:hover': {
      backgroundColor: 'rgb(252, 25, 93)',
      color: '#fff',
    },
    '@media screen and (max-width: 600px)': {
      backgroundColor: 'rgb(252, 25, 93)',
      color: '#fff',
    },
  },
  '@media screen and (max-width: 600px)': {
    // backgroundColor: 'rgba(40, 40, 70, .9)',
    // borderRadius: '25px',
  },
});

const genresStyles = css({
  display: 'flex',
  flexWrap: 'wrap',
  '@media screen and (max-width: 600px)': {
    display: 'none',
  },
});

const tagStyles = css({
  background: '#F2F2F2',
  color: '#f2f2f2',
  margin: '5px',
  padding: '2px 4px',
  backgroundColor: '#836890',
  borderRadius: '3px',
});

const yearStyles = css({
  color: '#f0f0f0',
  fontWeight: '500',
  marginLeft: '5px',
});

export default class MovieCard extends React.Component {
  render = () => {
    let {
      overview,
      backdrop_path,
      title,
      year,
      tags,
      imdb_rating,
    } = this.props.item;
    return (
      <div {...containerStyles}>
        <div
          className="movie-card"
          style={{
            background: `url(${
              backdrop_path
                ? 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' +
                  backdrop_path
                : fallbackImg
            })`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
          {...cardStyles}
        >
          <div className="movie-card-body" {...cardBodyStyles}>
            <div {...infoContainerStyles}>
              <div className="movie-card-info" {...infoStyles}>
                <div className="movie-card-genres" {...genresStyles}>
                  {tags.filter(tag => tag.category === 'genre').map(tag => (
                    <span {...tagStyles} key={tag.id}>
                      {tag.title}
                    </span>
                  ))}
                </div>
              </div>
              <p className="movie-card-descripiton" {...descriptionStyles}>
                {overview.length > OVERVIEW_LENGTH
                  ? overview.substring(0, OVERVIEW_LENGTH) + '...'
                  : overview}
              </p>
            </div>
            <div className="movie-card-mobile-ratings" {...ratingsMobileStyles}>
              <i className="far fa-star" />
              <p>
                {imdb_rating}
                /10
              </p>
            </div>
            <div className="actions-container" {...actionsContainerStyles}>
              <button
                className="like-btn"
                onClick={() => this.props.like(this.props.item)}
              >
                <i className="fas fa-thumbs-up" />
              </button>
              <button
                className="dislike-btn"
                onClick={() => this.props.dislike(this.props.item)}
              >
                <i className="fas fa-thumbs-down" />
              </button>
              <div className="movie-card-ratings" {...ratingsStyles}>
                <i className="far fa-star" />
                <p>
                  {imdb_rating}
                  /10
                </p>
              </div>
            </div>
          </div>
        </div>
        <p {...cardTitleStyles}>
          {title} <span {...yearStyles}>{year}</span>
        </p>
      </div>
    );
  };
}
