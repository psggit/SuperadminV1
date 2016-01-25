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

const Login = ({lastError, ongoingRequest, lastSuccess, onLoginSubmit}) => {
  let loginText = 'Login';

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
      <form className="form-horizontal" onSubmit={onLoginSubmit}>
        <div className="form-group">
          <div className="col-sm-3">
            <input type="text" className="form-control" placeholder="username" />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-3">
            <input type="password" className="form-control" placeholder="password" />
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

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginSubmit: (e) => {
      e.preventDefault();
      dispatch(makeRequest({url: 'http://google.com'}));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
