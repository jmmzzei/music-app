import React, { Component } from "react"
import { SearchBarStyled } from "../components/SearchBarStyled"
import {fetchArtistData} from '../helpers/fetchArtistData'

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
        let response = await fetchArtistData("getinfo", this.state.inputArtist)  
        if(response.success) {
          this.props.onResults(response.artist)
        } else {
          this.props.onResults({})
        }
        this.setState({ inputArtist: "", loading: false })
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
