import React, {Component} from 'react'
import { ButtonToHome } from "../components/ButtonToHome"

export class NotFound extends Component {
  render() {
    return (
      <section>
        <h1>404!</h1>
        <h3>Not Found</h3>
        <ButtonToHome />
      </section>
    );
  }
}
