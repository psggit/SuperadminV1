import { React } from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';
import {App, Home} from './components';

export default () => {
  return (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Redirect from=":something" to="/" />
  </Route>);
};
