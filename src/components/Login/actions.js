/* State

{
  ongoingRequest : false, //true if request is going on
  lastError : null OR <string>
}
*/

const MAKE_REQUEST = 'MAKE_REQUEST';
// const REQUEST_RESPONSE = 'REQUEST_RESPONSE';
// const REQUEST_ERROR = 'REQUEST_ERROR';

const loginReducer = (state = {ongoingRequest: false, lastError: null}, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {...state, ongoingRequest: true};
    default: return state;
  }
};

const makeRequest = (data) => {
  return { type: MAKE_REQUEST, data };
};

export default loginReducer;
export {makeRequest};
