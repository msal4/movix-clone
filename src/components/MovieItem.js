import React from 'react';
import { css } from 'glamor';

const fallbackImg =
  'http://nonton01.online/wp-content/uploads/2017/05/bbXyknvBVwbdjz4nWJXHfbptBgi-185x278.jpg';

const styles = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  width: '185px',
  height: '278px',
  margin: '0 15px 15px 0',
  borderRadius: '5px',
  '& .info': {
    background: 'rgba(20, 20, 20, .5)',
    '& .title': {
      margin: '0',
      padding: '0',
      color: '#f3f3f3',
      textAlign: 'center',
    },
  },
  '& .actions': {
    display: 'flex',
  },
});

export default class MovieItem extends React.Component {
  constructor() {
    super();
    this.state = { liked: false, disliked: false };
  }

  like = () => {
    this.props.like(this.props.movie, this.state.liked);
    this.setState({ liked: !this.state.liked });
  };

  dislike = () => {
    this.props.dislike(this.props.movie, this.state.disliked);
    this.setState({ disliked: !this.state.disliked });
  };

  render = () => {
    return (
      <div
        className="item"
        style={{
          background: `url(${
            this.props.movie.backdrop_path
              ? 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' +
                this.props.movie.backdrop_path
              : fallbackImg
          })`,
        }}
        {...styles}
      >
        <div className="info">
          <h3 className="title">{this.props.movie.title}</h3>
        </div>
        <div className="actions">
          <button className="like" onClick={this.like}>
            Like
          </button>{' '}
          <button className="dislike" onClick={this.dislike}>
            Dislike
          </button>
        </div>
      </div>
    );
  };
}
