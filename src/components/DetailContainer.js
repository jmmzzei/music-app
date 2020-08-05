import React, { Component } from "react"
import { List } from "../components/List"

export class DetailContainer extends Component {
  render() {
    return (
      <main className="columns">
        <article className="column">
          <img
            src={this.props.img}
            className="is-block is-centered image"
            alt="artist"
          />
          <section className="box">
            <p className="title">{this.props.listeners} LISTENERS</p>
          </section>
          <List iterable={this.props.similar} title="RELATED ARTISTS" />
        </article>

        <article className="column is-half">
          <section className="box">
            <p className="title">BIO</p>
            <p className="has-text-left">{this.props.bio}</p>
          </section>
        </article>

        <article className="column">
          <List iterable={this.props.tracks} title="TOP SONGS" songList />
        </article>
      </main>
    )
  }
}
