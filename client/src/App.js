import React, { Component } from 'react';
import ArtistLandingPage from './ArtistLandingPage';
import ArtPage from './ArtPage';
import ConsumerLandingPage from './ConsumerLandingPage';
import ArtistPage from './ArtistPage';

import './vendor/bootstrap/css/bootstrap.min.css'
import './vendor/font-awesome/css/font-awesome.min.css'
import './vendor/simple-line-icons/css/simple-line-icons.css'
import './App.css';
import './landing-page.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audience: 'artist', // ['artist', 'patron']
      art: [] // [{ id: str, artistName: str, pfp: str (link), picture: str (link), is_available: bool }]
    }
  }

  componentDidMount = () => {
    console.log('componentDidMount');
  //   const { email, isLoggedIn } = this.state;
    fetch('/art')
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
      this.setState({ arts: resp.arts});
    })
    .catch(err => console.log(err));
  }
  
  toggleAudience = () => {
    const { audience } = this.state;
    this.setState({
      audience: audience === 'artist' ? 'patron' : 'artist'
    });
  }

  render() {
    const { audience } = this.state;
    return (
      <div>
        <nav className="navbar navbar-light bg-light static-top">
          <div className="container">
            <a className="navbar-brand" href="#"><span className="company-name">Exhibit</span></a>
            <div className="audience-toggle">
              <a className="" href="#" onClick={this.toggleAudience} style={{ fontWeight: audience === 'artist' ? '600' : '' }}>Artists</a>
              <a className="" href="#" onClick={this.toggleAudience} style={{ fontWeight: audience === 'patron' ? '600' : '' }}>Patrons</a>
            </div>
          </div>
        </nav>
        {audience === 'artist' ? 
          <ArtistLandingPage /> : <ConsumerLandingPage />
        }
      
        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 h-100 text-center text-lg-left my-auto">
                <ul className="list-inline mb-2">
                  <li className="list-inline-item">
                    <a href="mailto:tevin@mickens.yale.edu" target="_blank">Talk to Us!</a>
                  </li>
                </ul>
                <p className="mb-4 mb-lg-0">&copy; Exhibit 2018. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </footer>

        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
      </div>
    )
;
  }
}

export default App;
