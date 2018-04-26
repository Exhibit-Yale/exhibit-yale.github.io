import React, { Component } from 'react';

class TransactionPage extends Component {
  // artId = {id: str}, artistId = {id: str}
  constructor(props) {
    super(props);
    this.state = {
      child: 0,
      art: {},
      artist: {}
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
    fetch('/artist/details?id=' + this.props.artistId)
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
      this.setState({ artist: resp.artist});
    })
    .catch(err => console.log(err));
  }

  handleChildCompletion = (value) => {
      this.setState({child: value})
  }

  renderProgress = (state) => {
    switch(state) {
        case 0:
            return <FirstPage onCompletion={this.handleChildCompletion}/>;
        case 1:
            return <SecondPage onCompletion={this.handleChildCompletion}/>;
        case 2:
            return <ThirdPage />;
        default:
            return null;
    }
  }

  render() {
    return (
      <div>
        <section className="hero text-center bg-light">
          <div className="container">
          {this.renderProgress(this.state.child)}
          </div>
        </section>
      </div>
    );
  }

}

class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      phone: '',
      venmo: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (type, event) => {
     this.setState({[type]: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    // TODO
    // console.log(this.state)
    // fetch('/transaction/add', { 
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({email: this.state.email, phone: this.state.phone, venmo: this.state.venmo})
    //   })
    // .then(resp => {
    //   console.log(resp);
    //   this.props.OnCompletion(true);
    // })
    // .catch(err => console.log(err));
    this.props.onCompletion(1);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <div className="form-row">
          <label value="Email" />
          <input type="email" className="form-control form-control-lg" placeholder="yalie@yale.edu" value={this.state.email} onChange={(event) => this.handleChange('email', event)} />
        </div>
        <div className="form-row">
        <label value="Phone" />
          <input type="text" className="form-control form-control-lg" placeholder="999-999-9999" value={this.state.phone} onChange={(event) => this.handleChange('phone', event)} />
        </div>
        <div className="form-row">
        <label value="Venmo Handle" />
          <input type="text" className="form-control form-control-lg" placeholder="@yalie123" value={this.state.venmo} onChange={(event) => this.handleChange('venmo', event)} />
        </div>
        <button type="submit" className="btn btn-block btn-lg btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

class SecondPage extends Component {
  constructor(props) {
    super(props);
  }

  onSchedule = (event) => {
    //TODO 
    this.props.onCompletion(2);
  }

  render() {
    return (
      <div>
        <a onClick={this.onSchedule} href="https://www.meetingbird.com/l/JohnAmadeo/Art-pickup-test" target="_blank">Schedule a pickup time!</a>
      </div>
    );
  }
}

class ThirdPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Thanks! We will contact you shortly!</p>
      </div>
    );
  }
}
export default TransactionPage;
