import React, { Component } from "react"
import { SearchBarStyled } from "../components/SearchBarStyled"

export class SearchBar extends Component {
  state = {
    inputArtist: "",
    loading: false,
  }

  _handleChange = e => {
    this.setState({ inputArtist: e.target.value.toUpperCase() })
  }

  _handleSubmit = async e => {
    e.preventDefault()
    if (this.state.inputArtist) {
      sessionStorage && sessionStorage.clear()

      sessionStorage.setItem("input", this.state.inputArtist)
      this.setState({ loading: true })

      if (this.state.inputArtist.length !== 0) {
        await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${this.state.inputArtist}&api_key=${process.env.REACT_APP_API_KEY}&format=json`,
        )
          .then(res => res.json())
          .then(res => {
            console.log(res.artist)
            if (res.error) {
              this.props.onResults({})
            } else {
              this.props.onResults(res.artist)
            }
          })
        await this.setState({ inputArtist: "", loading: false })
      }
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
