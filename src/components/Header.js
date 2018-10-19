import React from 'react';
import { css } from 'glamor';

const headerStyles = css({
  width: '100%',
  height: '100px',
  backgroundColor: 'rgba(40, 40, 70, .9)',
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  padding: '0 20px',
});

const searchContainerStyles = css({
  position: 'relative',
  flex: '1',
  display: 'flex',
  alignItems: 'center',
  marginLeft: '20px',
  overflow: 'hidden',
  borderRadius: '52px',
  transition: 'all .5s',
  '& i': {
    position: 'absolute',
    right: '20px',
    top: '50%',
    transform: 'translate(0, -50%)',
    textAlign: 'center',
    fontSize: '1.3rem',
    color: 'gray',
  },
});

const inputStyles = css({
  background: 'none',
  border: 'none',
  boxShadow: 'none',
  backgroundColor: '#e0e0e0',
  width: '100%',
  height: '100%',
  fontSize: '1.4rem',
  padding: '10px 20px',
  transition: 'all .7s',
  '&:focus': {
    outline: 'none',
    background: '#fff',
  },
});

const logoStyles = css({
  color: 'white',
  fontWeight: '600',
  fontSize: '2rem',
  backgroundColor: '#2778AA',
  padding: '5px',
  // borderRadius: '7px',
});

const accountStyles = css({
  width: '42px',
  height: '42px',
  background: '#f2f2f2',
  marginLeft: '20px',
  borderRadius: '50%',
});

const Header = () => (
  <div id="header" {...headerStyles}>
    <a href="/" {...logoStyles}>
      Movix
    </a>
    <div {...searchContainerStyles}>
      <input type="text" {...inputStyles} placeholder="Search Movix" />
      <i className="fas fa-search" />
    </div>
    <div {...accountStyles} />
  </div>
);

export default Header;
