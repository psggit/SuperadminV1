/*
 * Will receive default state from Common
 * */

import { defaultCompanyState } from '../../Common/Actions/DefaultState';
import requestAction from '../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';

import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_ERROR} from '../../Common/Actions/Actions';

import { routeActions } from 'redux-simple-router';
// import commonReducer from '../Common/Actions/CommonReducer';

/* End of it */

/* Action Constants */

const CITY_FETCHED = '@company/CITY_FETCHED';
const STATE_FETCHED = '@company/STATE_FETCHED';
const COMPANY_FETCHED = '@company/COMPANY_FETCHED';

const INPUT_VALUE_CHANGED = '@company/INPUT_VALUE_CHANGED';

const RESET = '@company/RESET';

/* ****** Action Creators ******** */

const fetchCompany = ( companyId) => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/company/select';
    const queryObj = {};
    queryObj.columns = [
      '*'
    ];
    queryObj.where = {
      'id': parseInt(companyId, 10)
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, COMPANY_FETCHED, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const fetchCity = () => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/city/select';
    const queryObj = {};
    queryObj.columns = [
      '*'
    ];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, CITY_FETCHED, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const fetchState = () => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/state/select';
    const queryObj = {};
    queryObj.columns = [
      '*'
    ];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, STATE_FETCHED, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const insertCompany = () => {
  return (dispatch, getState) => {
    const url = Endpoints.db + '/table/company/insert';
    const insertObj = {};
    const currState = getState().company_data;
    if ( !currState.name || !currState.cityId || !currState.stateId || !currState.address || !currState.pinCode ) {
      alert('City, State, Address and Name of the company are important for company creation');
      return dispatch({type: REQUEST_COMPLETED});
    }
    const companyObj = {
      'city_id': parseInt(currState.cityId, 10),
      'state_id': parseInt(currState.stateId, 10),
      'name': currState.name.toUpperCase(),
      'address': currState.address,
      'pin_code': currState.pinCode,
      'created_at': new Date().toISOString(),
      'updated_at': new Date().toISOString()
    };
    insertObj.objects = [companyObj];
    insertObj.returning = ['id'];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(insertObj)
    };
    dispatch({type: MAKE_REQUEST});
    return dispatch(requestAction(url, options))
      .then( ( resp ) => {
        if ( resp.returning.length > 0) {
          return dispatch(routeActions.push('/hadmin/companies_management'));
        }
        return dispatch({type: REQUEST_COMPLETED});
      })
      .catch((resp) => {
        console.log(resp);
        alert('Something wrong happened while creating a companies entry');
        return dispatch({type: REQUEST_COMPLETED});
      });
  };
};

const updateCompany = () => {
  return (dispatch, getState) => {
    const url = Endpoints.db + '/table/company/update';
    const updateObj = {};
    const currState = getState().company_data;
    if ( !currState.name || !currState.cityId || !currState.stateId || !currState.address || !currState.pinCode ) {
      alert('City, State, Address and Name of the company are important for company creation');
      return dispatch({type: REQUEST_COMPLETED});
    }
    const companyObj = {
      'city_id': parseInt(currState.cityId, 10),
      'state_id': parseInt(currState.stateId, 10),
      'name': currState.name.toUpperCase(),
      'address': currState.address,
      'pin_code': currState.pinCode,
      'updated_at': new Date().toISOString()
    };

    updateObj.values = companyObj;
    updateObj.returning = ['id'];
    updateObj.where = {
      'id': currState.companyId
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(updateObj)
    };
    dispatch({type: MAKE_REQUEST});
    return dispatch(requestAction(url, options))
      .then( ( resp ) => {
        if ( resp.returning.length > 0) {
          return dispatch(routeActions.push('/hadmin/companies_management'));
        }
        return dispatch({type: REQUEST_COMPLETED});
      })
      .catch((resp) => {
        console.log(resp);
        alert('Something wrong happened while creating a company entry');
        return dispatch({type: REQUEST_COMPLETED});
      });
  };
};

/* ====== End of functions */

const companyReducer = (state = defaultCompanyState, action) => {
  switch (action.type) {
    case CITY_FETCHED:
      return { ...state, cityList: action.data};
    case STATE_FETCHED:
      return { ...state, stateList: action.data};
    case INPUT_VALUE_CHANGED:
      const companyInfo = {};
      companyInfo[action.data.key] = action.data.value;
      return { ...state, ...companyInfo };
    case COMPANY_FETCHED:
      return { ...state, name: action.data[0].name, companyId: action.data[0].id, pinCode: action.data[0].pin_code, address: action.data[0].address, cityId: action.data[0].city_id, stateId: action.data[0].state_id };
    case RESET:
      return { ...defaultCompanyState };
    default:
      return { ...state };
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchCompany,
  fetchCity,
  fetchState,
  RESET,
  INPUT_VALUE_CHANGED,
  insertCompany,
  updateCompany
};
export default companyReducer;
