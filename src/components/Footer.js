import React from 'react';
import { css } from 'glamor';
const styles = css({
  width: '100%',
  height: '100px',
  backgroundColor: '#F2F2F2',
  marginTop: 'calc(100% - 200px)',
});

const Footer = () => <div id="footer" {...styles} />;

export default Footer;
