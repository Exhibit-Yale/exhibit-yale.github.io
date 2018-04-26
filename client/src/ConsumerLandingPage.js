import React, { Component } from 'react';
import TransactionPage from './TransactionPage';
import Showcase from './Showcase';

class ConsumerLandingPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      artists: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    console.log('componentDidMount');
    fetch('/artist')
      .then(resp => resp.json())
      .then(resp => {
        this.setState({ artists: resp.artists });
      })
      .catch(console.log)
  }
  
  handleChange(event) {
    this.setState({email: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    // save email
    console.log(this.state.email)
    fetch('/consumer/add', { 
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: this.state.email})
      })
    .then(resp => {
      console.log(resp);
      this.setState({ email: ''});
    })
    .catch(err => console.log(err));
  }

  render() {
    const { artists } = this.state;
    return (
      <div>
        <header className="masthead text-white text-center">
          <div className="overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-xl-9 mx-auto">
                <p className="mb-5 slogan">art from Yalies for Yalies</p>
                <p className="mb-5 slogan-subtext">find the perfect picture and support your Yale community</p>
              </div>
              <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-row">
                    <div className="col-12 col-md-9 mb-2 mb-md-0">
                      <input type="email" className="form-control form-control-lg" placeholder="Enter your email..." value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="col-12 col-md-3">
                      <button type="submit" className="btn btn-block btn-lg btn-primary update-btn">Update me!</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </header>

        <div className="artist-container">
          {artists.map(artist => (
            <div key={artist.id}>
              <Showcase artistId={artist.id} showArtist />
            </div>
          ))}
        </div>

        <section className="testimonials text-center bg-light">
          <div className="container">
            <h2 className="mb-5">Meet our team!</h2>
            <div className="row">
              <div className="col-lg-3">
                <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                  <img className="img-fluid rounded-circle mb-3" src={process.env.PUBLIC_URL + '/tevin.jpg'} alt=""/>
                  <h5>Tevin Mickens</h5>
                  <p className="font-weight-light mb-0">Yale 18. Computing & the Arts.</p>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                  <img className="img-fluid rounded-circle mb-3" src={process.env.PUBLIC_URL + '/fatima.jpg'} alt=""/>
                  <h5>Fatima Kahbi</h5>
                  <p className="font-weight-light mb-0">Yale 19. Computer Science.</p>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                  <img className="img-fluid rounded-circle mb-3" src={process.env.PUBLIC_URL + '/john.jpg'} alt=""/>
                  <h5>John Amadeo</h5>
                  <p className="font-weight-light mb-0">Yale 19. Computer Science.</p>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                  <img className="img-fluid rounded-circle mb-3" src={process.env.PUBLIC_URL + '/ryan_lim.jpg'} alt=""/>
                  <h5>Ryan Lim</h5>
                  <p className="font-weight-light mb-0">Yale 19. Physics.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ConsumerLandingPage;
