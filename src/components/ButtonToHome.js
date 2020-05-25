import React, { Component } from "react"
import { Link } from "react-router-dom"

export class ButtonToHome extends Component {
  render() {
    return (
      <Link to="/" className="button is-warning is-radiusless">
        TO HOME
      </Link>
    )
  }
}
