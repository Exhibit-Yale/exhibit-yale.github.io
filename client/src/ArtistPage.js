import React, { Component } from 'react';

class ArtistPage extends Component {
  // artId = {id: str}
  constructor(props) {
    super(props);
    //art = this.props.art;
    // // TODO test
    // art.picture = 'https://photos-4.dropbox.com/t/2/AABwPAcQUWbochoMe3-qfxsG7GBnBbbOQ1Hf25Vt3nNNCQ/12/102326941/jpeg/32x32/1/_/1/2/Julia%20Cai%20-%20IMG_1809.jpg/EInuoU8Y1PAQIAcoBw/TpvMZmj-d04gbL8xFePglRuRtNNGv1rHCzn0_OOIrJs?size=32x32&size_mode=5';
    // art.artName = 'untitled';
  }

  componentDidMount = () => {
    console.log('componentDidMount');
    fetch('/artist/details?id=' + this.props.artistId)
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
      this.setState({ art: resp.art, artist: resp.artist});
    })
    .catch(err => console.log(err));
    fetch('/art/byArtist?id=' + this.props.artistId)
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
      this.setState({ arts: resp.arts});
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
                  <img className="img-fluid mb-3" src={this.art.picture} alt=""/>
              </div>
              <div className="col-lg-6">
                <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                  <h5>{this.art.artName}</h5>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
    // TODO add reusable component with artist
  }
}

export default ArtistPage;
