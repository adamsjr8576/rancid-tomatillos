import React, { Component }from 'react';
import './Login.scss';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addUser, updateLoggedIn, updateUserRatings } from '../../actions/index';
import { fetchUser, fetchRatings } from '../../apiCalls';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: false
     }
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
    {
      if (this.props.loggedInStatus) {
        return (
      <Redirect to='/' />
        )
      } else {

        return (
          <form>
            <label htmlFor='email' className="form-label">Email</label>
            <input id='email' className="form-input" type="text" name="email"
            value={this.state.email} onChange={(e) => this.handleChange(e)} placeholder="BigTimeTimmyJim@yahoo.com" />
            <label htmlFor='password' className="form-label">Password</label>
            <input id='password' className="form-input" type="text" name="password"
            value={this.state.password} onChange={(e) => this.handleChange(e)} placeholder="password123" />
            <button onClick={this.handleSubmit} type='button' className='form-btn'>Submit</button>
            {this.state.error && <p className='error-p'>You have entered an invalid username or password, please try again</p>}
          </form>
        )
      }
    }
  }
}

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch( addUser(user) ),
  updateLoggedIn: isLoggedIn => dispatch( updateLoggedIn(isLoggedIn) ),
  updateUserRatings: ratings => dispatch( updateUserRatings(ratings) )
})

const mapStateToProps = state => ({
  loggedInStatus: state.isLoggedIn
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
