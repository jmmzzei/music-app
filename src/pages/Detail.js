import React, { Component } from 'react'
import PropTypes from "prop-types";

export class Detail extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.object,
            isExact: PropTypes.bool,
            path: PropTypes.string,
            url: PropTypes.string,
        }),
    }

    _goBack = () => [
        window.history.back()
    ]

    render() {
        return (
            <>
                <div>Detail of {this.props.match.params.id}</div>
                <button onClick={this._goBack}>Volver</button>
            </>
        )
    }
}