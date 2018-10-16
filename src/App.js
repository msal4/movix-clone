// task02
import React, { Component } from 'react';
import { css } from 'glamor';

import Header from './components/Header';
import MoviesList from './components/MoviesList';
import Footer from './components/Footer';

const styles = css({
  width: '100%',
  height: '100%',
});

class App extends Component {
  render() {
    return (
      <div id="App" {...styles}>
        <Header />
        <MoviesList />
        <Footer />
      </div>
    );
  }
}

export default App;
