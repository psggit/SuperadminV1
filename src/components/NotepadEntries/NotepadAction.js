/*
 * Will receive default state from Common
 * */

import { defaultNotepadState } from '../Common/Actions/DefaultState';
import requestAction from '../Common/Actions/requestAction';
import Endpoints from '../../Endpoints';

import { MAKE_REQUEST,
  REQUEST_SUCCESS,
  REQUEST_COMPLETED,
  REQUEST_ERROR } from '../Common/Actions/Actions';

import { routeActions } from 'redux-simple-router';
// import commonReducer from '../Common/Actions/CommonReducer';

import { genOpt } from '../Common/commonConfig';

const NOTEPAD_FETCH_ISSUE_SUCCESS = 'NOTEPAD/NOTEPAD_FETCH_ISSUE_SUCCESS';

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
      ...genOpt,
      body: JSON.stringify(queryObj)
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
      ...genOpt,
      body: JSON.stringify(queryObj)
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, NOTEPAD_FETCH_ISSUE_SUCCESS, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const insertNotepad = (issueId, description, userId) => {
  return (dispatch) => {
    const url = Endpoints.db + '/table/notepad/insert';
    const createdBy = new Date().toISOString();
    const updatedBy = new Date().toISOString();
    const currentUserId = userId;

    const insertObj = {};
    if ( description.length === 0 ) {
      alert('Please enter the comment to submit');
      return Promise.resolve();
    }
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
      ...genOpt,
      body: JSON.stringify(insertObj)
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
        return dispatch({type: REQUEST_COMPLETED});
      });
  };
};

/* ****************** END OF ACTION CREATORS ****************** */

/* ****************** REDUCER ********************************* */

const notepadReducer = (state = defaultNotepadState, action) => {
  switch (action.type) {
    case NOTEPAD_FETCH_ISSUE_SUCCESS:
      return {...state, issueTypes: action.data};
    default: return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchNotepad,
  fetchIssueTypes,
  insertNotepad
};
export default notepadReducer;
