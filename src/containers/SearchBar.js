import React, {Component} from 'react'
import {SearchBarStyled} from '../components/SearchBarStyled'
import {fetchArtistData} from '../helpers/fetchArtistData'

export class SearchBar extends Component {
  state = {
    inputArtist: '',
    loading: false,
  }

  _handleChange = e => {
    this.setState({inputArtist: e.target.value.toUpperCase()})
  }

  _handleSubmit = async e => {
    e.preventDefault()
    if (this.state.inputArtist !== 0) {
      this.setState({loading: true})

      let searchedArtists = sessionStorage.getItem('artistData')
        ? JSON.parse(sessionStorage.getItem('artistData'))
        : {}

      if (searchedArtists[this.state.inputArtist]){
        this.props.onResults(searchedArtists[this.state.inputArtist])

      } else {
        let response = await fetchArtistData('getinfo', this.state.inputArtist)
        if (response.success) {
          this.props.onResults(response.artist)
          searchedArtists[this.state.inputArtist] = response.artist
          sessionStorage.setItem('artistData', JSON.stringify(searchedArtists))
        } else {
          this.props.onResults({})
        }
      }
      this.setState({inputArtist: '', loading: false})
    }
  }

  render() {
    return (
      <SearchBarStyled
        loading={this.state.loading}
        handleSubmit={this._handleSubmit}
        handleChange={this._handleChange}
        inputArtist={this.state.inputArtist}
      />
    )
  }
}
