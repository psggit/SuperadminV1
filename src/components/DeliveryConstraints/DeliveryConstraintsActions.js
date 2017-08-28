import Endpoints, { globalCookiePolicy } from '../../Endpoints';
import requestAction from '../Common/Actions/requestAction';

import {
//  REQUEST_SUCCESS,
  REQUEST_ERROR,
} from '../Common/Actions/Actions';

/* Action constants */

const CITIES_FETCHED = '@deliveryDetails/DELIVERY_DETAILS_FETCHED';

const getAllDeliveryConstraints = () => {
  return (dispatch, getState) => {
    const payload = {
      'columns': ['name', 'id'],
      'where': {
        'deliverable_city': true
      }
    };
    const url = Endpoints.db + '/table/' + 'city' + '/select';
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
    const options = {
      ...genOptions,
      body: JSON.stringify(payload)
    };
    return dispatch(requestAction(url, options, CITIES_FETCHED, REQUEST_ERROR));
  };
};

const defaultDeliveryState = {
  deliverableCities: []
};

/* */

const DeliveryConstraintsReducer = ( state = defaultDeliveryState, action ) => {
  switch ( action.type ) {
    case CITIES_FETCHED:
      return { ...state, deliverableCities: action.data};
    default:
      return { ...state };
  }
};

export default DeliveryConstraintsReducer;

export {
  getAllDeliveryConstraints
};
