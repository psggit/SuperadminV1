import React from 'react';
import { connect } from 'react-redux';


const Home = () => {
  return (
    <div className="container-fluid">
      <div className="col-md-3">
        Sidebar
      </div>
      <div className="col-md-9">
        Main area
      </div>
    </div>);
};

export default connect()(Home);
