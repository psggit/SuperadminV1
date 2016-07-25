/*
 * Will receive default state from Common
 * */

import { defaultCreateBrandManagerState } from '../../Common/Actions/DefaultState';
import requestAction from '../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_SUCCESS,
  COUNT_FETCHED,
  REQUEST_ERROR, RESET } from '../../Common/Actions/Actions';

import { routeActions } from 'redux-simple-router';
// import commonReducer from '../Common/Actions/CommonReducer';

const COMPANY_FETCH = 'BM_MANAGEMENT/BRAND_COMPANY_FETCH';
const BRANDS_FETCH = 'BM_MANAGEMENT/BRANDS_FETCH';
const BRAND_CONTAINER_VISIBILITY = 'BM_MANAGEMENT/BRAND_CONTAINER_VISIBILITY';
const BRAND_CURRENT_SELECTION = 'BM_MANAGEMENT/BRAND_CURRENT_SELECTION';
const REGION_CITIES_VIEW = 'BM_MANAGEMENT/REGION_CITIES_VIEW';
const SET_CONTAINER_TYPE = 'BM_MANAGEMENT/SET_CONTAINER_TYPE';
const UPDATE_REGION_SELECTION = 'BM_MANAGEMENT/UPDATE_REGION_SELECTION';
const UPDATE_SELECTED_BRANDS_LIST = 'BM_MANAGEMENT/UPDATE_SELECTED_BRANDS_LIST';
const BRAND_MANAGER_INFO_CHANGE = 'BM_MANAGEMENT/BRAND_MANAGER_INFO_CHANGE';

/* ****** Action Creators ******** */

const fetchBrands = (companyId) => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/brand/select';
    const queryObj = {};
    // queryObj.columns = [ '*' ];
    queryObj.columns = ['*', {'name': 'regions', 'columns': ['region_name', 'id', { 'name': 'cities', 'columns': [{'name': 'city', 'columns': ['*', {'name': 'state', 'columns': ['id', 'state_name']}]}]}]}];
    queryObj.where = {'company_id': companyId, 'regions': {'id': {'$gt': 0}}};
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, BRANDS_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED}),
      dispatch({type: UPDATE_SELECTED_BRANDS_LIST, data: []})
    ]);
  };
};

const fetchCompany = () => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/company/select';
    const queryObj = {};
    queryObj.columns = [
      '*'
    ];
    queryObj.where = {'brands': { 'id': {'$gt': 0 }}};
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, COMPANY_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const insertBrand = (brandObj) => {
  return (dispatch) => {
    const url = Endpoints.db + '/table/brand/insert';
    const insertObj = {};

    insertObj.objects = [brandObj];
    insertObj.returning = ['id'];

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(insertObj)
    };

    dispatch({type: MAKE_REQUEST});
    return dispatch(requestAction(url, options))
      .then((resp) => {
        if (resp.returning.length > 0) {
          console.log(resp);
          dispatch(routeActions.push('/hadmin/brand_management'));
        }
      })
      .catch((resp) => {
        console.log(resp);
        alert('Something wrong happened while creating a notepad entry');
        return dispatch({type: REQUEST_COMPLETED});
      });
  };
};

const brandContainerVisibility = (sb = false) => {
  return (dispatch) => {
    return Promise.all([
      dispatch({type: BRAND_CONTAINER_VISIBILITY}),
      dispatch({type: BRAND_CURRENT_SELECTION, data: (sb !== false) ? sb : {}}),
      dispatch({type: REGION_CITIES_VIEW, data: (sb !== false) ? sb : {}})
    ]);
  };
};

const setRegionCities = (brand) => {
  return (dispatch) => {
    return Promise.all([
      dispatch({type: BRAND_CURRENT_SELECTION, data: {...brand}})
    ]);
  };
};

const setViewCities = (region) => {
  return (dispatch) => {
    return Promise.all([
      dispatch({type: REGION_CITIES_VIEW, data: region})
    ]);
  };
};

const sbListToOptions = (sbList, bmId) => {
  const brData = {};
  brData.objects = [];
  sbList.forEach((brand)=> {
    brand.regions.forEach((region) => {
      if (region.is_selected) {
        const obj = {};
        obj.brand_id = brand.id;
        obj.brand_manager_id = bmId;
        obj.region_id = region.id;
        obj.created_at = new Date().toISOString();
        obj.updated_at = new Date().toISOString();
        brData.objects.push(obj);
      }
    });
  });
  const brOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: globalCookiePolicy,
    body: JSON.stringify(brData),
  };
  return brOptions;
};

const bmInfoToOptions = (bmInfo) => {
  bmInfo.is_disabled = (bmInfo.is_disabled === 'true') ? true : false;
  bmInfo.tm_id = 123456789;
  bmInfo.created_at = new Date().toISOString();
  bmInfo.updated_at = new Date().toISOString();
  console.log(bmInfo);
  const bmData = {};
  bmData.objects = [bmInfo];
  bmData.returning = ['id'];
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: globalCookiePolicy,
    body: JSON.stringify(bmData),
  };
  return options;
};

