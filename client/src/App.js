import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: sessionStorage.getItem('email'),
      isLoggedIn: sessionStorage.getItem('isLoggedIn') ? true : false,
      showLoginError: false,
      loginError: '',
      showRegisterError: false,
      registerError: '',
      showCreateTaskError: false,
      createTaskError: '',
      tasks: [] // [{ id: str, name: str, completed: bool, isCreator: bool }]
    };
  }

  componentDidMount = () => {
    console.log('componentDidMount');
    const { email, isLoggedIn } = this.state;
    if (isLoggedIn) {
      fetch('/tasks?email=' + email)
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        this.setState({ tasks: resp.tasks.sort(this.preferCompletion) });
      })
      .catch(err => console.log(err));
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    console.log('componentDidUpdate');
    const { email, isLoggedIn } = this.state;
    if (isLoggedIn && !prevState.isLoggedIn) {
      fetch('/tasks?email=' + email)
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        this.setState({ tasks: resp.tasks.sort(this.preferCompletion) });
      })
      .catch(err => console.log(err));
    }
  }

  createTask = (event) => {
    event.preventDefault();
    const { email, tasks } = this.state;
    const taskName = document.querySelector('.createTask .name').value;
    const taskDescription = document.querySelector('.createTask .description').value;
    const collaborators = [1,2,3].map(num => document.querySelector('.createTask .collaborator' + num).value).filter(email => email !== '');

    fetch('/tasks/create', {
      body: JSON.stringify({ taskName, taskDescription, collaborators, creator: email }),
      headers: { 'content-type': 'application/json' },
      method: 'POST'
    })
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
      if (!resp.error) {
        this.setState({
          tasks: [...tasks, { id: resp.id, name: taskName, completed: false, isCreator: true }],
          showCreateTaskError: false,
          createTaskError: ''
        })
      }
      else {
        this.setState({
          showCreateTaskError: true,
          createTaskError: resp.error
        });
      }
    })
    .catch(err => this.setState( { showCreateTaskError: true, createTaskError: 'Server error' } ));
  }

  deleteTask = (taskId, event) => {
    event.preventDefault();
    const { tasks } = this.state;

    fetch('/tasks/delete?id=' + taskId)
    .then(resp => resp.json())
    .then(resp => {
      this.setState({ tasks: tasks.filter(task => task.id !== taskId).sort(this.preferCompletion) });
    })
    .catch(err => console.log(err));
  }

  toggleTaskStatus = (taskId, event) => {
    event.preventDefault();
    const { tasks } = this.state;
    let task = tasks.find(task => task.id === taskId);
    console.log(!task.completed);

    fetch('/tasks/toggle?id=' + taskId + '&completed=' + !task.completed)
    .then(resp => resp.json())
    .then(resp => {
      task = {...task, completed: !task.completed}
      this.setState({ tasks: [...(tasks.filter(task => task.id !== taskId)), task].sort(this.preferCompletion) });
    })
    .catch(err => console.log(err));
  }

  logIn = (event) => {
    event.preventDefault();
    const email = document.querySelector('.login .email').value;
    const password = document.querySelector('.login .password').value;
    fetch('/user/login', {
      body: JSON.stringify({ email, password }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
    .then(resp => resp.json())
    .then(resp => {
      if (resp.error) {
        this.setState({ showLoginError: true, loginError: resp.error });
      }
      else {
        sessionStorage.setItem('isLoggedIn', true);
        sessionStorage.setItem('email', email);
        this.setState({ isLoggedIn: true, email, showLoginError: false, loginError: '' });
      }
    })
    .catch(err => {
      this.setState({ showLoginError: true, loginError: 'Server error' });
    });
  }

  logOut = (event) => {
    event.preventDefault();
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('email');
    this.setState({
      email: null,
      isLoggedIn: false,
      showLoginError: false,
      loginError: '',
      showRegisterError: false,
      registerError: '',
      showCreateTaskError: false,
      createTaskError: '',
      tasks: []
    });
  }

  preferCompletion = (task1, task2) =>
    task1.completed && !task2.completed ? -1 :
    !task1.completed && task2.completed ? 1 : 0

  register = (event) => {
    event.preventDefault();
    const name = document.querySelector('.register .name').value;
    const email = document.querySelector('.register .email').value;
    const password = document.querySelector('.register .password').value;
    const passwordConfirmation = document.querySelector('.register .password-confirmation').value;

    fetch('/user/register', {
      body: JSON.stringify({ name, email, password, passwordConfirmation }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
    .then(resp => resp.json())
    .then(resp => {
      if (resp.error) {
        this.setState({ showRegisterError: true, registerError: resp.error })
      }
      else {
        this.setState({ isLoggedIn: true, email, showRegisterError: false, registerError: '' });
      }
    })
    .catch(err => this.setState({ showRegisterError: true, registerError: 'Server error'}));
  }

  render() {
    const { loginError, isLoggedIn, showLoginError, showRegisterError, registerError, showCreateTaskError, createTaskError, tasks } = this.state;
    return (
      <div className="App">
        <h1>Users</h1>
        {!isLoggedIn &&
        (<div>
          <h1>Log In</h1>
          <form className="login" onSubmit={this.logIn}>
            <label htmlFor="email">Email</label>
            <input name="email" className="email" type="text" autoComplete="off"/>
            <label htmlFor="password">Password</label>
            <input name="password" className="password" type="text" autoComplete="off"/>
            <input type="submit" value="Submit"/>
          </form>
          {showLoginError &&
            <div className="errors">Error: {loginError}</div>
          }
          <h1>Register</h1>
          <form className="register" onSubmit={this.register}>
            <label htmlFor="name">Name</label>
            <input name="name" type="text" className="name" placeholder="name"/>
            <label htmlFor="email">Email</label>
            <input name="email" type="email" className="email" placeholder="email"/>
            <label htmlFor="password">Password</label>
            <input name="password" type="password" className="password" placeholder="password"/>
            <label htmlFor="passwordConfirmation">Confirm Password</label>
            <input name="passwordConfirmation" type="password" className="password-confirmation" placeholder="password confirmation"/>
            <input value="submit" type="submit"/>
          </form>
          {showRegisterError &&
            <div className="errors">Error: {registerError}</div>
          }
        </div>)
        }
        {isLoggedIn &&
          <div>
            <div className="welcome">Welcome! You are logged in</div>
            <ul>
              {tasks.map((task, idx) => (
                <li key={idx} className={'task ' + (task.completed ? 'completed' : 'incomplete')}>
                  <div>{task.name}</div>
                  {task.isCreator &&
                  <button onClick={this.deleteTask.bind(this, task.id)} className="delete">Delete</button>}
                  <button onClick={this.toggleTaskStatus.bind(this, task.id)} className="toggle">{task.completed ? 'Mark as not done' : 'Mark as done'}</button>
                </li>
              ))}
            </ul>
            <form className="createTask" onSubmit={this.createTask}>
              <label htmlFor="name">Task name</label>
              <input name="name" type="text" className="name" /><br/>
              <label htmlFor="description">Task Description</label>
              <input name="description" type="text" className="description" /><br/>
              Collaborators<br/>
              <input name="collaborator1" type="email" className="collaborator1" /><br/>
              <input name="collaborator2" type="email" className="collaborator2" /><br/>
              <input name="collaborator3" type="email" className="collaborator3" /><br/>
              <input type="submit" />
            </form>
            {showCreateTaskError &&
              <div className="errors">{createTaskError}</div>
            }
            <button onClick={this.logOut} className="logout">Log Out</button>
          </div>
        }
      </div>
    );
  }
}

export default App;
