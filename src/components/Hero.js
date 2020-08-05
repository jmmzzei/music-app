import React, { Component } from "react"

export class Hero extends Component {
  render() {
    return (
      <article
        className={`mb hero has-text-centered is-black ${
          this.props.small ? "is-small" : "is-medium"
        }`}
      >
        <main className="hero-body">
          <section className="container">
            <h1 className="title is-1 has-text-centered">
              {this.props.header || ""}
            </h1>
            <h1 className="title mb is-1 has-text-weight-bold">
              {this.props.artist && this.props.artist}
            </h1>
            <section className="center">{this.props.children}</section>
          </section>
        </main>
      </article>
    )
  }
}
