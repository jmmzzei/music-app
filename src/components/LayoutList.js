import React, { Component } from "react"
import { List } from "./List"

export class LayoutList extends Component {
  render() {
    return (
      <main className="columns">
        <section className="column is-half is-offset-one-quarter">
          {this.props.none
             ? <h1 className="title has-text-centered has-text-grey ">NO SIMILAR SONGS AVAILABLES</h1>
            : <List title="SIMILAR TRACKS" iterable={this.props.similar} songList />}
        </section>
      </main>
    )
  }
}
