/*
 * Will receive default state from Common
 */

import { defaultcreatePromoAdData} from '../../Common/Actions/DefaultState';
import requestAction from '../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_ERROR} from '../../Common/Actions/Actions';
import { routeActions } from 'redux-simple-router';

// import commonReducer from '../Common/Actions/CommonReducer';

const STATES_FETCH = 'AD_CREATE_PROMO/STATES_FETCH';
const CAMPAIGNS_FETCH = 'AD_CREATE_PROMO/CAMPAIGNS_FETCH';
const CAMPAIGN_SELECT_FOR_PROMO = 'AD_CREATE_PROMO/CAMPAIGN_SELECT_FOR_PROMO';
const AD_INFO = 'AD_CREATE_PROMO/AD_INFO';
const CITIES_VIEW = 'AD_CREATE_PROMO/CITIES_VIEW';
const IMAGE_UPLOAD_SUCCESS = 'AD_CREATE_PROMO/IMAGE_UPLOAD_SUCCESS';
const IMAGE_UPLOAD_ERROR = 'AD_CREATE_PROMO/IMAGE_UPLOAD_SUCCESS';
const IMAGE_CANCEL = 'AD_CREATE_PROMO/IMAGE_CANCEL';
const UPDATED_CITIES_SELECTION = 'AD_CREATE_PROMO/UPDATED_CITIES_SELECTION';
const RESET = 'AD_CREATE_PROMO/RESET';

/* ****** Action Creators ******** */

const fetchCampaigns = () => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/campaign/select';
    const queryObj = {};
    const now = new Date().toISOString();
    queryObj.columns = ['*',
      {'name': 'brand_manager', 'columns': ['*']},
      {'name': 'cashback_promos', 'columns': ['*',
        {'name': 'skus', 'columns': ['*',
          {'name': 'sku_pricing', 'columns': ['*',
            {'name': 'sku', 'columns': ['*',
              {'name': 'brand', 'columns': ['*']}
            ]}
          ]}
        ]}
      ]}
    ];
    queryObj.where = {'$and': [{'status': 'active'}, {'active_to': {'$gt': now}}]};
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, CAMPAIGNS_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

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
    const lstate = state().createPromoAd_data;
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
    const lstate = state().createPromoAd_data;
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
    const lstate = state().createPromoAd_data;
    const lCities = {...lstate.selectedCities};
    lCities[cityObj.id] = cityObj;
    return Promise.all([
      dispatch({type: UPDATED_CITIES_SELECTION, data: {...lCities}})
    ]);
  };
};

const unCheckCity = (cityObj) => {
  return (dispatch, state) => {
    const lstate = state().createPromoAd_data;
    const lCities = {...lstate.selectedCities};
    delete lCities[cityObj.id];
    return Promise.all([
      dispatch({type: UPDATED_CITIES_SELECTION, data: {...lCities}})
    ]);
  };
};

const insertCityMap = (adId) => {
  return (dispatch, state) => {
    // I need cityId, adId
    // [ad_id, city_id, created_at, updated_at]
    // I will return a list of Id's for all the maps, if success
    // An Error message if anything else
    const lstate = state().createPromoAd_data;
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
    const adImageUrl = Endpoints.db + '/table/ad_promo_city/insert';
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
    }).catch((err) => {
      console.log(err);
      alert(err);
    });
  };
};

const insertAdData = (imgUrl, adInfo, bminfo) => {
  return (dispatch) => {
    // I need Image url.
    // I will return Ad Id, if success.
    // I will return Error message, if error.
    const adUrl = Endpoints.db + '/table/ad_promo/insert';
    adInfo.image_url = imgUrl;
    adInfo.brand_manager_id = bminfo.id;
    adInfo.created_at = new Date().toISOString();
    adInfo.updated_at = new Date().toISOString();
    adInfo.cash_back_offer_sku_id = parseInt(adInfo.cash_back_offer_sku_id, 10);
    adInfo.active_from = new Date(adInfo.active_from).toISOString();
    adInfo.active_to = new Date(adInfo.active_to).toISOString();
    delete adInfo.campaign;
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

const checkBmId = () => {
  return (dispatch, state) => {
    const lstate = state().createPromoAd_data;
    const lCamDetails = {...lstate.campaignDetails};
    const lbmInfo = {...lstate.bmInfo};
    const imgUrl = lstate.imageUrl;
    const imgRe = /^.*?\:\/\/\/.*?\/\d+\/\w+\/.*$/;
    if (!imgRe.test(imgUrl)) {
      return Promise.all([
        alert('Please upload an image')
      ]);
    }
    return Promise.all([
      dispatch(insertAdData(imgUrl, lCamDetails, lbmInfo)).then((insertRes) => {
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
  };
};

const finalSave = () => {
  return (dispatch) => {
    return Promise.all([
      dispatch(checkBmId())
    ]);
  };
};

const getSkusFromCampaign = (sc) => {
  const finalSkus = {};
  sc.cashback_promos.forEach((cbPromo) => {
    cbPromo.skus.forEach((cbos) => {
      finalSkus[cbos.id] = cbos.sku_pricing.sku;
      finalSkus[cbos.id].name = cbos.sku_pricing.sku.brand.brand_name;
    });
  });
  return {...finalSkus};
};

const adsCreatePromoReducer = (state = defaultcreatePromoAdData, action) => {
  switch (action.type) {
    case CAMPAIGN_SELECT_FOR_PROMO:
      let sc = {};
      state.campaignsAll.forEach((c) => {
        if (c.id === parseInt(action.data, 10)) {
          sc = {...c};
        }
      });
      return {...state, skus: getSkusFromCampaign(sc), bmInfo: {...sc.brand_manager} };
    case CAMPAIGNS_FETCH:
      return {...state, campaignsAll: action.data};
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
    case RESET:
      return {...defaultcreatePromoAdData};
    default: return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchStates,
  fetchCampaigns,
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
  CAMPAIGN_SELECT_FOR_PROMO,
  RESET
};

export default adsCreatePromoReducer;
