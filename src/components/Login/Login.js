import React from 'react';

const Login = () => (
  <div className="container" id="login">
    <h1> Login <span style={{color: 'grey'}}>@hipbar</span></h1>
    <hr />
    <form className="form-horizontal">
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
          <button type="submit" className="btn btn-success">Login</button>
        </div>
      </div>
    </form>
  </div>
);

export default Login;
