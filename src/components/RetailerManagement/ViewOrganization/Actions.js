import Endpoints from '../../../Endpoints';

import { genOptions } from '../../Common/Actions/commonFunctions';

import requestAction from '../../Common/Actions/requestAction';

import {
  REQUEST_SUCCESS,
  COUNT_FETCHED,
  REQUEST_ERROR,
} from '../../Common/Actions/Actions';

/* Fetch Cancel Products */

const getOrganizationCount = ( ) => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': ['*']
    };

    const url = Endpoints.db + '/table/' + 'organisation' + '/count';
    const options = {
      ...genOptions,
      body: JSON.stringify(payload)
    };
    return dispatch(requestAction(url, options, COUNT_FETCHED, REQUEST_ERROR));
  };
};

const getOrganizationData = ( page ) => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    let offset = 0;
    let limit = 0;
    // const count = currentProps.count;

    // limit = (page * 10) > count ? count : ((page) * 10);
    // limit = ((page) * 10);
    limit = 10;
    offset = (page - 1) * 10;

    const payload = {
      'columns': [ '*', {
        'name': 'contact_addresses',
        'columns': ['*'],
        'order_by': '-created_at',
        'limit': 1
      }, {
        'name': 'registered_addresses',
        'columns': ['*'],
        'order_by': '-created_at',
        'limit': 1
      }, {
        'name': 'retailers',
        'columns': ['id']
      }, {
        'name': 'bars',
        'columns': ['id']
      }],
      limit: limit,
      offset: offset
    };

    const url = Endpoints.db + '/table/' + 'organisation' + '/select';
    const options = {
      ...genOptions,
      body: JSON.stringify(payload),
    };
    return dispatch(requestAction(url, options, REQUEST_SUCCESS, REQUEST_ERROR));
  };
};

const getAllOrganizationData = (page ) => {
  const gotPage = page;
  /* Dispatching first one */
  return (dispatch) => {
    return Promise.all([
      dispatch(getOrganizationCount( )),
      dispatch(getOrganizationData(gotPage))
    ]);
  };
};

export {
  getAllOrganizationData
};
