import React, { Component } from 'react';
import Showcase from './Showcase';

class ArtistPage extends Component {
  // artId = {id: str}
  constructor(props) {
    super(props);
    this.state = {
      artist: {}
    }
  }

  componentDidMount = () => {
    console.log('componentDidMount');
    fetch('/artist/details?id=' + this.props.artistId)
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
      this.setState({ artist: resp.artist});
    })
    .catch(err => console.log(err));
  }

  render() {
    const { artist } = this.state;
    const { artistId } = this.props;
    return (
      <div className="artist-page">
        <section className="artist-page-hero hero text-center bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                  <img className="img-fluid mb-3" src={artist.pfp}/>
              </div>
              <div className="artist-page-title col-lg-6">
                <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                  <h1 className="artist-page-name">{artist.name}</h1>
                </div>
                <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                  <h5>{artist.bio}</h5>
                { 
                  artist.insta && 
                  artist.insta.length > 0 && 
                  (<h5>Instagram: {artist.insta}</h5>)
                }
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="art-page-showcase">
          <Showcase artistId={artistId} showArtist={false} />
        </div>
      </div>
    );

  }
}

export default ArtistPage;
