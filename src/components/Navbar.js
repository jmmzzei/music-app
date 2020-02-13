import React, { Component } from 'react'
import { ButtonToHome } from "./ButtonToHome";

export class Navbar extends Component {
    render() {
        return (
            <nav className="navbar is-black" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <p className="is-primary is-size-3 has-text-weight-bold">FINDER</p>
                    </a>
                </div>

                <div className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            {this.props.hasButton && <ButtonToHome />}
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}