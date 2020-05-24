import React, { Component } from "react"
import { Title } from "../components/Title"
import { concatSeries } from "async"
import { BreadcumbStyle } from "../components/BreadcumbStyle"

export class Breadcrumb extends Component {
  state = { inputArtist: "" }

  _handleClick = e => {
    this.setState({ inputArtist: e.target.innerText })
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${e.target.innerText}&api_key=${process.env.REACT_APP_API_KEY}&format=json`,
    )
      .then(res => res.json())
      .then(res => {
        this.props.onResults(res.artist)
      })
  }

  render() {
    return <BreadcumbStyle artists={this.props.artists} />
  }
}
