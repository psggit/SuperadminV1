import { defaultState } from './store';
import requestAction from '../Common/Actions/requestAction';
import Endpoints from '../../Endpoints';
import { genOptions } from '../Common/Actions/commonFunctions';


/* ------------Actions--------------- */
const CONFIRM_AMOUNT = '@inviteReducer/CONFIRM_AMOUNT';
const INITIAL_DATA_FETCHED = '@inviteReducer/INITIAL_DATA_FETCHED';
const HANDLE_ERROR = '@inviteReducer/HANDLE_ERROR';

/* ------------Action Creators---------*/
// Run when Mounted onto DOM
const onload = () => {
  // Send Request and Push Action P
  return ( dispatch ) => {
    const devUrl = Endpoints.db + '/table/retailer_pos/select';

    const devObj = {
      'columns': ['*', { 'name': 'device', 'columns': ['*'] }]
    };

    devObj.where = {
      'retailer_id': parseInt(1, 10)
    };

    const options = {
      ...genOptions,
      body: JSON.stringify(devObj)
    };

    return dispatch( requestAction( devUrl, options, INITIAL_DATA_FETCHED, HANDLE_ERROR ) );
  };
};

/* -------------REDUCER--------------- */
const invitationReducer = ( state = defaultState, action) => {
  switch ( action.type ) {
    case CONFIRM_AMOUNT:
      return { ...state, showConfirmation: true };
    case INITIAL_DATA_FETCHED:
      return { ...state, hipbarCredit: 20 };
    default:
      return { ...defaultState };
  }
};

export { onload };
export default invitationReducer;
