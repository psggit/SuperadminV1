/*
 * Will receive default state from Common
 */

import { defaultViewImageAdData} from '../../Common/Actions/DefaultState';
import requestAction from '../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_ERROR} from '../../Common/Actions/Actions';

// import commonReducer from '../Common/Actions/CommonReducer';

const AD_FETCH = 'AD_VIEW_IMAGE/AD_FETCH';

/* ****** Action Creators ******** */

const fetchAd = (adId) => {
  return (dispatch) => {
    const url = Endpoints.db + '/table/ad_image/select';
    const queryObj = {};
    queryObj.columns = ['*', {'name': 'cities', 'columns': ['*', {'name': 'city', 'columns': ['*']}]}];
    queryObj.where = {'id': adId};
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
        dispatch(requestAction(url, options, Ad_FETCH, REQUEST_ERROR)),
        dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const adsViewImageReducer = (state = defaultViewImageAdData, action) => {
  switch (action.type) {
    case AD_FETCH:
      const cD = action.data[0];
      // State city map, to make stateAll
      const stateAll = [];
      cd.cities.forEach((c) => {
        
      });
      delete cd.cities;
      return {...state, campaignDetails: action.data[0]};
    case CITIES_VIEW:
      return {...state, citiesView: action.data, hideCities: ''};
    default: return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchAd
};
export default adsViewImageReducer;
