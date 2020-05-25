import React, { Component } from "react"
import PropTypes from "prop-types"
import { Hero } from "../components/Hero"
import { DetailContainer } from "../components/DetailContainer"
import { Navbar } from "../components/Navbar"
import { Tags } from "../components/Tags"
import { Loading } from "../components/Loading"
import { fetchArtistData } from "../helpers/fetchArtistData"
import { MessageNotFound } from "../components/MessageNotFound"

export class Artist extends Component {
  state = {
    tracks: {},
    albums: {},
    artist: {},
    success: true,
  }

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
      isExact: PropTypes.bool,
      path: PropTypes.string,
      url: PropTypes.string,
    }),
  }

  getData = async data => {
    let urlParam = this.props.match.params.artist.toLowerCase()
    let response = await fetchArtistData(data, urlParam)
    if (response.success) {
      if (data === "gettoptracks") this.setState({ tracks: response.tracks })
      else if (data === "getinfo") this.setState({ artist: response.artist })
    }
  }

  componentDidMount() {
    this.getData("gettoptracks")
    this.getData("getinfo")
  }

  componentDidUpdate(previousProps) {
    const currentSearch = this.props.location.pathname
    const previousSearch = previousProps.location.pathname
    if (currentSearch !== previousSearch) {
      this.getData("gettoptracks")
      this.getData("getinfo")
    }
  }

  render() {
    return (
      <>
        <Navbar hasButton />
        {this.state.success ? (
          this.state.tracks.length && this.state.artist.name ? (
            <>
              <Hero small artist={this.state.artist.name.toUpperCase()}>
                <Tags elements={this.state.artist.tags.tag} />
              </Hero>
              <DetailContainer
                bio={this.state.artist.bio.content}
                listeners={this.state.artist.stats.listeners}
                img={this.state.artist.image[4]["#text"]}
                tags={this.state.artist.tags.tag}
                similar={this.state.artist.similar.artist}
                tracks={this.state.tracks}
              />
            </>
          ) : (
            <Loading />
          )
        ) : (
          <MessageNotFound />
        )}
      </>
    )
  }
}
