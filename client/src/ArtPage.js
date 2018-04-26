import React, { Component } from 'react';
import Showcase from './Showcase';

class ArtPage extends Component {
  // artId = {id: str}
  constructor(props) {
    super(props);
    this.state = {
      art: null
    }
  }

  componentDidMount = () => {
    console.log('componentDidMount');
    fetch('/art/details?id=' + this.props.artId)
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
      this.setState({ art: resp.art});
    })
    .catch(err => console.log(err));
  }

  handleClick = (e) => {
    e.preventDefault();
  }

  render() {
    const { art } = this.state;
    return art && 
    (
      <div className="art-page">
        <section className="art-page-hero hero text-center bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                  <img className="img-fluid mb-3" src={art.picture_link} />
              </div>
              <div className="art-page-title col-lg-6">
                <div>
                  <h1>{art.name}</h1>
                </div>
                <div>
                  <h5>{art.description}</h5>
                </div>
                <div>
                  <h5>Price: ${art.price}</h5>
                </div>
                <div className="btn btn-primary sign-up-btn" onClick={this.handleClick}>Buy now!</div>
              </div>
            </div>
          </div>
        </section>
        <div className="art-page-showcase">
          <Showcase artistId={art.artist_id} showArtist/>
        </div>
      </div>
    );
  }
}

export default ArtPage;
