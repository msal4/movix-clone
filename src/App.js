// task02
import React, { Component } from 'react';
import { css } from 'glamor';

import Header from './components/Header';
import Main from './components/Main';

const appStyles = css({
  width: '100%',
  height: '100%',
});

class App extends Component {
  render() {
    return (
      <div id="App" {...appStyles}>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
