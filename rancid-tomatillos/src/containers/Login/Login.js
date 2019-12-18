import React, { Component }from 'react';
import './Login.scss';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: ''
     }
  }


  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }



  render() { 
    return ( 
      <form>
        <label htmlFor='email' className="form-label">Email</label>
        <input id='email' className="form-input" type="text" name="email" 
        value={this.state.email} onChange={(e) => this.handleChange(e)} placeholder="BigTimeTimmyJim@yahoo.com" autocomplete='off' />
        <label htmlFor='password' className="form-label">Password</label>
        <input id='password' className="form-input" type="text" name="password" 
        value={this.state.password} onChange={(e) => this.handleChange(e)} placeholder="password123" autocomplete='off' />
        <button type='button' className='form-btn'>Submit</button>
      </form>
     );
  }
}
 
export default Login;