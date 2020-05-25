import React, { Component } from "react"
import { Breadcrumb } from "../containers/Breadcumb"
import { Hero } from "../components/Hero"
import { Container } from "../components/Container"
import { TopSongs } from "../containers/TopSongs"
import { SearchBar } from "../containers/SearchBar"
import { Card } from "../components/Card"
import { Navbar } from "../components/Navbar"
import { MessageNotFound } from "../components/MessageNotFound"

export class Home extends Component {
  state = {
    results: {},
    songsAndAlbums: {},
    singleSong: "",
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

  isObjectEmpty = obj => {
    return Object.keys(obj).length === 0
  }

  render() {
    return this.state.results !== {} ? (
      <>
        <Navbar />
        <Hero header="FINDER">
          <SearchBar onResults={this._handleResults} />
        </Hero>

        {this.isObjectEmpty(this.state.results) ? null : (
          <>
            <p className="title has-text-black has-text-left">
              RESULTS FOR: {this.state.results.name.toUpperCase()}
            </p>
            <Container>
              <Card {...this.state.results} />
              <Breadcrumb
                artists={this.state.results.similar.artist}
                onResults={this._handleResults}
              />
              <TopSongs
                quantity={5}
                artist={this.state.results.name}
                onResults={this._handleSongsAndAlbums}
                onCallback={this._handleSingleSong}
              />
            </Container>
          </>
        )}
      </>
    ) : (
      <MessageNotFound />
    )
  }
}
