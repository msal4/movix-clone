import React from 'react';
import { css } from 'glamor';

const headerStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  boxSizing: 'border-box',
  padding: '0 20px',
  width: '100%',
  height: '100px',
  backgroundColor: '#f0f0f0',
  '& #filter-toggle': {
    display: 'none',
    '&:checked + .toggle-label': {
      backgroundColor: '#836890',
      color: '#fff',
      boxShadow: '2px 2px 10px rgba(100, 100, 100, .5)',
    },
  },
  '& .toggle-label': {
    padding: '9.5px 11px',
    borderRadius: '50%',
    color: '#836890',
    boxShadow: '2px 2px 8px rgba(100, 100, 100, .2)',
    transition: 'all .2s',
  },
});

const searchStyles = css({
  position: 'relative',
  display: 'flex',
  width: '600px',
  alignItems: 'center',
  margin: '20px',
  overflow: 'hidden',
  borderRadius: '52px',
  transition: 'all .5s',
  boxShadow: '2px 2px 8px rgba(100, 100, 100, .2)',
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

const searchInputStyles = css({
  background: 'none',
  border: 'none',
  boxShadow: 'none',
  backgroundColor: '#f2f2f2',
  width: '100%',
  height: '100%',
  fontSize: '1rem',
  padding: '10px 20px',
  transition: 'all .5s',
  '&:focus': {
    outline: 'none',
    background: '#fff',
  },
});

const logoStyles = css({
  color: '#f2f2f2',
  fontWeight: '600',
  fontSize: '1.65rem',
  backgroundColor: '#2778AA',
  padding: '5px',
  boxShadow: '2px 2px 10px rgba(100, 100, 100, .5)',
  // borderRadius: '50%',
});

class Header extends React.Component {
  handleFilter = checkbox => {
    let panel = document.querySelector('.filter-panel');
    checkbox.target.checked
      ? (panel.className = 'filter-panel show')
      : (panel.className = 'filter-panel hide');
  };

  render = () => (
    <div id="header" {...headerStyles} onClick={this.hideFilterPanel}>
      <a href="/" {...logoStyles}>
        Movix
      </a>
      <div {...searchStyles}>
        <input type="text" {...searchInputStyles} placeholder="Search Movix" />
        <i className="fas fa-search" />
      </div>
      <input
        type="checkbox"
        id="filter-toggle"
        onChange={this.handleFilter}
        // {...filterToggleStyles}
      />
      <label className="toggle-label" htmlFor="filter-toggle">
        <i className="fas fa-filter" />
      </label>
    </div>
  );
}
export default Header;
