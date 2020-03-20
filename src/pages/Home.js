import React, { Component } from 'react'
import { Breadcrumb } from '../components/Breadcumb'
import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { TopSongs } from '../components/TopSongs'
import { SearchBar } from '../components/SearchBar'
import { Card } from '../components/Card'
import { Navbar } from '../components/Navbar'


export class Home extends Component {
  state = {
    results: {},
    songsAndAlbums: {},
    singleSong: ''
  }

  _handleResults = results => {
    this.setState({ results })
    this.props.onResults(this.state)
  }

  _handleSongsAndAlbums = songsAndAlbums => {
    this.setState({ songsAndAlbums })
    this.props.onResults(this.state, { otro: songsAndAlbums })
  }

  _handleSingleSong = song => {
    this.setState({ singleSong: song })
    this.props.onCallback(song)
  }

  render() {
    return (
      <>
        <Navbar />
        <Hero header="FINDER">
          <div className="SearchForm-wrapper">
            <SearchBar
              onResults={this._handleResults}
            />
          </div>
        </Hero>

        {
          Object.keys(this.state.results).length === 0 && this.state.results.constructor === Object
            ? null
            :
            <>
              <p className="title has-text-black has-text-left"> RESULTS FOR: {this.state.results.name.toUpperCase()}</p>
              <Container>
                <Card
                  {...this.state.results}
                />

                <Breadcrumb
                  artists={this.state.results.similar.artist}
                  onResults={this._handleResults}
                />
              </Container>
            </>
        }

        {Object.keys(this.state.results).length === 0 && this.state.results.constructor === Object
          ? null
          :
          <>
            <Container>
              <TopSongs
                quantity={5}
                artist={this.state.results.name}
                onResults={this._handleSongsAndAlbums}
                onCallback={this._handleSingleSong}
              />
            </Container>
          </>
        }

      </>
    )
  }
}