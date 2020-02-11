import React, { Component } from 'react'
import PropTypes from "prop-types";

export class Detail extends Component {
    static propTypes = {
        id: PropTypes.string,
    }

    _goBack = () => [
        window.history.back()
    ]

    render() {
        return (
            <>
                <div>Detail of {this.props.id}</div>
                <button onClick={this._goBack}>Volver</button>
            </>
        )
    }
}