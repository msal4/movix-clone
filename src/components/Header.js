import React from 'react';
import { css } from 'glamor';

const styles = css({
  width: '100%',
  height: '100px',
  backgroundColor: '#f2f2f2',
});

const Header = () => <div id="header" {...styles} />;

export default Header;
