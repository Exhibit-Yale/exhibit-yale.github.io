import React, { Component } from 'react';
import Showcase from './Showcase';

class ArtPage extends Component {
  // artId = {id: str}
  constructor(props) {
    super(props);
    this.artId = this.props.artId
    this.state = {
      art: {}
    }
  }

  componentDidMount = () => {
    console.log('componentDidMount');
    fetch('/art/details?id=' + this.artId)
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
    console.log("render")
    console.log(this.state.art)
    return (
      <div>
        <section className="hero text-center bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                  <img className="img-fluid mb-3" src={this.state.art.art_picture} />
              </div>
              <div className="col-lg-6">
                <div>
                  <h4>{this.state.art.name}</h4>
                </div>
                <div>
                  <h5>{this.state.art.description}</h5>
                </div>
                <div>
                  <h5>Price: ${15 /*TODO fix*/}</h5>
                </div>
                <div className="btn btn-primary sign-up-btn" onClick={this.handleClick}>Buy now!</div>
              </div>
            </div>
          </div>
        </section>
      {this.state.art.artist_id && <Showcase artistId={this.state.art.artist_id} />}
      </div>
    );
  }
}

export default ArtPage;
