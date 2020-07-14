import React,{Component} from 'react'
import { Link } from "react-router-dom"

export class TopSongsStyled extends Component{
  render(){
    return (
      <nav className="panel">
        <p className="panel-heading">
          TOP SONGS
        </p>
        {this.props.tracks.length <= 1
          ? null
          : this.props.tracks.map((e, i) =>
            {
              return (
                <Link
                  to={`/song/${e.artist.name}/${e.name}`}
                  key={e.mbid}
                  className="panel-block is-active"
                  onClick={this.props.handleSingleSongClick}
                >
                  {e.name.toUpperCase()}
                </Link>
              );
            }
            )}
      </nav>
    );
  }

}
