// task02
import React, { Component } from 'react';

import Header from './components/Header';
import Main from './components/Main';
import MovieCard from './components/MovieCard';

const testData = {
  overview:
    'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: "inception", the implantation of another person\'s idea into a target\'s subconscious.',
  year: '2010',
  id: '9969',
  title: 'Inception',
  imdb_rating: '8.8',
  backdrop_path: '/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg',
  tags: [
    { id: '6', title: 'crime', category: 'genre' },
    { id: '16', title: 'mystery', category: 'genre' },
    { id: '4', title: 'very  timeline', category: 'keyword', type: 'tag' },
    { id: '854', title: 'soldier', category: 'keyword', type: 'tag' },
  ],
};

class App extends Component {
  // Recursive method
  testRender = (n, items) =>
    n === 0
      ? items
      : this.testRender(n - 1, [...items, <MovieCard item={testData} />]);

  render() {
    return (
      <React.Fragment>
        <Header />
        {/* <div style={{ display: 'flex', flexWrap: 'wrap', padding: '20px' }}>
          {this.testRender(100, [])}
        </div> */}
        <Main />
      </React.Fragment>
    );
  }
}

export default App;
