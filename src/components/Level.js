import React, { Component } from "react"
import { timeConverter } from "../helpers/timeConverter"

export class Level extends Component {
  render() {
    return (
      <>
        <h1 className="title mt has-text-centered">{this.props.info}</h1>
        <nav className="level">
          <section className="level-item has-text-centered">
            <div>
              <p className="heading">ARTIST</p>
              <p className="title">{this.props.artist}</p>
            </div>
          </section>
          <section className="level-item has-text-centered">
            <div>
              <p className="heading">ALBUM</p>
              <p className="title">{this.props.album}</p>
            </div>
          </section>
          <section className="level-item has-text-centered">
            <div>
              <p className="heading">DURATION</p>
              <p className="title">{timeConverter(this.props.duration)}min</p>
            </div>
          </section>
          <section className="level-item has-text-centered">
            <div>
              <p className="heading">LISTENERS</p>
              <p className="title">{this.props.listeners}</p>
            </div>
          </section>
        </nav>
      </>
    )
  }
}
