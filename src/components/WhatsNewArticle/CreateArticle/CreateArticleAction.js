/*
 * Will receive default state from Common
 */

import { whatsNewDefaultData } from '../../Common/Actions/DefaultState';
import requestAction from '../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_ERROR} from '../../Common/Actions/Actions';

// import commonReducer from '../Common/Actions/CommonReducer';

const STATES_FETCH = 'AD_CREATE_IMAGE/STATES_FETCH';
const AD_INFO = 'AD_CREATE_IMAGE/AD_INFO';
const CITIES_VIEW = 'AD_CREATE_IMAGE/CITIES_VIEW';
const IMAGE_UPLOAD_SUCCESS = 'AD_CREATE_IMAGE/IMAGE_UPLOAD_SUCCESS';
const IMAGE_UPLOAD_ERROR = 'AD_CREATE_IMAGE/IMAGE_UPLOAD_SUCCESS';
const IMAGE_CANCEL = 'AD_CREATE_IMAGE/IMAGE_CANCEL';
const UPDATED_CITIES_SELECTION = 'AD_CREATE_IMAGE/UPDATED_CITIES_SELECTION';
const REQUEST_SUCCESS = 'AD_CREATE_IMAGE/REQUEST_SUCCESS';
// const REQUEST_ERROR = 'CTSKU/REQUEST_ERROR';

/* ****** Action Creators ******** */
const requestFailed = (data) => ({type: REQUEST_ERROR, data: data});

const fetchStates = () => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/state/select';
    const queryObj = {};
    queryObj.columns = ['*', {'name': 'cities', 'columns': ['*']}];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, STATES_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const citiesViewHandler = (stateObj) => {
  return (dispatch) => {
    return Promise.all([
      dispatch({type: CITIES_VIEW, data: stateObj})
    ]);
  };
};

const checkState = (stateObj) => {
  return (dispatch, state) => {
    const lstate = state().whats_new_data;
    const lCities = {...lstate.selectedCities};
    stateObj.cities.forEach((c) => {
      lCities[c.id] = c;
    });
    return Promise.all([
      dispatch({type: UPDATED_CITIES_SELECTION, data: {...lCities}})
    ]);
  };
};

const unCheckState = (stateObj) => {
  return (dispatch, state) => {
    const lstate = state().whats_new_data;
    const lCities = {...lstate.selectedCities};
    stateObj.cities.forEach((c) => {
      delete lCities[c.id];
    });
    return Promise.all([
      dispatch({type: UPDATED_CITIES_SELECTION, data: {...lCities}})
    ]);
  };
};

const checkCity = (cityObj) => {
  return (dispatch, state) => {
    const lstate = state().whats_new_data;
    const lCities = {...lstate.selectedCities};
    lCities[cityObj.id] = cityObj;
    return Promise.all([
      dispatch({type: UPDATED_CITIES_SELECTION, data: {...lCities}})
    ]);
  };
};

const unCheckCity = (cityObj) => {
  return (dispatch, state) => {
    const lstate = state().whats_new_data;
    const lCities = {...lstate.selectedCities};
    delete lCities[cityObj.id];
    return Promise.all([
      dispatch({type: UPDATED_CITIES_SELECTION, data: {...lCities}})
    ]);
  };
};

const finalSave = (dataObject) => {
  return (dispatch, state) => {
    console.log(dataObject);
    const lstate = state().whats_new_data;
    let imgUrl = '';
    if (imgUrl !== undefined) {
      console.log('IMAGE EXISTS');
      console.log(lstate);
      imgUrl = lstate.imageUrl;
    }
    const insertArticleObj = {'type': 'insert', 'args': {'table': 'whats_new_article', 'objects': [{'is_featured': dataObject.is_featured, 'title': dataObject.title, 'description': dataObject.description, 'content': dataObject.content, 'image': imgUrl, 'is_active': true}], 'returning': ['id']}};

    const payload = {'type': 'bulk', 'args': [insertArticleObj]};

    console.log(payload);

    const url = Endpoints.bulk;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    // return dispatch(requestAction(url, options, V_REQUEST_SUCCESS, V_REQUEST_ERROR));
    return fetch(url, options)
       .then(
         (response) => {
           if (response.ok) { // 2xx status
             response.json().then(
               (d) => {
                 console.log('Article Successfully Inserted');
                 console.log(d);
                 const articleId = d[0].returning[0].id;
                 console.log(articleId);
                 // now insert city mapping for this article id
                 const selectedCities = lstate.selectedCities;
                 console.log(selectedCities);
                 const cityIds = Object.keys(selectedCities);
                 const cityInserts = [];
                 for ( let i = 0; i < cityIds.length; i++) {
                   const insertCityObj = {'whats_new_article_id': articleId, 'city_id': parseInt(cityIds[i], 10)};
                   cityInserts.push(insertCityObj);
                 }

                 const payloadCity = {'type': 'insert', 'args': {'table': 'whats_new_article_city', 'objects': cityInserts, 'returning': ['id']}};

                 console.log(payloadCity);

                 const cityUrl = Endpoints.bulk;
                 const cityOptions = {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin' },
                   credentials: globalCookiePolicy,
                   body: JSON.stringify(payloadCity),
                 };
                 // return dispatch(requestAction(url, options, V_REQUEST_SUCCESS, V_REQUEST_ERROR));
                 return fetch(cityUrl, cityOptions)
                  .then(
                    (cityResponse) => {
                      if (cityResponse.ok) {
                        cityResponse.json().then(
                          (d1) => {
                            console.log(d1);
                            alert('Article has been inserted successfully');
                            console.log('city mapping successful');
                            window.location.reload();
                           /*
                           return Promise.all([
                             dispatch({type: REQUEST_SUCCESS, data: d})
                           ]);
                           */
                          }
                        );
                      }
                    }
                  );
               },
               () => {
                 return dispatch(requestFailed('Error. Try again!'));
               }
             );
           } else {
             return dispatch(requestFailed('Error. Try again!'));
           }
         },
         (error) => {
           console.log(error);
           return dispatch(requestFailed(error.text));
         });
  };
};

const createArticleReducer = (state = whatsNewDefaultData, action) => {
  switch (action.type) {
    case REQUEST_SUCCESS:
      return {...state, cities: action.data};
    case REQUEST_ERROR:
      return {...state, cities: []};
    case STATES_FETCH:
      return {...state, statesAll: action.data};
    case IMAGE_UPLOAD_SUCCESS:
      return {...state, imageUrl: action.data[0]};
    case IMAGE_UPLOAD_ERROR:
      return {...state, imageUrl: ''};
    case IMAGE_CANCEL:
      return {...state, imageUrl: ''};
    case CITIES_VIEW:
      console.log('CITIES VIEW');
      console.log(action.data);
      return {...state, citiesView: action.data, hideCities: ''};
    case AD_INFO:
      const camInfo = {};
      camInfo[action.data.key] = action.data.value;
      return { ...state, campaignDetails: { ...state.campaignDetails, ...camInfo}};
    case UPDATED_CITIES_SELECTION:
      console.log('UPDATED CITIES SELECTION');
      console.log(action.data);
      return { ...state, selectedCities: {...action.data}};
    default: return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchStates,
  AD_INFO,
  citiesViewHandler,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_ERROR,
  IMAGE_CANCEL,
  checkState,
  unCheckState,
  checkCity,
  unCheckCity,
  finalSave
};

export default createArticleReducer;
