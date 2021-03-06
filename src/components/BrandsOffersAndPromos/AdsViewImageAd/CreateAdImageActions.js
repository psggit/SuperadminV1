/*
 * Will receive default state from Common
 */

import { defaultcreateImageAdData} from '../../Common/Actions/DefaultState';
import requestAction from '../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_ERROR} from '../../Common/Actions/Actions';
import { routeActions } from 'redux-simple-router';

// import commonReducer from '../Common/Actions/CommonReducer';

const STATES_FETCH = 'AD_CREATE_IMAGE/STATES_FETCH';
const SKU_FETCH = 'AD_VIEW_IMAGE/SKU_FETCH';
const BRAND_MANAGER_FETCH = 'AD_VIEW_IMAGE/BRAND_MANAGER_FETCH';
const BRANDS_FETCH = 'AD_CREATE_IMAGE/BRANDS_FETCH';
const BRAND_SELECT_FOR_SKU = 'AD_CREATE_IMAGE/BRAND_SELECT_FOR_SKU';
const BRAND_MANAGERS_FETCH = 'AD_CREATE_IMAGE/BRAND_MANAGERS_FETCH';
const AD_INFO = 'AD_CREATE_IMAGE/AD_INFO';
const AD_FETCH = 'AD_VIEW_IMAGE/AD_INFO';
const CITIES_VIEW = 'AD_CREATE_IMAGE/CITIES_VIEW';
const IMAGE_UPLOAD_SUCCESS = 'AD_CREATE_IMAGE/IMAGE_UPLOAD_SUCCESS';
const IMAGE_UPLOAD_ERROR = 'AD_CREATE_IMAGE/IMAGE_UPLOAD_ERROR';
const IMAGE_CANCEL = 'AD_CREATE_IMAGE/IMAGE_CANCEL';
const UPDATED_CITIES_SELECTION = 'AD_CREATE_IMAGE/UPDATED_CITIES_SELECTION';
const RESET = 'AD_CREATE_IMAGE/RESET';

/* ****** Action Creators ******** */


const brandManagerFetch = (brandId) => {
  return (dispatch, getState) => {
    /* Url */
    const url = Endpoints.db + '/table/brand_manager/select';
    const queryObj = {};
    queryObj.columns = ['*', {'name': 'brands', 'columns': ['*']}];
    queryObj.where = {'brands': {'brand_id': parseInt(brandId, 10)}};
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, BRAND_MANAGERS_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

export const fetchAd = (id) => {
  return (dispatch, getState) => {
    /* Url */
    const url = Endpoints.db + '/table/ad_image/select';
    const queryObj = {};
    queryObj.columns = ['*', {'name': 'cities', 'columns': [{'name': 'city', 'columns': ['*']}]}];
    queryObj.where = {'id': id};
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, AD_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]).then( () => {
      const brandManId = getState().viewImageAd_data.campaignDetails.brand_manager_id;
      const url1 = Endpoints.db + '/table/brand_manager/select';
      const queryObj1 = {};
      queryObj1.columns = ['name'];
      queryObj1.where = {'id': parseInt(brandManId, 10)};
      const options1 = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
        credentials: globalCookiePolicy,
        body: JSON.stringify(queryObj1),
      };
      dispatch(requestAction(url1, options1, BRAND_MANAGER_FETCH, REQUEST_ERROR));
    }).then( () => {
      const skuId = getState().viewImageAd_data.campaignDetails.sku_id;
      const url2 = Endpoints.db + '/table/sku/select';
      const queryObj2 = {};
      queryObj2.columns = ['volume', {'name': 'brand', 'columns': ['brand_name']}];
      queryObj2.where = {'id': parseInt(skuId, 10)};
      const options2 = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
        credentials: globalCookiePolicy,
        body: JSON.stringify(queryObj2),
      };
      dispatch(requestAction(url2, options2, SKU_FETCH, REQUEST_ERROR));
    });
  };
};

