import React, { Component } from "react"
import { Title } from "./Title"

export class BreadcumbStyle extends Component {
  render() {
    return (
      <nav className="breadcrumb is-centered" aria-label="breadcrumbs">
        <Title>Related Artists</Title>
        <ul>
          {this.props.artists.map(e => (
            <li key={e.name} onClick={this._handleClick}>
              <a href="#">{e.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    )
  }
}
