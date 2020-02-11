import React, { Component } from 'react'
import PropTypes from "prop-types";
import { ButtonToHome } from "../components/ButtonToHome"

export class Detail extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.object,
            isExact: PropTypes.bool,
            path: PropTypes.string,
            url: PropTypes.string,
        }),
    }

    render() {
        return (
            <>
                <div>Detail of {this.props.match.params.id}</div>
                <ButtonToHome />
            </>
        )
    }
}