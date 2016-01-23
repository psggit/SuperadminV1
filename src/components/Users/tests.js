import expect from 'expect';
import userReducer, { makeRequest, requestFailed, requestSuccess } from './Actions';
const deepFreeze = require('deep-freeze');

const testRequestFailed = () => {
  const stateBefore = {
    ongoingRequest: true,
    lastError: null,
    userColumns: ['name', 'age', 'email'],
    users: []
  };
  const action = requestFailed('failed-test');
  const stateAfter = {
    ongoingRequest: false,
    lastError: 'failed-test',
    userColumns: ['name', 'age', 'email'],
    users: []
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
      userReducer(stateBefore, action)
      ).toEqual(stateAfter);

  const stateBefore2 = {
    ongoingRequest: true,
    lastError: null,
    userColumns: ['name', 'age', 'email'],
    users: [{name: 'asdf', age: 1, email: 'asdf'}]
  };
  const action2 = requestFailed('failed-test');
  const stateAfter2 = {
      ...stateBefore2,
      ongoingRequest: false,
      lastError: 'failed-test',
    };

  deepFreeze(stateBefore2);
  deepFreeze(action2);

  expect(
      userReducer(stateBefore2, action2)
      ).toEqual(stateAfter2);

};

const testRequestSuccess = () => {
  const stateBefore = {
    ongoingRequest: true,
    lastError: null,
    users: [{name: 'asdf', age: 1, email: 'asdf'}]
  };
  const action = requestSuccess([{name: 'after', age: 23, email:'1234'}]);
  const stateAfter = {
    ...stateBefore,
    ongoingRequest: false,
    lastError: null,
    users: [{name: 'after', age: 23, email: '1234'}]
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    userReducer(stateBefore, action)
  ).toEqual(stateAfter);
};

testRequestFailed();
testRequestSuccess();
console.log("Tests passed");
