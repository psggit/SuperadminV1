import React from 'react';
import { connect } from 'react-redux';
import { makeRequest } from './Actions';
import Helmet from 'react-helmet';

/* State this guy needs
{
  loginState: {
    ongoingRequest : false, //true if request is going on
    lastError : null OR <string>
    lastSuccess: null OR <string>
  }
}
*/

const Login = ({lastError, ongoingRequest, lastSuccess, dispatch}) => {
  let loginText = 'Login';
  let username;
  let password;
  if (lastError) {
    console.log(lastError);
    loginText = lastError;
  } else if (lastSuccess) {
    console.log(lastSuccess);
    loginText = 'Submitted!';
  } else if (ongoingRequest) {
    loginText = 'Submitting...';
  }

  return (
    <div className="container" id="login">
      <Helmet title="Login | Hipbar Superadmin" />
      <h1> <span style={{color: 'grey'}}>@hipbar</span></h1>
      <hr />
      <form className="form-horizontal" onSubmit={(e) => {
        e.preventDefault();
        dispatch(makeRequest({username: username.value, password: password.value}));
      }}>
        <div className="form-group">
          <div className="col-sm-3">
            <input type="text" ref={(node) => {username = node;}} className="form-control" placeholder="username" />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-3">
            <input type="password" ref={(node) => {password = node;}} className="form-control" placeholder="password" />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-6">
            <button type="submit" className="btn btn-success">{loginText}</button>
          </div>
        </div>
      </form>
    </div>);
};

const mapStateToProps = (state) => {
  return {...state.loginState};
};

export default connect(mapStateToProps)(Login);
