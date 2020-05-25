import React, { Component } from "react"
import { fetchArtistData } from "../helpers/fetchArtistData"
import {TopSongsStyled} from '../components/TopSongsStyled'

export class TopSongs extends Component {
  state = {
    tracks:"",
    prevArtist: "",
    selectedItem: "",
    success: true
  }
 
  getData = async data => {
    let urlParam = this.props.artist.toLowerCase()
    let response = await fetchArtistData(data, urlParam, 5)
    if (response.success) {
        this.setState({ tracks: response.tracks })
        this.props.onResults({ albums: response.tracks, ...this.props })
      return await new Promise((resolve, reject) => resolve(response.tracks))
    }
  }

  isInSessionStorage = sessionStoraField =>
    sessionStorage[sessionStoraField] ? true : false

  _sessionStoreOrFetch = (sessionStoreField, reqParam) => {
    this.isInSessionStorage(sessionStoreField)
      ?  this.setState({
          fetchedData: JSON.parse(sessionStorage[sessionStoreField]),
      })
      :  this.getData(reqParam).then(res =>
            sessionStorage.setItem(sessionStoreField, JSON.stringify(res.songs)),
        )
  }

  componentDidMount() {
    this.getData("gettoptracks" ).then(res =>
      sessionStorage.setItem("songsData", JSON.stringify(res.tracks)),
    )
  }

  _handleClick = e => {
    this._sessionStoreOrFetch("songsData", "gettoptracks")
  }

  _handleSingleSongClick = e => {
    this.props.onCallback(e)
  }

  render() {
    return (
      <TopSongsStyled 
        handleClick={this._handleClick}
        tracks={this.state.tracks} 
        handleSingleSongClick={this._handleSingleSongClick}
      /> 
    )
  }
}
