import React from 'react';
import { css } from 'glamor';

const fallbackImg =
  'http://nonton01.online/wp-content/uploads/2017/05/bbXyknvBVwbdjz4nWJXHfbptBgi-185x278.jpg';

const styles = css({
  width: '100px',
});

const Movie = props => <div>{props.item.title}</div>;

const Likes = props => {
  const imgUrl = this.props.movie.backdrop_path
    ? 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' +
      this.props.movie.backdrop_path
    : fallbackImg;
  return (
    <div id="likes" {...styles}>
      {props.items.map(item => (
        <Movie item={imgUrl} />
      ))}
    </div>
  );
};

export default Likes;
