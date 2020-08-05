import React, { Component } from "react"

export class Title extends Component {
  render() {
    return <section className="title">{this.props.children}</section>
  }
}
