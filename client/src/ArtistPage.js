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
    return (
      <div>
        <section className="hero text-center bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                  <img className="img-fluid mb-3" src={this.state.artist.pfp}/>
              </div>
              <div className="col-lg-6">
                <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                  <h5>{this.state.artist.name}</h5>
                </div>
                <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                  <h5>{this.state.artist.bio}</h5>
                </div>
                <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                {this.state.artist.insta && this.state.artist.insta.length > 0 && (<h5>Instagram: {this.state.artist.insta}</h5>)}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Showcase artistId={this.props.artistId} />
      </div>
    );

  }
}

export default ArtistPage;
