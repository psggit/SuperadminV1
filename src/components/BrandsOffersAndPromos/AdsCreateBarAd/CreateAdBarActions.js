/*
 * Will receive default state from Common
 */

import { defaultcreateBarAdData} from '../../Common/Actions/DefaultState';
import requestAction from '../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_ERROR} from '../../Common/Actions/Actions';

// import commonReducer from '../Common/Actions/CommonReducer';

const CITIES_FETCH = 'AD_CREATE_BAR/CITIES_FETCH';
const CITY_SELECT = 'AD_CREATE_BAR/CITY_SELECT';
const AD_INFO = 'AD_CREATE_BAR/AD_INFO';
const CITIES_VIEW = 'AD_CREATE_BAR/CITIES_VIEW';
const IMAGE_UPLOAD_SUCCESS = 'AD_CREATE_BAR/IMAGE_UPLOAD_SUCCESS';
const IMAGE_UPLOAD_ERROR = 'AD_CREATE_BAR/IMAGE_UPLOAD_SUCCESS';
const IMAGE_CANCEL = 'AD_CREATE_BAR/IMAGE_CANCEL';
const UPDATED_CITIES_SELECTION = 'AD_CREATE_BAR/UPDATED_CITIES_SELECTION';

/* ****** Action Creators ******** */

const fetchCities = () => {
  return (dispatch) => {
    /* Bar */
    const url = Endpoints.db + '/table/city/select';
    const queryObj = {};
    queryObj.columns = ['*', {'name': 'bars', 'columns': ['*']}];
    queryObj.where = {'bars': {'id': {'$ne': null}}};
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, CITIES_FETCH, REQUEST_ERROR)),
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
    const lstate = state().createBarAd_data;
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
    const lstate = state().createBarAd_data;
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
    const lstate = state().createBarAd_data;
    const lCities = {...lstate.selectedCities};
    lCities[cityObj.id] = cityObj;
    return Promise.all([
      dispatch({type: UPDATED_CITIES_SELECTION, data: {...lCities}})
    ]);
  };
};

const unCheckCity = (cityObj) => {
  return (dispatch, state) => {
    const lstate = state().createBarAd_data;
    const lCities = {...lstate.selectedCities};
    delete lCities[cityObj.id];
    return Promise.all([
      dispatch({type: UPDATED_CITIES_SELECTION, data: {...lCities}})
    ]);
  };
};

const validateBar = (barId) => {
  return (dispatch) => {
    const url = Endpoints.db + '/table/bars/select';
    const queryObj = {};
    queryObj.columns = ['id'];
    queryObj.where = {'id': parseInt(barId, 10)};
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    return Promise.all([
      dispatch(requestAction(url, options)).then((res) => {
        return (res);
      }).catch((err) => {
        return (err);
      })
    ]);
  };
};

const insertAdData = (barId, imgUrl, adInfo) => {
  return (dispatch) => {
    // I need BrandManager ID, Image url.
    // I will return Ad Id, if success.
    // I will return Error message, if error.
    const adUrl = Endpoints.db + '/table/ad_bar/insert';
    delete adInfo.city;
    delete adInfo.bar;
    adInfo.image_url = imgUrl;
    adInfo.created_at = new Date().toISOString();
    adInfo.updated_at = new Date().toISOString();
    adInfo.bar_id = parseInt(barId, 10);
    adInfo.active_from = new Date(adInfo.active_from).toISOString();
    adInfo.active_to = new Date(adInfo.active_to).toISOString();
    console.log(adInfo);
    const adData = {};
    adData.objects = [adInfo];
    adData.returning = ['id'];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(adData),
    };

    return dispatch(requestAction(adUrl, options)).then((resp) => {
      return resp;
    }).catch((err) => {
      return err;
    });
  };
};

const checkBarValid = () => {
  return (dispatch, state) => {
    const lstate = state().createBarAd_data;
    const lCamDetails = {...lstate.campaignDetails};
    const imgUrl = lstate.imageUrl;
    const imgRe = /^.*?\:\/\/\/.*?\/\d+\/\w+\/.*$/;
    if (!imgRe.test(imgUrl)) {
      return Promise.all([
        alert('Please upload an image')
      ]);
    }
    return Promise.all([
      dispatch(validateBar(lCamDetails.bar)).then((res) => {
        if (res[0].length > 0) {
          // Bar Exists! Yippie!
          // Assume that the result is always 1. Should always be 1.
          // Time to insert data
          return Promise.all([
            // insert Ad Data (including Image)
            dispatch(insertAdData(res[0][0].id, imgUrl, lCamDetails)).then((insertRes) => {
              console.log('This is AdData:');
              console.log(insertRes);
              alert('Hurray!! Ad Created!');
            }).catch((err) => {
              alert(err);
            })
          ]);
        }
        alert('Bar is not in DB: ' + lCamDetails.email);
      }).catch((err) => {
        alert('Error: ' + err);
      })
    ]);
  };
};

const finalSave = () => {
  return (dispatch) => {
    return Promise.all([
      dispatch(checkBarValid())
    ]);
  };
};

const adsCreateBarReducer = (state = defaultcreateBarAdData, action) => {
  switch (action.type) {
    case CITIES_FETCH:
      return {...state, citiesAll: action.data};
    case CITY_SELECT:
      return {...state, selectedCity: { ...state.citiesAll[parseInt(action.data, 10)]} };
    case IMAGE_UPLOAD_SUCCESS:
      return {...state, imageUrl: action.data[0]};
    case IMAGE_UPLOAD_ERROR:
      return {...state, imageUrl: ''};
    case IMAGE_CANCEL:
      return {...state, imageUrl: ''};
    case AD_INFO:
      const camInfo = {};
      camInfo[action.data.key] = action.data.value;
      return { ...state, campaignDetails: { ...state.campaignDetails, ...camInfo}};
    default: return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchCities,
  AD_INFO,
  citiesViewHandler,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_ERROR,
  IMAGE_CANCEL,
  checkState,
  unCheckState,
  checkCity,
  unCheckCity,
  CITY_SELECT,
  finalSave
};

export default adsCreateBarReducer;
