import React, { Component } from 'react';
import {Switch, Route} from 'react-router';
import {Link} from 'react-router-dom';
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
    }
  }

  render() {
    const { audience } = this.state;
    return (
      <div>
        <nav className="navbar navbar-light bg-light static-top">
          <div className="container">
            <a className="navbar-brand" href="#"><span className="company-name">Exhibit</span></a>
            <div className="audience-toggle"> 
              <Link to='/'><span>Artists</span></Link>
              <Link to='/consumer'>Consumers</Link>
            </div>
          </div>
        </nav>

        <Switch>
          <Route exact path='/' component={ArtistLandingPage}/>
          <Route exact path='/consumer' component={ConsumerLandingPage}/>
          <Route path='/art/:id' component={ArtPageRouter}/>
          <Route path='/artist/:id' component={ArtistPageRouter}/>
        </Switch>
      
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
const ArtistPageRouter = (props) => {
  return (<ArtistPage artistId={parseInt(props.match.params.id)} />);
}

const ArtPageRouter = (props) => {
  return (<ArtPage artId={parseInt(props.match.params.id)} />);
}
export default App;
