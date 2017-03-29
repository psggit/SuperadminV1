/*
 * Will receive default state from Common
 * */

import { defaultEditBrandManagerState } from '../../Common/Actions/DefaultState';
import requestAction from '../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_SUCCESS,
  COUNT_FETCHED,
  REQUEST_ERROR, RESET } from '../../Common/Actions/Actions';

import { routeActions } from 'redux-simple-router';
// import commonReducer from '../Common/Actions/CommonReducer';

const COMPANY_FETCH = 'EDIT_BM/BRAND_COMPANY_FETCH';
const BRANDS_FETCH = 'EDIT_BM/BRANDS_FETCH';
const BRAND_CONTAINER_VISIBILITY = 'EDIT_BM/BRAND_CONTAINER_VISIBILITY';
const BRAND_CURRENT_SELECTION = 'EDIT_BM/BRAND_CURRENT_SELECTION';
const REGION_CITIES_VIEW = 'EDIT_BM/REGION_CITIES_VIEW';
const SET_CONTAINER_TYPE = 'EDIT_BM/SET_CONTAINER_TYPE';
const UPDATE_REGION_SELECTION = 'EDIT_BM/UPDATE_REGION_SELECTION';
const UPDATE_SELECTED_BRANDS_LIST = 'EDIT_BM/UPDATE_SELECTED_BRANDS_LIST';
const BRAND_MANAGER_INFO_CHANGE = 'EDIT_BM/BRAND_MANAGER_INFO_CHANGE';
const BRAND_MANAGER_FETCH = 'EDIT_BM/BRAND_MANAGER_FETCH';

/* ****** Action Creators ******** */