const fetchBrands = () => {
  return (dispatch, getState) => {
    /* Url */
    const url = Endpoints.db + '/table/brand/select';
    const queryObj = {};
    queryObj.columns = ['*', {'name': 'skus', 'columns': ['*']}];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, BRANDS_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};


const fetchStates = () => {
  return (dispatch, getState) => {
    /* Url */
    const url = Endpoints.db + '/table/state/select';
    const queryObj = {};
    queryObj.columns = ['*', {'name': 'cities', 'columns': ['*']}];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
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

const validBMId = (bmId) => {
  return (dispatch, getState) => {
    const url = Endpoints.db + '/table/brand_manager/select';
    const queryObj = {};
    queryObj.columns = ['id'];
    queryObj.where = {'$and': [{'id': parseInt(bmId, 10)}, {'is_disabled': false}]};
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
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

const insertCityMap = (adId) => {
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
      obj.ad_id = parseInt(adId, 10);
      obj.city_id = parseInt(cityId, 10);
      obj.created_at = new Date().toISOString();
      obj.updated_at = new Date().toISOString();
      adsData.push(obj);
    });
    const adImageUrl = Endpoints.db + '/table/ad_image_city/insert';
    const data = {};
    data.objects = adsData;
    data.returning = ['id'];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': state().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(data)
    };
    return dispatch(requestAction(adImageUrl, options)).then((resp) => {
      console.log(resp);
    }).catch((err) => {
      console.log(err);
      alert(err);
    });
  };
};

const insertAdData = (bmId, imgUrl, adInfo) => {
  return (dispatch, getState) => {
    // I need BrandManager ID, Image url.
    // I will return Ad Id, if success.
    // I will return Error message, if error.
    const adUrl = Endpoints.db + '/table/ad_image/insert';
    adInfo.image_url = imgUrl;
    adInfo.created_at = new Date().toISOString();
    adInfo.updated_at = new Date().toISOString();
    adInfo.brand_manager_id = parseInt(bmId, 10);
    adInfo.sku_id = parseInt(adInfo.sku_id, 10);
    adInfo.active_from = new Date(adInfo.active_from).toISOString();
    adInfo.active_to = new Date(adInfo.active_to).toISOString();
    delete adInfo.brand;
    console.log(adInfo);
    const adData = {};
    adData.objects = [adInfo];
    adData.returning = ['id'];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
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
    return Promise.all([
      dispatch(validBMId(lCamDetails.brand_manager_id)).then((res) => {
        if (res[0].length > 0) {
          return Promise.all([
            dispatch(insertAdData(res[0][0].id, imgUrl, lCamDetails)).then((insertRes) => {
              console.log('This is AdData:');
              console.log(insertRes);
              return Promise.all([
                dispatch(insertCityMap(insertRes.returning[0].id)).then(() => {
                  alert('Hurray!! Ad Created!');
                  return dispatch(routeActions.push('/hadmin/brands_offers_and_promos/view_all_ads'));
                }).catch((err) => {
                  alert(err);
                })
              ]);
            }).catch((err) => {
              alert(err);
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


const finalSave = () => {
  return (dispatch) => {
    return Promise.all([
      dispatch(checkBmEmail())
    ]);
  };
};


const adsViewImageReducer = (state = defaultcreateImageAdData, action) => {
  switch (action.type) {
    case BRAND_SELECT_FOR_SKU:
      let sb = {};
      state.brandsAll.forEach((brand) => {
        if (brand.id === parseInt(action.data, 10)) {
          sb = {...brand};
        }
      });
      return {...state, selectedBrand: sb};
    case BRANDS_FETCH:
      return {...state, brandsAll: action.data};
    case BRAND_MANAGERS_FETCH:
      return {...state, brandManagers: action.data};
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
    case AD_FETCH:
      console.log(action);
      const cmInfo = {};
      action.data[0].cities.forEach((city) => {
        cmInfo[city.city.id] = city.city;
      });
      delete action.data[0].cities;
      const campInfo = action.data[0];
      console.log(cmInfo);
      return { ...state, imageUrl: action.data[0].image_url, campaignDetails: { ...state.campaignDetails, ...campInfo}, selectedCities: { ...state.selectedCities, ...cmInfo}};
    case BRAND_MANAGER_FETCH:
      const brandManagerName = {'brand_manager': action.data[0].name};
      return { ...state, campaignDetails: { ...state.campaignDetails, ...brandManagerName}};
    case SKU_FETCH:
      const skuName = {'sku_name': action.data[0].volume, 'brand_name': action.data[0].brand.brand_name};
      return { ...state, campaignDetails: { ...state.campaignDetails, ...skuName}};
    case RESET:
      return {...defaultcreateImageAdData};
    case UPDATED_CITIES_SELECTION:
      return { ...state, selectedCities: {...action.data}};
    default: return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchStates,
  fetchBrands,
  AD_INFO,
  citiesViewHandler,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_ERROR,
  IMAGE_CANCEL,
  checkState,
  unCheckState,
  checkCity,
  unCheckCity,
  finalSave,
  brandManagerFetch,
  BRAND_SELECT_FOR_SKU,
  RESET
};

export default adsViewImageReducer;
