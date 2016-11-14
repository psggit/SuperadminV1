/*
 * Will receive default state from Common
 */

import { defaultcreateImageAdData} from '../../Common/Actions/DefaultState';
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

/* ****** Action Creators ******** */

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
    const lstate = state().createImageAd_data;
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
    const lstate = state().createImageAd_data;
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
    const lstate = state().createImageAd_data;
    const lCities = {...lstate.selectedCities};
    lCities[cityObj.id] = cityObj;
    return Promise.all([
      dispatch({type: UPDATED_CITIES_SELECTION, data: {...lCities}})
    ]);
  };
};

const unCheckCity = (cityObj) => {
  return (dispatch, state) => {
    const lstate = state().createImageAd_data;
    const lCities = {...lstate.selectedCities};
    delete lCities[cityObj.id];
    return Promise.all([
      dispatch({type: UPDATED_CITIES_SELECTION, data: {...lCities}})
    ]);
  };
};

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const validBMEmail = (email) => {
  return (dispatch) => {
    const url = Endpoints.db + '/table/brand_manager/select';
    const queryObj = {};
    queryObj.columns = ['id', 'email'];
    queryObj.where = {'$and': [{'email': email}, {'is_disabled': false}]};
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

const insertCityMap = (bmId, adId) => {
  return (dispatch, state) => {
    // I need cityId, adId
    // [ad_id, city_id, created_at, updated_at]
    // I will return a list of Id's for all the maps, if success
    // An Error message if anything else
    const lstate = state().createImageAd_data;
    const lCities = {...lstate.selectedCities};
    const adsData = [];
    // Make the insert data
    Object.keys(lCities).forEach((cityId) => {
      const obj = {};
      obj.ad_id = adId;
      obj.city_id = cityId;
      obj.created_at = new Date().toISOString();
      obj.update_at = new Date().toISOString();
      adsData.push(obj);
    });
    const adImageUrl = Endpoints.db + '/table/ad_image_city/insert';
    const data = {};
    data.objects = adsData;
    data.returning = ['id'];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(data)
    };

    return dispatch(requestAction(adImageUrl, options)).then((resp) => {
      console.log(resp);
      alert('Yippie! AdCreated');
    }).catch((err) => {
      console.log(err);
      alert('err');
    });
  };
};

const insertAdData = (bmId, imgUrl, adInfo) => {
  return (dispatch) => {
    // I need BrandManager ID, Image url.
    // I will return Ad Id, if success.
    // I will return Error message, if error.
    const adUrl = Endpoints.db + '/table/ad_image/insert';
    adInfo.image_url = imgUrl;
    adInfo.created_at = new Date().toISOString();
    adInfo.updated_at = new Date().toISOString();
    adInfo.brand_manager_id = parseInt(bmId, 10);
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

const checkBmEmail = () => {
  return (dispatch, state) => {
    const lstate = state().createImageAd_data;
    const lCamDetails = {...lstate.campaignDetails};
    const imgUrl = lstate.imageUrl;
    const imgRe = /^.*?\:\/\/\/.*?\/\d+\/\w+\/.*$/;
    if (!imgRe.test(imgUrl)) {
      return Promise.all([
        alert('Please upload an image')
      ]);
    }
    if (!validateEmail(lCamDetails.email)) {
      return Promise.all([
        alert('Invalid Email Address: ' + lCamDetails.email)
      ]);
    }
    return Promise.all([
      dispatch(validBMEmail(lCamDetails.email)).then((res) => {
        if (res[0].length > 0) {
          // BM Exists! Yippie!
          // Assume that the result is always 1. Should always be 1.
          // Time to insert data
          return Promise.all([
            dispatch(insertAdData(res[0][0].id, imgUrl, lCamDetails)).then((insertRes) => {          // insert Ad Data (including Image)
              return Promise.all([
                dispatch(insertCityMap(res[0][0].id, insertRes)).then(() => {
                  alert('Hurray!! Ad Created!');
                })
              ]);
            })
          ]);
        }
        alert('BrandManager email is not in DB: ' + lCamDetails.email);
      }).catch((err) => {
        alert('Error: ' + err);
      })
    ]);
  };
};


const validateForm = () => {
  return (dispatch, state) => {
    const lstate = state().createImageAd_data;
    const lCamDetails = {...lstate.campaignDetails};
    return Promise.all([
      console.log(lCamDetails)
    ]);
  };
};

const createAd = () => {
  return (dispatch, state) => {
    const lstate = state().createImageAd_data;
    const lCamDetails = {...lstate.campaignDetails};
    return Promise.all([
      console.log(lCamDetails)
    ]);
  };
};

const finalSave = () => {
  return (dispatch) => {
    return Promise.all([
      dispatch(checkBmEmail()).then(
        dispatch(validateForm()).then(
          dispatch(createAd())
        )
      )
    ]);
  };
};

const adsCreateImageReducer = (state = defaultcreateImageAdData, action) => {
  switch (action.type) {
    case STATES_FETCH:
      return {...state, statesAll: action.data};
    case IMAGE_UPLOAD_SUCCESS:
      return {...state, imageUrl: action.data[0]};
    case IMAGE_UPLOAD_ERROR:
      return {...state, imageUrl: ''};
    case IMAGE_CANCEL:
      return {...state, imageUrl: ''};
    case CITIES_VIEW:
      return {...state, citiesView: action.data, hideCities: ''};
    case AD_INFO:
      const camInfo = {};
      camInfo[action.data.key] = action.data.value;
      return { ...state, campaignDetails: { ...state.campaignDetails, ...camInfo}};
    case UPDATED_CITIES_SELECTION:
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

export default adsCreateImageReducer;
