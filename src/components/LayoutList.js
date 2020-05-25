import React, { Component } from "react"
import { List } from "./List"

export class LayoutList extends Component {
  render() {
    return (
      <main className="columns">
        <section className="column is-half is-offset-one-quarter">
          <List title="SIMILAR TRACKS" iterable={this.props.similar} songList />
        </section>
      </main>
    )
  }
}
