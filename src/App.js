import React, { Component } from 'react';
import { Title } from './components/Title'
import { SearchBar } from './components/SearchBar'
import 'bulma/css/bulma.css'
import './App.css';

class App extends Component {
  state = {
    results: []
  }

  _handleResults = results => {
    this.setState({ results })
  }

  render() {
    return (
      <div className="App">
        <Title>
          Music Finder
      </Title>
        <div className="SearchForm-wrapper">
          <SearchBar onResults={this._handleResults} />
        </div>
        {this.state.results.length === 0
          ? null
          : this.state.results.map(e => (
            <p key={e.items.id}> {e.name}: {e.popularity}</p>
          ))
        }
      </div>
    )
  }
}

export default App;
