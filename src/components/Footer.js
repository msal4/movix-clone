import React from 'react';
import { css } from 'glamor';

const footerStyles = css({
  backgroundColor: 'gainsboro',
  boxSizing: 'border-box',
  padding: '15px',
  textAlign: 'center',
  color: 'gray',
  marginTop: '50px',
  borderRadius: '10px 10px 0 0',
  '& a': {
    textDecoration: 'none',
    color: '#836890',
    fontWeight: '700',
  },
});

const Footer = props => (
  <div className="footer" {...footerStyles}>
    <div className="madein">
      Proudly made in
      <a
        href="https://deepsystems.io"
        target="_blank"
        className="ds-link"
        rel="noopener noreferrer"
      >
        <i /> Deep Systems
      </a>{' '}
      <div className="links">
        <a href="mailto:movix@deepsystems.io">Contacts</a>{' '}
        <span className="delim">&nbsp;|&nbsp;</span>{' '}
        <a href="#" onclick="_urq.push(['Feedback_Open'])">
          Feedback
        </a>{' '}
        <span className="delim">&nbsp;|&nbsp;</span>{' '}
        <a href="/about" className="">
          About
        </a>
      </div>
    </div>{' '}
    <div className="social">
      <div data-v-4ff9c15c="" className="social-buttons">
        <a
          data-v-4ff9c15c=""
          target="_blank"
          href="https://twitter.com/intent/tweet?text=Check out Movix - movie recommendations with artificial intelligence inside. No signup: https://movix.ai"
          rel="noopener noreferrer"
        >
          <i data-v-4ff9c15c="" className="zmdi zmdi-twitter" />
        </a>{' '}
        <a
          data-v-4ff9c15c=""
          target="_blank"
          href="https://www.facebook.com/sharer/sharer.php?u=https://movix.ai"
          rel="noopener noreferrer"
        >
          <i data-v-4ff9c15c="" className="zmdi zmdi-facebook" />
        </a>{' '}
        <a
          data-v-4ff9c15c=""
          target="_blank"
          href="http://www.reddit.com/submit?url=https://movix.ai&amp;text=Check out Movix - movie recommendations with artificial intelligence inside. No signup: https://movix.ai"
          rel="noopener noreferrer"
        >
          <i data-v-4ff9c15c="" className="zmdi zmdi-reddit" />
        </a>
      </div>
    </div>{' '}
    <div className="right">
      Special thanks to{' '}
      <a href="https://icons8.com" target="_blank" rel="noopener noreferrer">
        icons8
      </a>{' '}
      and{' '}
      <a
        href="https://www.themoviedb.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Movie DB
      </a>
    </div>{' '}
    <a className="survery-btn">
      <i className="zmdi zmdi-comments" />
    </a>
  </div>
);

export default Footer;
