import React, { Component } from "react"

export class Container extends Component {
  render() {
    return (
      <article className="container">
        <section className="column is-offset-one-quarter is-half">
          {this.props.children}
        </section>
      </article>
    )
  }
}
