import React, { Component } from 'react';
import Viewer_Queue_Component from './Viewer_Queue_Component';
import { Grid, Button, Row, Col, Panel, tr, td } from 'react-bootstrap';

class Viewer_Artist_Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist_name: undefined,
      artist_description: undefined,
      album_covers: undefined,
      ar_id: undefined
    };
  }

  componentWillMount(){
    let artist_name = this.props.artist_name;
    let artist_description = this.props.artist_description;
    let album_covers = this.props.album_covers;
    let ar_id = this.props.ar_id;
    this.setState({
      artist_name: artist_name,
      artist_description: artist_description,
      album_covers: album_covers,
      ar_id: ar_id
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.artist_name !== nextProps.artist_name ||
       this.props.artist_description !== nextProps.artist_description ||
       this.props.album_covers !== nextProps.album_covers ||
       this.props.ar_id !== nextProps.ar_id
       )  {
      this.setState({
        artist_name: nextProps.artist_name,
        artist_description: nextProps.artist_description,
        album_covers: nextProps.album_covers,
        ar_id: nextProps.ar_id
      })
    }
  }

  render() {
      return (
            <div>
            <Grid fluid={true}>
              <h3>{this.state.artist_name}</h3>
              <hr></hr>
              <p>{this.state.artist_description}</p>
              {this.state.album_covers.map(function(d,i) {
                let bla = d.songs;
                  {bla.map(function(s,j) {
                    console.log(s.songName)
                    return(
                      <Viewer_Queue_Component
                                key={j}
                                songID={s.song_key}
                                song={s.songName}
                                artist={s.artistName}
                                artist_id={s.ar_id}
                                duration={s.duration}

                        />
                    );}
                  )}
              })
            }
            </Grid>
            </div>
      );
  }


}

export default Viewer_Artist_Container;
