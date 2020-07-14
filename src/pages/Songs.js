import React, { Component } from "react"
import { Navbar } from "../components/Navbar"
import { Level } from "../components/Level"
import { Loading } from "../components/Loading"
import { fetchSongData } from "../helpers/fetchSongData"
import { LayoutList } from "../components/LayoutList"

export class Song extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: {},
      similar: {},
      loading: true,
    }
  }

  getData = async reqParam => {
    let artistParam = this.props.match.params.artist.toLowerCase()
    let songParam = this.props.match.params.song.toLowerCase()
    let response = await fetchSongData(reqParam, artistParam, songParam)
    this.setState({loading: false})
    if (typeof response == undefined) {
    } else if (reqParam === "getinfo") this.setState({ info: response.info })
    else if (reqParam === "getsimilar")
      this.setState({ similar: response.similar })
  }

  componentDidUpdate(previousProps) {
    const currentSearch = this.props.location.pathname
    const previousSearch = previousProps.location.pathname
    if (currentSearch !== previousSearch) {
      this.getData("getsimilar")
      this.getData("getinfo")
    }
  }

  componentDidMount() {
    this.getData("getsimilar")
    this.getData("getinfo")
  }

  isObjectEmpty = obj => (
    Object.keys(obj).length === 0)

  render() {
    return (
      <>
        <Navbar hasButton />
        {this.isObjectEmpty(this.state.info)
         ? null
         : (
          <Level
            info={this.state.info.name}
            artist={this.state.info.artist.name}
            album={this.state.info.album && this.state.info.album.title}
            duration={this.state.info.duration}
            listeners={this.state.info.listeners}
          />
        )}
        {this.isObjectEmpty(this.state.similar)
        ? <Loading/>
        : (
          <LayoutList similar={this.state.similar} />
        )}
      </>
    )
  }
}
