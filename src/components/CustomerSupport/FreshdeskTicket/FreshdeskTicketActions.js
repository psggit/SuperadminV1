/*
 * Will receive default state from Common
 * */

import { defaultFreshdeskTicketState } from '../../Common/Actions/DefaultState';
import requestAction from '../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';

const FETCH_FRESHDESK_TICKET = 'FRESH_DESK_TICKET/FETCH_FRESHDESK_TICKET';

/* ****** Action Creators ******** */

const getTicketData = (fdid) => {
  return (dispatch) => {
    const url = Endpoints.integrations_base + '/freshdesk/get_ticket/' + fdid;
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy
    };
    return dispatch(requestAction(url, options)).then((resp) => {
      console.log(resp);
      if (!resp.error) {
        dispatch({type: FETCH_FRESHDESK_TICKET, data: resp.data});
      }
    });
  };
};


/* ****************** END OF ACTION CREATORS ****************** */

/* ****************** REDUCER ********************************* */

const freshdeskTicketReducer = (state = defaultFreshdeskTicketState, action) => {
  switch (action.type) {
    case FETCH_FRESHDESK_TICKET:
      return {...state, freshdeskTicketData: action.data};
    default: return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  getTicketData
};

export default freshdeskTicketReducer;