const fetchBrands = (companyId) => {
  return (dispatch, getState) => {
    /* Url */
    const url = Endpoints.db + '/table/brand/select';
    const queryObj = {};
    queryObj.columns = ['*', {'name': 'regions', 'columns': ['region_name', 'id', { 'name': 'cities', 'columns': [{'name': 'city', 'columns': ['*', {'name': 'state', 'columns': ['id', 'state_name']}]}]}, {'name': 'managers', 'columns': [{'name': 'brand_manager', 'columns': ['name', 'email']}]}]}];
    queryObj.where = {'company_id': companyId, 'regions': {'id': {'$gt': 0}}};
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj)
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, BRANDS_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const fetchBManager = (bmId) => {
  return (dispatch, getState) => {
    const url = Endpoints.db + '/table/brand_manager/select';
    const queryObj = {};
    queryObj.columns = ['*', {
      'name': 'brands',
      'columns': ['*', {
        'name': 'brand',
        'columns': ['*']
      }, {
        'name': 'region',
        'columns': ['*', {
          'name': 'cities',
          'columns': ['*', {
            'name': 'city',
            'columns': ['*']
          }]
        }]
      }]
    }, {
      'name': 'company',
      'columns': ['*']
    }];
    queryObj.where = {'id': bmId};
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, BRAND_MANAGER_FETCH, REQUEST_ERROR)).then((resp) => {
        if (resp[0].company) {
          dispatch(fetchBrands(resp[0].company.id));
        }
      }),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const fetchCompany = () => {
  return (dispatch, getState) => {
    /* Url */
    const url = Endpoints.db + '/table/company/select';
    const queryObj = {};
    queryObj.columns = [
      '*'
    ];
    queryObj.where = {'brands': { 'id': {'$gt': 0 }}};
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
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
  return (dispatch, getState) => {
    const url = Endpoints.db + '/table/brand/insert';
    const insertObj = {};

    insertObj.objects = [brandObj];
    insertObj.returning = ['id'];

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(insertObj)
    };

    dispatch({type: MAKE_REQUEST});
    return dispatch(requestAction(url, options))
      .then((resp) => {
        if (resp.returning.length > 0) {
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

const sbListToOptions = (sbList, bmId, highestRole) => {
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
    headers: { 'Content-Type': 'application/json', 'x-hasura-role': highestRole },
    credentials: globalCookiePolicy,
    body: JSON.stringify(brData),
  };
  return brOptions;
};

const bmInfoUpdateOptions = (bmInfo, highestRole) => {
  bmInfo.is_disabled = (bmInfo.is_disabled === 'true') ? true : false;
  bmInfo.updated_at = new Date().toISOString();
  const bmData = {};
  bmData.values = bmInfo;
  bmData.where = {'id': bmInfo.id};
  delete bmInfo.id;
  bmData.returning = ['id'];
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-hasura-role': highestRole },
    credentials: globalCookiePolicy,
    body: JSON.stringify(bmData),
  };
  return options;
};

const bmInfoToOptions = (bmInfo, getState) => {
  bmInfo.is_disabled = (bmInfo.is_disabled === 'true') ? true : false;
  bmInfo.tm_id = 123456789;
  bmInfo.created_at = new Date().toISOString();
  bmInfo.updated_at = new Date().toISOString();
  const bmData = {};
  bmData.objects = [bmInfo];
  bmData.returning = ['id'];
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
    credentials: globalCookiePolicy,
    body: JSON.stringify(bmData),
  };
  return options;
};

const createBM = (bmInfo, sbList) => {
  return (dispatch, getState) => {
    const bmUrl = Endpoints.db + '/table/brand_manager/insert';
    const bmOptions = bmInfoToOptions(bmInfo, getState);
    return dispatch(requestAction(bmUrl, bmOptions)).then((response) => {
      if (response.returning !== undefined) {
        const brUrl = Endpoints.db + '/table/managers/insert';
        const brOptions = sbListToOptions(sbList, response.returning[0].id, getState().loginState.highestRole);
        dispatch(requestAction(brUrl, brOptions)).then((resp) => {
          console.log(resp);
          return Promise.all([
            dispatch(routeActions.push('/hadmin/brands_offers_and_promos/brand_managers_list')),
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

const updateBM = (mod) => {
  return (dispatch, getState) => {
    const bmUrl = Endpoints.db + '/table/brand_manager/update';
    const bmOptions = bmInfoUpdateOptions({...mod}, getState().loginState.highestRole);
    return dispatch(requestAction(bmUrl, bmOptions)).then((response) => {
      console.log(response);
    });
  };
};

// const deleteRegionsFunc = (dArr) => {
//   return (dispatch) => {
//     const delRegionUrl = Endpoints.db + '/table/managers/delete';
//     const dataArr = dArr.map((dId) => ({'id': dId}));
//     const data = {};
//     data.where = {'$or': dataArr};
//     data.returning = ['id'];
//     const options = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
//       credentials: globalCookiePolicy,
//       body: JSON.stringify(data),
//     };
//     console.log(options);
//     return dispatch(requestAction(delRegionUrl, options)).then((response) => {
//       console.log(response);
//     }).catch((resp) => {
//       console.log(JSON.stringify(resp));
//     });
//   };
// };

const insertRegionsFunc = (srList) => {
  return (dispatch, getState) => {
    if (srList.length > 0) {
      const insertRegionUrl = Endpoints.db + '/table/managers/insert';
      const brData = {};
      brData.objects = srList;
      brData.returning = ['id'];
      const brOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
        credentials: globalCookiePolicy,
        body: JSON.stringify(brData),
      };
      return dispatch(requestAction(insertRegionUrl, brOptions)).then((response) => {
        console.log(response);
      }).catch((resp) => {
        console.log(resp);
      });
    }
    alert('BrandManager Updated!');
  };
};

// const regionsUpdateOrDelete = (mod, bmId) => {
//   return (dispatch) => {
//     const modArr = [...mod];
//     const srListForCreate = [];     // array of region objects
//     const deleteRegionIds = [];     // array of region ids
//     const finalSelectedBrandsList = [];
//     modArr.forEach((brand) => {
//       const finalSBRegions = [];
//       if (brand.is_deleted) {
//         brand.regions.forEach((region) => {
//           deleteRegionIds.push(region.id);
//         });
//       } else {
//         brand.regions.forEach((region) => {
//           if (region.is_selected && region.in_db === undefined) {
//             // Create new
//             region.in_db = true;
//             const obj = {};
//             obj.brand_id = brand.id;
//             obj.brand_manager_id = bmId;
//             obj.region_id = region.id;
//             obj.created_at = new Date().toISOString();
//             obj.updated_at = new Date().toISOString();
//             srListForCreate.push(obj);
//           }
//           if (!region.is_selected && region.in_db !== undefined) {
//             // Delete existing
//             deleteRegionIds.push(region.id);
//           }
//           finalSBRegions.push(region);
//         });
//       }
//       brand.regions = [...finalSBRegions];
//       finalSelectedBrandsList.push(brand);
//     });
//     return Promise.all([
//       dispatch(deleteRegionsFunc([...deleteRegionIds])).then(
//         dispatch(insertRegionsFunc([...srListForCreate])),
//       dispatch({type: UPDATE_SELECTED_BRANDS_LIST, data: finalSelectedBrandsList}),
//       )
//     ]);
//   };
// };

const updateBrandManager = () => {
  // update B_M
  // insert or delete Managers
  return (dispatch, getState) => {
    const state_ = {...getState().edit_bm_data};
    const modSBList = [...state_.selectedBrandsList];
    const modBMInfo = {...state_.brandManagerInfo};
    delete modBMInfo.company;
    const bmUrl = Endpoints.backendUrl + '/hadmin/brand-manager/update';
    const insertObj = {mobile: modBMInfo.mobile_number,
      is_disabled: (modBMInfo.is_disabled === 'true') ? true : false,
      kyc_status: modBMInfo.kyc_status,
      brand_manager_id: modBMInfo.id,
      brands: []};
    modSBList.forEach((brand) => {
      const obj = {
        brand_id: '',
        region_id: []
      };
      brand.regions.forEach((region) => {
        if (region.is_selected) {
          obj.brand_id = brand.id;
          obj.region_id.push(region.id);
        }
      });
      if (obj.brand_id !== '') {
        insertObj.brands.push(obj);
      }
    });
    const brOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(insertObj),
    };
    console.log('----------------');
    dispatch(requestAction(bmUrl, brOptions)).then((resp) => {
      const message = 'ALERT : Creation Successful\n\n';
      console.log(resp);
      alert(message);
    }).catch((resp) => {
      let message = 'ALERT : Update Failed\n\n';
      message += 'Message : ';
      message += resp.message;
      alert(message);
    });
//    return Promise.all([
//      dispatch(updateBM(modBMInfo)),
//      dispatch(regionsUpdateOrDelete(modSBList, modBMInfo.id))
//    ]);
  };
};

/* Action Creators for Brand Management Listing */

const getBrandCount = () => {
  return (dispatch, getState) => {
    dispatch({ type: MAKE_REQUEST});
    // const payload = {'where': {'id': f}, 'columns': ['*']};
    const payload = {'columns': ['*']};
    const url = Endpoints.db + '/table/' + 'brand' + '/count';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
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
  return (dispatch, getState) => {
    dispatch({ type: MAKE_REQUEST});
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
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
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
    /*
    if (localReg.in_db) {
      localReg.is_selected = (localReg.oid === rid) ? !localReg.is_selected : localReg.is_selected;
    } else {
      localReg.is_selected = (localReg.id === rid) ? !localReg.is_selected : localReg.is_selected;
    }
    */
    console.log(sb, rid);
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
    let isPushed = true;
    if (selectedBrandsList.length === 0) {
      updatedBrandsList.push({...selectedBrand});
    } else {
      selectedBrandsList.map((brand) => {
        if (brand.id === selectedBrand.id) {
          isPushed = false;
          if (!isDelete) {
            updatedBrandsList.push({...selectedBrand});
          } else {
            updatedBrandsList.push({...selectedBrand, is_deleted: true});
          }
        } else {
          updatedBrandsList.push({...brand});
        }
      });
      if (isPushed) {
        updatedBrandsList.push({...selectedBrand});
      }
    }
    return Promise.all([
      dispatch({type: UPDATE_SELECTED_BRANDS_LIST, data: updatedBrandsList}),
      dispatch({type: BRAND_CONTAINER_VISIBILITY})
    ]);
  };
};

const getBMInfo = (respArr) => {
  const respObj = {...respArr[0]};
  delete respObj.brands;
  delete respObj.tm_id;
  return {...respObj};
};

const getSBList = (respArr) => {
  const managersList = [...respArr[0].brands];
  const tempObj = {};
  managersList.forEach((manager) => {
    const bid = manager.brand.id;
    if (tempObj[bid] === undefined && manager.is_active === true) {
      tempObj[bid] = {...manager.brand};
      const r = {...manager.region};
      r.is_selected = true;
      r.id = manager.region_id;
      tempObj[bid].regions = [{...r}];
    } else if (manager.is_active === true) {
      delete manager.brand;
      const r = {...manager.region};
      r.is_selected = true;
      r.id = manager.region_id;
      tempObj[bid].regions.push({...r});
    }
  });
  const finalArr = [];
  Object.keys(tempObj).forEach((key) => {
    finalArr.push(tempObj[key]);
  });
  return finalArr;
};

/* ****************** REDUCER ********************************* */

const editBrandManagerReducer = (state = defaultEditBrandManagerState, action) => {
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
    case BRAND_MANAGER_FETCH:
      const bmInfo_ = getBMInfo([...action.data]);
      const sbList = getSBList([...action.data]);
      return {...state, brandManagerInfo: bmInfo_, selectedBrandsList: sbList};
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
  updateBrandManager,
  BRAND_MANAGER_INFO_CHANGE,
  fetchBManager,
  updateBM,
  insertRegionsFunc,
  RESET
};

export default editBrandManagerReducer;
