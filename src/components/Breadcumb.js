import React, { Component } from "react";
import {Title} from './Title'
import {Link} from 'react-router-dom'

export class Breadcrumb extends Component {
      render() {
        return (
          <nav className="breadcrumb is-centered" aria-label="breadcrumbs">
            <Title>Related Artists</Title>
            <ul>
              {this.props.artists.map((e) => (
                <li key={e.name} onClick={this.handleClick}>
                  <Link to={`/artist/${e.name}`}>{e.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        );
         }
       }
