import React from 'react';
import { css } from 'glamor';

const headerStyles = css({
  width: '100%',
  height: '100px',
  backgroundColor: '#f2f2f2',
  display: 'flex',
  alignItems: 'center',
});

const searchContainerStyles = css({
  flex: '1',
});

const inputStyles = css({
  width: '100%',
});

const Header = () => (
  <div id="header" {...headerStyles}>
    <a href="/">Movix</a>
    <div {...searchContainerStyles}>
      <input type="text" {...inputStyles} />
    </div>
  </div>
);

export default Header;
