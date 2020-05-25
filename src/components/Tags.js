import React, { Component } from "react"

export class Tags extends Component {
  render() {
    return (
      <section className="tags is-centered">
        {this.props.elements.map(e => (
          <span key={e.name} className="tag is-primary is-rounded">
            #{e.name}
          </span>
        ))}
      </section>
    )
  }
}
