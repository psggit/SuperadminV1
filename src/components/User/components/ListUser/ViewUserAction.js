/* All states are stored in page_data reducer */
import Endpoints, { globalCookiePolicy } from '../../../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_SUCCESS,
  COUNT_FETCHED,
  REQUEST_ERROR, RESET } from '../../../Common/Actions/Actions';

// import beginFilter from '../../../Common/SearchComponentGen/GenerateFilter';

const getAllUserData = ( page, limit, filterObj, isSearched ) => {
  return (dispatch, getState) => {
    dispatch({ type: MAKE_REQUEST});
    let offset = 0;
    offset = (page - 1) * limit;
    const payload = {
      limit: limit,
      offset: offset,
    };

    if ( isSearched ) {
      payload.where = { ...payload.where, ...filterObj };
    }

    const url = Endpoints.authUrl + '/admin/users?limit=' + limit + '&offset=' + offset;
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy,
    };
    // return dispatch(requestAction(url, options, V_REQUEST_SUCCESS, V_REQUEST_ERROR));

    return fetch(url, options)
           .then(
             (response) => {
               if (response.ok) { // 2xx status
                 response.json().then(
                   (d) => {
                     dispatch({type: COUNT_FETCHED, data: d.total});
                     return dispatch({type: REQUEST_SUCCESS, data: d.users});
                   },
                   () => {
                     return dispatch({type: REQUEST_ERROR, data: 'Error.Try again'});
                   }
                 );
               } else {
                 return dispatch({type: REQUEST_ERROR, data: 'Error.Try again'});
               }
             },
             (error) => {
               console.log(error);
               return dispatch({type: REQUEST_ERROR, data: 'Error.Try again'});
             });
  };
};

export {
  getAllUserData,
  RESET
};
