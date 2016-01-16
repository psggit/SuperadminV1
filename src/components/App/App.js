import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';


const _App = ({push}) => (
  <div>
    <header>
      Links:
      {' '}
      <Link to="/">Home</Link>
      {' '}
      <Link to="/foo">Foo</Link>
      {' '}
      <Link to="/bar">Bar</Link>
    </header>
    <div>
      <button onClick={() => push('/foo')}>Go to /foo</button>
    </div>
    <div style={{marginTop: '1.5em'}}>children</div>
  </div>
);

export default connect(null, {push: routeActions.push})(_App);
