import { MAKE_REQUEST,
  REQUEST_SUCCESS,
  COUNT_FETCHED,
  REQUEST_ERROR,
  REQUEST_COMPLETED,
  RESET} from './Actions';
import defaultState from './DefaultState';

const commonReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {...state, ongoingRequest: true};
    case REQUEST_SUCCESS:
      return {...state, ongoingRequest: false, lastSuccess: action.data, lastError: {}, credentials: action.data};
    case COUNT_FETCHED:
      return {...state, count: action.data.count};
    case REQUEST_ERROR:
      return {...state, ongoingRequest: false, lastError: {'error': action.data}, lastSuccess: []};
    case REQUEST_COMPLETED:
      return {...state, ongoingRequest: false};
    case RESET:
      return {...defaultState};
    default: return state;
  }
};

export default commonReducer;
