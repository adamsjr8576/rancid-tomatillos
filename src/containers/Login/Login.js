import React, { Component }from 'react';
import './Login.scss';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addUser, updateLoggedIn, updateUserRatings } from '../../actions/index';
import { fetchUser, fetchRatings } from '../../apiCalls';


export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: false,
      background: ''
     }
  }


  componentDidMount = () => {
    const { movies } = this.props;
    const index = Math.floor(Math.random() * Math.floor(20));
    const imageUrl = movies.movies[index].backdrop_path;
    this.setState({background: imageUrl});
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }

    fetchUser(options)
      .then(data => {
        this.props.addUser(data.user.id)
        this.props.updateLoggedIn(this.props.isLoggedIn)
        return data.user.id
      })
      .then(id => {
        fetchRatings(id)
          .then(data => this.props.updateUserRatings(data.ratings))
          .catch(err => console.log(err))
      })
    .catch(error => {
      this.setState({error: true})
    })
  }



  render() {
    const {movies, isLoading, loggedInStatus} = this.props
    if (loggedInStatus) {
      return (
    <Redirect to='/' />
      )
    }
    return (
      <main className='main-login' style={{backgroundImage: `url(${this.state.background})` }}>
        <form className='login-form'>
          <label htmlFor='email' className="form-label">Email</label>
          <input id='email' className="form-input" type="text" name="email"
          value={this.state.email} onChange={(e) => this.handleChange(e)} placeholder="User@turing.io" />
          <label htmlFor='password' className="form-label">Password</label>
          <input id='password' className="form-input" type="password" name="password"
          value={this.state.password} onChange={(e) => this.handleChange(e)} placeholder="password123" autocomplete='off' />
          <button onClick={this.handleSubmit} type='button' className='form-btn' id='submit-btn'>Submit</button>
          {this.state.error && <p className='error-p'>You have entered an invalid username or password, please try again</p>}
        </form>
      </main>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch( addUser(user) ),
  updateLoggedIn: isLoggedIn => dispatch( updateLoggedIn(isLoggedIn) ),
  updateUserRatings: ratings => dispatch( updateUserRatings(ratings) )
})

export const mapStateToProps = state => ({
  loggedInStatus: state.isLoggedIn,
  movies: state.movies,
  isLoading: state.isLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
