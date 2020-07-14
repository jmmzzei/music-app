import React, {Component} from 'react'
import {fetchArtistData} from '../helpers/fetchArtistData'
import {TopSongsStyled} from '../components/TopSongsStyled'

export class TopSongs extends Component {
  state = {
    artist: '',
    tracks: [{name:''}],
    success: true,
  }

  getTopTracks = async () => {
    let urlParam = this.props.artist.toLowerCase()
    let response = await fetchArtistData('gettoptracks', urlParam, 5)
    if (response.success) {
      console.log(response.tracks)
      this.setState({tracks: response.tracks})
      console.log(this.state.tracks);
      return await new Promise((resolve, reject) => resolve(response.tracks))
    }
  }

  isInsessionStorage = () => {
    let artistData = sessionStorage.getItem('artistData')
      ? JSON.parse(sessionStorage.getItem('artistData'))
      : {}

    if (!artistData[this.props.artist]) return false
     else return artistData[this.props.artist] ? true : false
  }

  findAndAddTosessionStorage = tracks => {
    let artistData = JSON.parse(sessionStorage.getItem('artistData'))

    let artist = {}
    artist[this.props.artist] = {
      ...artistData[this.props.artist],
      topSongs: tracks,
    }
    let result = Object.assign({}, artistData, artist)

    sessionStorage.setItem('artistData', JSON.stringify(result))
  }

  sessionStoreOrFetch = () => {
    // if (this.isInsessionStorage()) {
    //   console.log('is in session storage')
    //   let artistData = JSON.parse(sessionStorage.getItem('artistData'))
    //   console.log(artistData[this.props.artist].topSongs)
    //   this.setState({
    //     tracks: artistData[this.props.artist].topSongs,
    //   })
    // } else {
      console.log('is not, so add it')
      this.getTopTracks().then(tracks => {
        this.findAndAddTosessionStorage(tracks)
      })
    // }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.artist == this.props.artist){
      if(nextState.tracks[0].name != this.state.tracks[0].name){
        this.setState({tracks: nextState.tracks})
        return true
      } else return false
    } else {
      if(nextState.tracks[0].name != this.state.tracks[0].name){
        this.setState({tracks: nextState.tracks})
        return true
      } else return true
    }
  }

  componentDidUpdate() {
    this.sessionStoreOrFetch()
  }

  componentDidMount() {
    this.sessionStoreOrFetch()
  }

  handleSingleSongClic = e => {
    this.props.onCallback(e)
  }

  render() {
    return (
      <TopSongsStyled
        tracks={this.state.tracks}
        handleSingleSongClick={this.handleSingleSongClick}
      />
    )
  }
}