const createBM = (bmInfo, sbList) => {
  return (dispatch) => {
    const bmUrl = Endpoints.db + '/table/brand_manager/insert';
    const bmOptions = bmInfoToOptions(bmInfo);
    return dispatch(requestAction(bmUrl, bmOptions)).then((response) => {
      if (response.returning !== undefined) {
        console.log('Brand Manager Saved!!');
        const brUrl = Endpoints.db + '/table/managers/insert';
        const brOptions = sbListToOptions(sbList, response.returning[0].id);
        dispatch(requestAction(brUrl, brOptions)).then((resp) => {
          console.log('Brand Map Saved!!');
          console.log(resp);
          return Promise.all([
            dispatch(routeActions.push('/hadmin/brands_offers_and_promos/brand_manager_profile')),
            dispatch({type: REQUEST_COMPLETED})
          ]);
        }).catch((brResp) => {
          alert(JSON.stringify(brResp));
          return dispatch({type: REQUEST_COMPLETED});
        });
      }
    }).catch((bmResponse) => {
      alert(JSON.stringify(bmResponse));
      return Promise.all([
        dispatch({type: REQUEST_COMPLETED})
      ]);
    });
  };
};

const createBrandManager = (bmInfo, sbList) => {
  return (dispatch) => {
    return Promise.all([
      dispatch(createBM(bmInfo, sbList))
    ]);
  };
};

/* Action Creators for Brand Management Listing */

const getBrandCount = () => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': ['*']
    };

    const url = Endpoints.db + '/table/' + 'brand' + '/count';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    // return dispatch(requestAction(url, options, V_REQUEST_SUCCESS, V_REQUEST_ERROR));

    return fetch(url, options).then(
      (response) => {
        if (response.ok) { // 2xx status
          response.json().then(
            (d) => {
              return dispatch({type: COUNT_FETCHED, data: d});
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

const getBrandData = (page, limit) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    let offset = 0;
    // const count = currentProps.count;

    // limit = (page * 10) > count ? count : ((page) * 10);
    // limit = ((page) * 10);
    offset = (page - 1) * limit;

    const payload = {
      columns: ['*',
        {
          'name': 'category',
          'columns': ['*']
        },
        {
          'name': 'company',
          'columns': ['*']
        },
        {
          'name': 'genre',
          'columns': ['*']
        }
      ],
      limit: limit,
      offset: offset,
      order_by: '+id'
    };

    const url = Endpoints.db + '/table/' + 'brand' + '/select';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
                     return dispatch({type: REQUEST_SUCCESS, data: d});
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

const getAllBrandData = (page, limit) => {
  const gotPage = page;
  const gotLimit = limit;
  /* Dispatching first one */
  return (dispatch) => {
    dispatch(getBrandCount())
      .then(() => {
        return dispatch(getBrandData(gotPage, gotLimit));
      })
      .then(() => {
        console.log('Brand Data fetched');
      });
  };
};

const updateRegions = (sb, rid) => {
  const regionObj = [];
  sb.regions.forEach((region) => {
    let localReg = {};
    localReg = {...region};
    localReg.is_selected = (localReg.id === rid) ? !localReg.is_selected : localReg.is_selected;
    regionObj.push(localReg);
  });
  return regionObj;
};

const updateRegionSelection = (regionId, selectedBrand) => {
  return (dispatch) => {
    return Promise.all([
      dispatch({type: UPDATE_REGION_SELECTION, data: {sb: {...selectedBrand}, rid: regionId}})
    ]);
  };
};

const setContainerType = (t) => {
  return (dispatch) => {
    return dispatch({type: SET_CONTAINER_TYPE, data: t});
  };
};

const updateSelectedBrandsList = (selectedBrand, selectedBrandsList, isDelete = false) => {
  return (dispatch) => {
    // push or update the selectedBrandsList object
    const updatedBrandsList = [];
    if (selectedBrandsList.length === 0) {
      updatedBrandsList.push({...selectedBrand});
    } else {
      selectedBrandsList.map((brand) => {
        if (brand.id === selectedBrand.id) {
          if (!isDelete) {
            updatedBrandsList.push({...selectedBrand});
          }
        } else {
          updatedBrandsList.push({...brand});
        }
      });
    }
    return Promise.all([
      dispatch({type: UPDATE_SELECTED_BRANDS_LIST, data: updatedBrandsList}),
      dispatch({type: BRAND_CONTAINER_VISIBILITY})
    ]);
  };
};

/* ****************** REDUCER ********************************* */

const createBrandManagerReducer = (state = defaultCreateBrandManagerState, action) => {
  switch (action.type) {
    case COMPANY_FETCH:
      return {...state, companyList: action.data};
    case BRANDS_FETCH:
      return {...state, companyBrands: action.data, showBrandContainer: false};
    case BRAND_CONTAINER_VISIBILITY:
      return {...state, showBrandContainer: !state.showBrandContainer};
    case BRAND_CURRENT_SELECTION:
      return {...state, selectedBrand: action.data};
    case REGION_CITIES_VIEW:
      return {...state, regionCitiesView: action.data};
    case SET_CONTAINER_TYPE:
      return {...state, isExistingBrand: action.data};
    case UPDATE_REGION_SELECTION:
      return {...state, selectedBrand: { ...state.selectedBrand, regions: updateRegions(action.data.sb, action.data.rid)}};
    case UPDATE_SELECTED_BRANDS_LIST:
      return {...state, selectedBrandsList: action.data, selectedBrand: {}};
    case BRAND_MANAGER_INFO_CHANGE:
      const bmInfo = {};
      bmInfo[action.data.key] = action.data.value;
      return { ...state, brandManagerInfo: { ...state.brandManagerInfo, ...bmInfo}};
    default: return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchCompany,
  insertBrand,
  fetchBrands,
  getBrandData,
  getAllBrandData,
  brandContainerVisibility,
  setRegionCities,
  setViewCities,
  updateRegionSelection,
  updateSelectedBrandsList,
  setContainerType,
  createBrandManager,
  BRAND_MANAGER_INFO_CHANGE,
  RESET
};

export default createBrandManagerReducer;
