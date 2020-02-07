import React, { Component } from 'react';
import { Title } from './components/Title'
import { SearchBar } from './components/SearchBar'
import { Card } from './components/Card'
import 'bulma/css/bulma.css'
import './App.css';

class App extends Component {
  state = {
    results: []
  }

  _handleResults = results => {
    this.setState({ results: [results] })
  }

  render() {
    console.log(this.state.results)
    return (
      <div className="App">
        <Title>
          Artist Finder
      </Title>
        <div className="SearchForm-wrapper">
          <SearchBar onResults={this._handleResults} />
        </div>
        {typeof this.state.results === 'undefined'
          ? null
          : this.state.results.map(e => (
            <Card
              key={e.mbid}
              {...e}
            />)
          )
        }
      </div>
    )
  }
}

export default App;
