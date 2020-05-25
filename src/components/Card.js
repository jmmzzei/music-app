import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Tags } from "../components/Tags"

export class Card extends Component {
  static propTypes = {
    name: PropTypes.string,
  }

  render() {
    return (
      <Link to={`/artist/${this.props.name}`} className="card">
        <main className="card card-content">
          <section className="media">
            <section className="media-left">
              <figure className="image is-48x48">
                <img src={this.props.image[1]["#text"]} alt="Placeholder" />
              </figure>
            </section>
            <section className="media-content">
              <p
                target="_blank"
                rel="noopener noreferrer"
                className="title is-3 has-text-weight-medium"
              >
                {this.props.name}
              </p>
            </section>
          </section>
          <Tags elements={this.props.tags.tag} />
          <hr />
          <section className="content">{this.props.bio.summary}</section>
        </main>
      </Link>
    )
  }
}
