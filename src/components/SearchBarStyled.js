import React, { Component } from "react"

export class SearchBarStyled extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <main className="field has-addons">
          <section
            className={this.props.loading ? "control is-loading" : "control"}
          >
            <input
              onChange={this.props.handleChange}
              className="input is-radiusless"
              type="text"
              placeholder="Search for an Artist"
              value={this.props.inputArtist}
              autoFocus
            />
          </section>
          <section className="control">
            <button
              className={`button is-warning is-radiusless ${
                this.props.inputArtist.length > 0 ? "" : "is-hidden"
              }`}
            >
              <p className="has-text-weight-bold">SEARCH</p>
            </button>
          </section>
        </main>
      </form>
    )
  }
}
