import React from 'react';
import { connect } from 'react-redux';
import {makeRequest} from './actions';

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
      /*
      dispatch({type: MAKE_REQUEST, data: {}});
      dispatch( (dispatch) => {
        //emit make_request action
        dispatch({type: make_request, data: []});
        //make the ajax call
        //if successful result, emit the request_success action
        //if bad result, emit the request_error action
      */
      });
      dispatch:
        //If my argument is object. Assume that the object is an action. Call the reducer
        //If my argument is a function. Execute the function, 
        //          and give that function the ability to dispatch actions
      //action was emitted. This action must also trigger an AJAX call
      //At the end of the AJAX call we must emit REQUEST_SUCCESS, REQUEST_ERROR
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
