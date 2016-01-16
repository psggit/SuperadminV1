import expect from 'expect';
import loginReducer, { makeRequest } from './actions';
const deepFreeze = require('deep-freeze');

const testMakeRequest = () => {
  const stateBefore = {
    ongoingRequest: false,
    lastError: null
  };
  const action = makeRequest({url: 'http://google.com'});

  const stateAfter = {
      ongoingRequest: true,
      lastError: null
    };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
      loginReducer(stateBefore, action)
      ).toEqual(stateAfter);
};

testLogin();
console.log("Tests passed");
