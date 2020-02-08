import React, { Component } from 'react';
import { SearchBar } from './components/SearchBar'
import { Card } from './components/Card'
import 'bulma/css/bulma.css'
import './App.css'
import { Breadcrumb } from './components/Breadcumb'
import { Hero } from './components/Hero'
import { Container } from './components/Container'

class App extends Component {
  state = {
    results: {}
  }

  _handleResults = results => {
    this.setState({ results })
  }

  render() {
    console.log(this.state.results)

    return (
      <div className="App">
        <Hero>
          <div className="SearchForm-wrapper">
            <SearchBar
              onResults={this._handleResults}
            />
          </div>
        </Hero>
        <Container>
          {Object.keys(this.state.results).length === 0 && this.state.results.constructor === Object
            ? null
            :
            <>
              <p className="title has-text-grey"> Results for: {this.state.results.name}</p>
              <Card
                {...this.state.results}
              />
              <Breadcrumb
                artists={this.state.results.similar.artist}
                onResults={this._handleResults}
              />
            </>
          }
        </Container>
      </div>
    )
  }
}

export default App;
