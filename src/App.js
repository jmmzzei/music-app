import React, { Component } from 'react';
import { SearchBar } from './components/SearchBar'
import { Card } from './components/Card'
import 'bulma/css/bulma.css'
import './App.css'
// import './assets/css/fonts.css';
import { Breadcrumb } from './components/Breadcumb'
import { Hero } from './components/Hero'
import { Container } from './components/Container'
import { TopSongs } from './components/TopSongs'
import { Detail } from './pages/Detail'

class App extends Component {
  state = {
    results: {},
    songsAndAlbums: {}
  }

  _handleResults = results => {
    this.setState({ results })
  }

  _handleSongsAndAlbums = songsAndAlbums => {
    this.setState({ songsAndAlbums })
  }

  render() {

    const url = new URL(document.location)
    const hasID = url.searchParams.has('id')
    
    if (hasID) {
      return <Detail id={url.searchParams.get('id')} />
    }

    return (
      <div className="App">
        <Hero>
          <div className="SearchForm-wrapper">
            <SearchBar
              onResults={this._handleResults}
            />
          </div>
        </Hero>
        {Object.keys(this.state.results).length === 0 && this.state.results.constructor === Object
          ? null
          :
          <>
            <p className="title has-text-grey has-text-left"> RESULTS FOR: {this.state.results.name.toUpperCase()}</p>
            <Container>
              <TopSongs
                artist={this.state.results.name}
                onResults={this._handleSongsAndAlbums}
              />
            </Container>
          </>
        }
        <Container>
          {Object.keys(this.state.results).length === 0 && this.state.results.constructor === Object
            ? null
            :
            <>
              <Card
                {...this.state.results}
                {...this.state.songsAndAlbums}
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
