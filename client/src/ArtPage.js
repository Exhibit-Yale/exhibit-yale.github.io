import React, { Component } from 'react';

class ArtPage extends Component {
  // artId = {id: str}, artistId = {id: str}
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    console.log('componentDidMount');
    fetch('/art/details?id=' + this.props.artId)
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

export default ArtPage;
