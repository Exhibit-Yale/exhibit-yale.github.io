import React, { Component } from 'react';
import ArtistLandingPage from './ArtistLandingPage';
import ArtPage from './ArtPage';

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
      this.setState({ art: resp.art});
    })
    .catch(err => console.log(err));
  }

  // componentDidUpdate = (prevProps, prevState) => {
  //   console.log('componentDidUpdate');
  //   const { email, isLoggedIn } = this.state;
  //   if (isLoggedIn && !prevState.isLoggedIn) {
  //     fetch('/tasks?email=' + email)
  //     .then(resp => resp.json())
  //     .then(resp => {
  //       console.log(resp);
  //       this.setState({ tasks: resp.tasks.sort(this.preferCompletion) });
  //     })
  //     .catch(err => console.log(err));
  //   }
  // }
  createTask = (event) => {
    // event.preventDefault();
    // const { email, tasks } = this.state;
    // const taskName = document.querySelector('.createTask .name').value;
    // const taskDescription = document.querySelector('.createTask .description').value;
    // const collaborators = [1,2,3].map(num => document.querySelector('.createTask .collaborator' + num).value).filter(email => email !== '');
    // 
    // fetch('/tasks/create', {
    //   body: JSON.stringify({ taskName, taskDescription, collaborators, creator: email }),
    //   headers: { 'content-type': 'application/json' },
    //   method: 'POST'
    // })
    // .then(resp => resp.json())
    // .then(resp => {
    //   console.log(resp);
    //   if (!resp.error) {
    //     this.setState({
    //       tasks: [...tasks, { id: resp.id, name: taskName, completed: false, isCreator: true }],
    //       showCreateTaskError: false,
    //       createTaskError: ''
    //     })
    //   }
    //   else {
    //     this.setState({
    //       showCreateTaskError: true,
    //       createTaskError: resp.error
    //     });
    //   }
    // })
    // .catch(err => this.setState( { showCreateTaskError: true, createTaskError: 'Server error' } ));
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
          <ArtistLandingPage /> : 
          (<div>This is the consumer landing page</div>)
        }
      </div>
    )
;
  }
}

export default App;
