/*
 * Will receive default state from Common
 * */

import requestAction from '../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_SUCCESS,
  REQUEST_ERROR } from '../Common/Actions/Actions';

import { routeActions } from 'redux-simple-router';
// import commonReducer from '../Common/Actions/CommonReducer';

// const NOTEPAD_INSERT_SUCCESS = 'NOTEPAD/NOTEPAD_INSERT_SUCCESS';
// const NOTEPAD_INSERT_FAILURE = 'NOTEPAD/NOTEPAD_INSERT_SUCCESS';


/* ****** Action Creators ******** */

const fetchNotepad = (userId) => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/notepad/select';
    const queryObj = {};
    queryObj.columns = [
      '*',
      {
        'name': 'issue',
        'columns': ['*']
      }
    ];
    queryObj.where = {
      'consumer_id': userId
    };
    queryObj.order_by = '-created_at';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return dispatch(requestAction(url, options, REQUEST_SUCCESS, REQUEST_ERROR));
  };
};

const fetchIssueTypes = () => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/issue/select';
    const queryObj = {};
    queryObj.columns = [
      '*'
    ];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return dispatch(requestAction(url, options, REQUEST_SUCCESS, REQUEST_ERROR));
  };
};

const insertNotepad = (issueId, description, userId) => {
  return (dispatch) => {
    const url = Endpoints.db + '/table/notepad/insert';
    const createdBy = new Date().toISOString();
    const updatedBy = new Date().toISOString();
    const currentUserId = userId;

    const insertObj = {};
    insertObj.objects = [
      {
        'issue_id': issueId,
        'description': description,
        'consumer_id': userId,
        'created_by': 1,
        'created_at': createdBy,
        'updated_at': updatedBy,
      }
    ];
    insertObj.returning = ['id'];

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(insertObj),
    };

    dispatch({type: MAKE_REQUEST});
    return dispatch(requestAction(url, options))
      .then((resp) => {
        if (resp.returning.length > 0) {
          console.log(resp);
          alert('Notepad Entry Created');
          dispatch(routeActions.push('/hadmin/consumer/profile/' + currentUserId + '/view_notepads'));
        }
      })
      .catch((resp) => {
        console.log(resp);
        alert('Something wrong happened while creating a notepad entry');
      });
  };
};

/* ****************** END OF ACTION CREATORS ****************** */

export {
  fetchNotepad,
  fetchIssueTypes,
  insertNotepad
};
