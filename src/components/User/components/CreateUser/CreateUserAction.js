/*
 * Will receive default state from Common
 * */

import { defaultUserState } from '../../../Common/Actions/DefaultState';
import requestAction from '../../../Common/Actions/requestAction';
// import { validation } from '../../../Common/Actions/Validator';
import Endpoints, { globalCookiePolicy } from '../../../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_ERROR } from '../../../Common/Actions/Actions';


const ROLES_FETCH = 'USER/USER_ROLES_FETCH';
const ADD_ROLE = 'USER/ADD_ROLE';
const REMOVE_ROLE = 'USER/REMOVE_ROLE';
const INPUT_CHANGED = 'USER/INPUT_CHANGED';

/* ****** Action Creators ******** */

const getRolesData = () => {
  return (dispatch, getState) => {
    const genOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };

    dispatch({ type: MAKE_REQUEST});
    const url = Endpoints.authUrl + '/admin/roles';
    return fetch(url, genOptions)
           .then(
             (response) => {
               if (response.ok) { // 2xx status
                 response.json().then(
                   (d) => {
                     return dispatch({type: ROLES_FETCH, data: d});
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

const createUser = () => {
  return (dispatch, getState) => {
    let url = Endpoints.authUrl + '/admin/user/create';
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
    const userData = getState().operationUserData.userData;
    const userObj = { 'username': userData.username,
      'email': userData.email,
      'password': userData.password,
      'mobile': userData.mobile,
      'is_active': userData.is_active
    };
    let options = {
      ...genOptions,
      body: JSON.stringify(userObj)
    };
    dispatch({type: MAKE_REQUEST});
    return dispatch(requestAction(url, options))
      .then((resp) => {
        if (resp.hasura_id) {
          console.log('Check This ouut');
          url = Endpoints.authUrl + '/admin/user/assign-role';
          userData.roles.forEach(( indiv) => {
            const roleObj = {'hasura_id': resp.hasura_id, 'role': indiv};
            options = {
              ...genOptions,
              body: JSON.stringify(roleObj)
            };
            dispatch(requestAction(url, options));
          })
          .then(() => {
            alert('done');
            return dispatch({type: REQUEST_COMPLETED});
          });
         // return Promise.map(getState().operationUserData.roles, (indiv) => {
         //   const roleObj = {'hasura_id': resp.id, 'role': indiv};
         //   options = {
         //     ...genOptions,
         //     body: JSON.stringify(roleObj)
         //   };
         //   return dispatch(requestAction(url, options));
         // })
        }
      })
      .catch((resp) => {
        console.log(resp);
        alert('Done');
        return dispatch({type: REQUEST_COMPLETED});
      });
  };
};

/* End of it */

/* ****************** END OF ACTION CREATORS ****************** */

/* ****************** REDUCER ********************************* */

const userReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case ROLES_FETCH:
      return {...state, 'availableRoles': action.data.roles};
    case ADD_ROLE:
      let tInfo = {};
      let tempRoles = (state.userData.roles) ? state.userData.roles : [];
      tempRoles.push(action.data.value);
      tInfo.roles = tempRoles;
      return {...state, 'userData': { ...state.userData, ...tInfo}};
    case REMOVE_ROLE:
      tInfo = {};
      tempRoles = (state.userData.roles) ? state.userData.roles : [];
      const index = tempRoles.indexOf(action.data.value);
      tempRoles.splice(index, 1);
      tInfo.roles = tempRoles;
      return {...state, 'userData': { ...state.userData, ...tInfo}};
    case INPUT_CHANGED:
      const tempInfo = {};
      tempInfo[action.data.key] = action.data.value;
      return {...state, 'userData': {...state.userData, ...tempInfo }};
    default: return { ...state };
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  getRolesData,
  createUser,
  INPUT_CHANGED,
  ADD_ROLE,
  REMOVE_ROLE
};
export default userReducer;
