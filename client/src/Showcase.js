import React, { Component } from 'react';
import Slider from "react-slick";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './vendor/slick/slick.css'
import './vendor/slick/slick-theme.css'

class Showcase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      art: [],
      artist: {}
    }
  }
  
  componentDidMount = () => {
    const { artistId } = this.props;
    
    fetch('/artist/details?id=' + artistId)
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        this.setState({ artist: resp.artist});
      })
      .catch(console.log);
    
    fetch('/art/byArtist?id=' + artistId)
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        this.setState({ art: resp.arts});
      })
      .catch(console.log);
  }

  render() {
    const { art, artist } = this.state;
    const { showArtist } = this.props;
    const sliderSettings = {
      arrows: true,
      dots: true,
      infinite: true,
      variableWidth: true
    };
    
    return (
      <div className="showcase-container">
        {showArtist && 
        <div className="showcase-bio">
          <Link to={"/artist/" + artist.id} className="showcase-bio-name"><h1>{artist.name}</h1></Link>
          <p>{artist.bio}</p>
        </div>
        }
        <div className={`showcase-carousel ${showArtist ? '' : 'showcase-no-artist'}`}>
          <Slider {...sliderSettings}>
            {art.map(art => {
              return (
              <Link to={`/art/${art.id}`}>
                <div className="showcase-img-container" key={art.id}>
                  <img className="showcase-img" src={process.env.PUBLIC_URL + art.picture_link}  />
                  <div className="showcase-img-name">{art.name}</div>
                  <div className="div">${art.price}</div>
                </div>
              </Link>
            )})}
          </Slider>
        </div>
      </div>
    );
  }
}

Showcase.propTypes = {
    artistId: PropTypes.number.isRequired,
    showArtist: PropTypes.bool.isRequired, 
}

export default Showcase;
