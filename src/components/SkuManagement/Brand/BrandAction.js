/*
 * Will receive default state from Common
 * */

import { defaultBrandState } from '../../Common/Actions/DefaultState';
import { validation } from '../../Common/Actions/Validator';
import requestAction from '../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_SUCCESS,
  COUNT_FETCHED,
  REQUEST_ERROR, RESET } from '../../Common/Actions/Actions';

import { routeActions } from 'redux-simple-router';
// import commonReducer from '../Common/Actions/CommonReducer';

const BRAND_CATEGORY_FETCH = 'BRAND/BRAND_CATEGORY_FETCH';
const BRAND_GENRE_FETCH = 'BRAND/BRAND_GENRE_FETCH';
const BRAND_COMPANY_FETCH = 'BRAND/BRAND_COMPANY_FETCH';
const BRAND_STATE_FETCH = 'BRAND/BRAND_STATE_FETCH';
const BRAND_ORIGIN_FETCH = 'BRAND/BRAND_ORIGIN_FETCH';

const VIEW_STATE = 'BRAND/VIEW_STATE';
const TOGGLE_REGION_VISIBILITY = 'BRAND/TOGGLE_REGION_VISIBILITY';
const REGION_INPUT_CHANGED = 'BRAND/REGION_INPUT_CHANGED';

/* Region Related */

const MARK_CITY_SELECTED = 'BRAND/MARK_CITY_SELECTED';
const UNMARK_CITY_SELECTED = 'BRAND/UNMARK_CITY_SELECTED';

const SAVE_TO_LOCAL = 'BRAND/SAVE_TO_LOCAL';
const VIEW_REGION = 'BRAND/VIEW_REGION';
const DELETE_REGION = 'BRAND/DELETE_REGION';
const CANCEL_REGION = 'BRAND/CANCEL_REGION';

const BRAND_CREATED = 'Brand/BRAND_CREATED';

/* Editing Action Constants */

const BRAND_FETCHED = 'Brand/BRAND_FETCHED';
const NOTHING_CHANGED = 'Brand/NOTHING_CHANGED';
const CLEAR_STORED_LOCAL_UPDATED_REGIONS = 'Brand/CLEAR_STORED_LOCAL_UPDATED_REGIONS';

const INPUT_VALUE_CHANGED = '@category/INPUT_VALUE_CHANGED';

const IMAGE_UPLOAD_SUCCESS = '@category/IMAGE_UPLOAD_SUCCESS';
const IMAGE_UPLOAD_ERROR = '@category/IMAGE_UPLOAD_ERROR';
const CANCEL_IMAGE = '@category/CANCEL_IMAGE';

import beginFilter from '../../Common/SearchComponentGen/GenerateFilter';

/* End of it */

/* ****** Action Creators ******** */

const fetchCategory = () => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/category/select';
    const queryObj = {};
    queryObj.columns = [
      '*'
    ];
    queryObj.where = {
      'is_active': true
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch(requestAction(url, options, BRAND_CATEGORY_FETCH, REQUEST_ERROR));
  };
};

const fetchGenre = () => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/genre/select';
    const queryObj = {};
    queryObj.columns = [
      '*'
    ];
    queryObj.where = {
      'is_active': true
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    dispatch(requestAction(url, options, BRAND_GENRE_FETCH, REQUEST_ERROR));
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
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    // dispatch({type: MAKE_REQUEST});
    dispatch(requestAction(url, options, BRAND_COMPANY_FETCH, REQUEST_ERROR));
  };
};

const fetchOrigin = () => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/origin/select';
    const queryObj = {};
    queryObj.columns = [
      '*'
    ];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    // dispatch({type: MAKE_REQUEST});
    dispatch(requestAction(url, options, BRAND_ORIGIN_FETCH, REQUEST_ERROR));
  };
};

const fetchState = () => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/state/select';
    const queryObj = {};
    queryObj.columns = [
      '*',
      {
        'name': 'cities',
        'columns': [
          '*'
        ]
      }
    ];
    queryObj.where = {
      'cities': {
        'id': {
          '$gt': 0
        }
      }
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    // dispatch({type: MAKE_REQUEST});
    dispatch(requestAction(url, options, BRAND_STATE_FETCH, REQUEST_ERROR));
  };
};

const fetchBrand = (Id) => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/brand/select';
    const queryObj = {};
    queryObj.columns = [
      '*',
      {
        'name': 'category',
        'columns': [
          'id',
          'genre_short_name'
        ]
      },
      {
        'name': 'regions',
        'columns': [
          '*',
          {
            'name': 'cities',
            'columns': ['*', {
              'name': 'city',
              'columns': ['*', {
                'name': 'state_short',
                'columns': ['id', 'short_name', 'state_name']
              }]
            }]
          }
        ]
      }
    ];
    queryObj.where = {
      'id': parseInt(Id, 10)
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch(requestAction(url, options, BRAND_FETCHED, REQUEST_ERROR));
  };
};

const viewState = (stateId) => {
  return { type: VIEW_STATE, data: stateId };
};

/* Indexing Brand */

const indexSku = ( brandIds ) => {
  return ( dispatch ) => {
    const brandSkuIndex = Endpoints.blogicUrl + '/admin/update_index/index/brand';

    /* This will never happen */
    // if ( brandIds.length === 0 ) {
    //   return Promise.reject('Brand cannot be empty to index');
    // }

    const skuIndexObj = {
      'ids': [ brandIds ]
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(skuIndexObj)
    };

    return dispatch(requestAction(brandSkuIndex, options));
  };
};

/* */

const insertBrand = () => {
  const listOfValidation = [];
  return (dispatch, getState) => {
    listOfValidation.push(validation(getState().brand_data.brandName, 'non_empty_text'));
    listOfValidation.push(validation(getState().brand_data.companyId, 'number'));
    listOfValidation.push(validation(getState().brand_data.categoryId, 'number'));
    listOfValidation.push(validation(getState().brand_data.alcoholPer, 'non_empty_text'));
    listOfValidation.push(validation(getState().brand_data.temperature, 'non_empty_text'));
    Promise.all(listOfValidation
    ).then(() => {
      const url = Endpoints.db + '/table/brand/insert';
      const insertObj = {};
      const currState = getState().brand_data;

      const brandObj = {};
      brandObj.brand_name = currState.brandName;
      brandObj.company_id = parseInt(currState.companyId, 10);
      brandObj.category_id = parseInt(currState.categoryId, 10);
      brandObj.image = currState.image;
      brandObj.short_name = currState.brandName.replace(' ', '-').toLowerCase();
      brandObj.is_active = true;
      brandObj.alcohol_per = currState.alcoholPer;
      brandObj.temperature = currState.temperature;
      brandObj.cal_per = currState.caloriesPer;
      brandObj.cal_total = currState.caloriesTotal;
      brandObj.origin_name = currState.origin;
      brandObj.description = currState.description;
      brandObj.created_at = new Date().toISOString();
      brandObj.updated_at = new Date().toISOString();

      if ( Object.keys(brandObj).filter( ( element ) => { console.log(Object.keys(brandObj)); console.log(brandObj[element]); return !brandObj[element];}).length >= 1 ) {
        alert('All the entries are important for brand creation');
        return dispatch({ type: NOTHING_CHANGED });
      }


      insertObj.objects = [brandObj];
      insertObj.returning = ['id'];

      let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin' },
        credentials: globalCookiePolicy,
        body: JSON.stringify(insertObj)
      };
      const regionNameIdMapping = {};
      let brandId = 0;

      dispatch({type: MAKE_REQUEST});
      return dispatch(requestAction(url, options))
        .then((resp) => {
          if (resp.returning.length > 0) {
            console.log(resp);
            brandId = resp.returning[0].id;
            const regionUrl = Endpoints.db + '/table/region/insert';
            /* Make an entry into the store */
            dispatch({ type: BRAND_CREATED, data: brandId});
            /* Create region Objects */

            let regionObj = {};
            const regionObjs = {};
            regionObjs.objects = [];
            regionObjs.returning = ['id', 'region_name'];
            /* Check for the existence of the region */
            Object.keys(currState.region).forEach( ( reg ) => {
              if ( reg > 10000000 ) {
                regionNameIdMapping[currState.region[reg]] = reg;
                regionObj = {};
                regionObj.brand_id = brandId;
                regionObj.region_name = currState.region[reg];
                regionObj.status = true;
                regionObj.created_at = new Date().toISOString();
                regionObj.updated_at = new Date().toISOString();
                regionObjs.objects.push(regionObj);
              }
            });
            options = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin' },
              credentials: globalCookiePolicy,
              body: JSON.stringify(regionObjs)
            };
            if ( regionObjs.objects.length === 0) {
              return { 'returnit': true };
            }
            return dispatch(requestAction(regionUrl, options));
          }
        })
        .then( ( resp ) => {
          if ( resp.returnit ) {
            return {'success': true};
          }
          const regionTempToMainMapping = {};
          resp.returning.forEach( ( item ) => {
            regionTempToMainMapping[regionNameIdMapping[item.region_name]] = item.id;
          });

          let regionCityObj = {};
          const regionCityObjs = {};
          const regionCityUrl = Endpoints.db + '/table/region_city/insert';
          regionCityObjs.objects = [];
          regionCityObjs.returning = ['id'];

          /* Handle error condition for empty dict mapping */

          Object.keys(currState.regionCity).forEach( ( regionC ) => {
            if ( regionC > 100000000 ) {
              const cities = currState.regionCity[regionC];
              Object.keys(cities).forEach( ( city ) => {
                regionCityObj = {};
                regionCityObj.region_id = regionTempToMainMapping[regionC];
                regionCityObj.brand_id = brandId;
                regionCityObj.city_id = parseInt(city, 10);
                regionCityObjs.objects.push(regionCityObj);
              });
            }
          });

          options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin' },
            credentials: globalCookiePolicy,
            body: JSON.stringify(regionCityObjs)
          };
          return dispatch(requestAction(regionCityUrl, options));
        })
        .then( () => {
          alert('brand Created Successfully');
          return Promise.all([
            dispatch(routeActions.push('/hadmin/brand_management')),
            dispatch(indexSku(brandId))
          ]);
          // }
          // if ( resp.returning.length > 0) {
          //   alert('brand Created Successfully');
          //   return dispatch(routeActions.push('/hadmin/brand_management'));
          // }
          // alert('something went wrong while creating brand');
          // return dispatch({type: REQUEST_COMPLETED});
        })
        .catch((resp) => {
          console.log(resp);
          alert('Something wrong happened while creating a brand entry');
          return dispatch({type: REQUEST_COMPLETED});
        });
    })
    .catch((error) => {
      console.log(error);
      console.log('Error Occured');
    });
  };
};

const updateBrand = () => {
  const listOfValidation = [];
  return (dispatch, getState) => {
    listOfValidation.push(validation(getState().brand_data.brandName, 'non_empty_text'));
    listOfValidation.push(validation(getState().brand_data.companyId, 'number'));
    listOfValidation.push(validation(getState().brand_data.categoryId, 'number'));
    listOfValidation.push(validation(getState().brand_data.alcoholPer, 'non_empty_text'));
    listOfValidation.push(validation(getState().brand_data.temperature, 'non_empty_text'));
    Promise.all(listOfValidation
    ).then(() => {
      const url = Endpoints.db + '/table/brand/update';
      const updateObj = {};
      const currState = getState().brand_data;

      const brandObj = {};
      brandObj.brand_name = currState.brandName;
      brandObj.company_id = parseInt(currState.companyId, 10);
      brandObj.category_id = parseInt(currState.categoryId, 10);
      brandObj.image = currState.image;
      brandObj.short_name = currState.brandName.replace(' ', '-').toLowerCase();
      brandObj.is_active = true;
      brandObj.alcohol_per = currState.alcoholPer;
      brandObj.temperature = currState.temperature;
      brandObj.cal_per = currState.caloriesPer;
      brandObj.cal_total = currState.caloriesTotal;
      brandObj.origin_name = currState.origin;
      brandObj.description = currState.description;
      brandObj.updated_at = new Date().toISOString();

      updateObj.values = brandObj;
      updateObj.where = {
        'id': currState.brandId
      };
      updateObj.returning = ['id'];

      let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin' },
        credentials: globalCookiePolicy,
        body: JSON.stringify(updateObj)
      };
      const regionNameIdMapping = {};
      let brandId = 0;

      dispatch({type: MAKE_REQUEST});
      return dispatch(requestAction(url, options))
        .then((resp) => {
          if (resp.returning.length > 0) {
            console.log(resp);
            brandId = currState.brandId;
            const regionUrl = Endpoints.db + '/table/region/insert';
            /* Make an entry into the store */
            // dispatch({ type: BRAND_CREATED, data: brandId});
            /* Create region Objects */

            let regionObj = {};
            const regionObjs = {};
            regionObjs.objects = [];
            regionObjs.returning = ['id', 'region_name'];
            /* Check for the existence of the region */
            Object.keys(currState.region).forEach( ( reg ) => {
              if ( reg > 10000 ) {
                regionNameIdMapping[currState.region[reg]] = reg;
                regionObj = {};
                regionObj.brand_id = brandId;
                regionObj.region_name = currState.region[reg];
                regionObj.status = true;
                regionObj.created_at = new Date().toISOString();
                regionObj.updated_at = new Date().toISOString();
                regionObjs.objects.push(regionObj);
              }
            });
            /* If regions are not updated then exit here */
            if ( regionObjs.objects.length === 0) {
              alert('Brand Successfully Updated');
              return Promise.all([
                Promise.reject( { 'intended': true } ),
                dispatch(indexSku(brandId)),
                dispatch(fetchBrand(brandId))
              ]);
            }
            options = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin'},
              credentials: globalCookiePolicy,
              body: JSON.stringify(regionObjs)
            };
            return dispatch(requestAction(regionUrl, options));
          }
        })
        .then( ( resp ) => {
          const regionTempToMainMapping = {};
          resp.returning.forEach( ( item ) => {
            regionTempToMainMapping[regionNameIdMapping[item.region_name]] = item.id;
          });

          let regionCityObj = {};
          const regionCityObjs = {};
          const regionCityUrl = Endpoints.db + '/table/region_city/insert';
          regionCityObjs.objects = [];
          regionCityObjs.returning = ['id'];

          /* Handle error condition for empty dict mapping */

          Object.keys(currState.regionCity).forEach( ( regionC ) => {
            if ( regionC > 100000000 ) {
              const cities = currState.regionCity[regionC];
              Object.keys(cities).forEach( ( city ) => {
                regionCityObj = {};
                regionCityObj.region_id = regionTempToMainMapping[regionC];
                regionCityObj.brand_id = brandId;
                regionCityObj.city_id = parseInt(city, 10);
                regionCityObjs.objects.push(regionCityObj);
              });
            }
          });

          options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin'},
            credentials: globalCookiePolicy,
            body: JSON.stringify(regionCityObjs)
          };
          return dispatch(requestAction(regionCityUrl, options));
        })
        .then( (resp) => {
          if ( resp.returning.length > 0) {
            alert('brand Created Successfully');
            return Promise.all([
              dispatch(indexSku(brandId)),
              dispatch(routeActions.push('/hadmin/brand_management'))
            ]);
          }
          alert('something went wrong while creating brand');
          return dispatch({type: REQUEST_COMPLETED});
        })
        .catch((resp) => {
          console.log(resp);
          if ( !resp.intended ) {
            alert('Something wrong happened while creating a brand entry');
          }
          return dispatch({type: REQUEST_COMPLETED});
        });
    })
    .catch((error) => {
      alert(error);
    });
  };
};

const updateRegion = () => {
  return (dispatch, getState) => {
    /* Check if anything is updated or not */
    const currState = getState().brand_data;
    console.log('----------------');
    console.log(getState().brand_data);
    console.log('----------------');
    let options = {};

    if ( !(currState.viewedRegionId in currState.updatedRegions )) {
      alert('Region hasnt updated');
      return dispatch({ type: NOTHING_CHANGED });
    }


    const dummyRegionId = currState.updatedRegions[currState.viewedRegionId];
    const isRegionUpdated = !(currState.region[currState.viewedRegionId] === currState.updatedRegionReference[dummyRegionId]);
    const isCityAdded = !!( Object.keys(currState.regionCityUpdated[dummyRegionId].insertedCities).length );
    const isCityDeleted = !!( Object.keys(currState.regionCityUpdated[dummyRegionId].deletedCities).length );
    console.log('regionupdated' + isRegionUpdated);
    console.log('cityUpdated' + isCityAdded);
    console.log('cityDeleted' + isCityDeleted);

    if ( !(isRegionUpdated || isCityAdded || isCityDeleted )) {
      alert('Region hasnt updated');
      return dispatch({ type: NOTHING_CHANGED });
    }
    const regionUpdated = () => {
      const regionUrl = Endpoints.db + '/table/region/update';
      const regionUpdateObj = {};
      regionUpdateObj.values = {
        'region_name': currState.updatedRegionReference[dummyRegionId]
      };
      regionUpdateObj.where = {
        id: currState.viewedRegionId
      };
      options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin'},
        credentials: globalCookiePolicy,
        body: JSON.stringify(regionUpdateObj)
      };
      return dispatch(requestAction(regionUrl, options));
    };
    const cityAdded = () => {
      if (isCityAdded) {
        const regionCityUrl = Endpoints.db + '/table/region_city/insert';
        const regionUpdateObjs = {};
        regionUpdateObjs.objects = [];
        regionUpdateObjs.returning = ['id'];
        const cities = currState.regionCityUpdated[dummyRegionId].insertedCities;
        Object.keys(cities).forEach( ( city ) => {
          const regionCityObj = {};
          regionCityObj.city_id = parseInt(city, 10);
          regionCityObj.brand_id = currState.brandId;
          regionCityObj.region_id = currState.viewedRegionId;
          regionUpdateObjs.objects.push(regionCityObj);
        });
        options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin'},
          credentials: globalCookiePolicy,
          body: JSON.stringify(regionUpdateObjs)
        };
        dispatch(requestAction(regionCityUrl, options));
      }
      return [];
    };
    const cityDeleted = () => {
      if ( isCityDeleted ) {
        const regionCityDUrl = Endpoints.db + '/table/region_city/delete';
        const regionUpdateDObjs = {};
        regionUpdateDObjs.where = {
          '$or': []
        };
        regionUpdateDObjs.returning = ['id'];
        const cities = currState.regionCityUpdated[dummyRegionId].deletedCities;
        Object.keys(cities).forEach( ( city ) => {
          const regionCityObj = {};
          regionCityObj.city_id = parseInt(city, 10);
          regionUpdateDObjs.where.$or.push(regionCityObj);
        });
        options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin'},
          credentials: globalCookiePolicy,
          body: JSON.stringify(regionUpdateDObjs)
        };
        return dispatch(requestAction(regionCityDUrl, options));
      }
      return [];
    };
    const finishOff = () => {
      dispatch({ type: CLEAR_STORED_LOCAL_UPDATED_REGIONS });
      return dispatch(fetchBrand(currState.brandId));
    };
    regionUpdated()
      .then(cityAdded)
      .then(cityDeleted)
      .then(finishOff)
      .catch( () => {
        alert('something wrong happened while updating the region');
      });
    /* If nothing  */
  };
};

/* Action Creators for Brand Management Listing */

const getBrandCount = ( filterObj, isSearched ) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': ['*']
    };

    if ( isSearched ) {
      payload.where = { ...payload.where, ...filterObj };
    }

    const url = Endpoints.db + '/table/' + 'brand' + '/count';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin'},
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

const getBrandData = (page, limit, filterObj, isSearched ) => {
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
          'columns': ['*',
            {
              'name': 'genre_short',
              'columns': ['*']
            }
          ]
        },
        {
          'name': 'company',
          'columns': ['*']
        }
      ],
      limit: limit,
      offset: offset,
      order_by: '+id'
    };

    if ( isSearched ) {
      payload.where = { ...payload.where, ...filterObj };
    }

    const url = Endpoints.db + '/table/' + 'brand' + '/select';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin'},
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
  return (dispatch, getState ) => {
    const filterData = getState().gen_filter_data;
    const filterObj = { ...beginFilter(getState) };
    dispatch(getBrandCount( filterObj, filterData.isSearched ))
      .then(() => {
        return dispatch(getBrandData(gotPage, gotLimit, filterObj, filterData.isSearched));
      })
      .then(() => {
        console.log('Brand Data fetched');
      });
  };
};

/* EDITING RELATED FUNCTIONS */
const deleteRegionFromServer = () => {
  return ( dispatch, getState ) => {
    const currState = getState().brand_data;
    const regionId = currState.viewedRegionId;
    const regionCityUrl = Endpoints.db + '/table/region_city/delete';

    const deleteObj = {};
    deleteObj.where = {
      region_id: parseInt(regionId, 10)
    };
    deleteObj.returning = ['id'];

    let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin'},
      credentials: globalCookiePolicy,
      body: JSON.stringify(deleteObj)
    };

    dispatch({type: MAKE_REQUEST});
    return dispatch(requestAction(regionCityUrl, options))
      .then( ( resp ) => {
        if ( resp.returning.length > 0) {
          const regionUrl = Endpoints.db + '/table/region/delete';
          deleteObj.where = {
            id: regionId
          };
          deleteObj.returning = ['id'];
          options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: globalCookiePolicy,
            body: JSON.stringify(deleteObj)
          };
          return dispatch(requestAction(regionUrl, options));
        }
        throw Error('something went wrong while deleting region city');
        /* Dispatch default event */
      })
      .then( (resp) => {
        if ( resp.returning.length > 0 ) {
          alert('successfully deleted');
          return Promise.all([
            dispatch({ type: CANCEL_REGION }),
            dispatch(fetchBrand(currState.brandId))
          ]);
        }
        throw Error('something went wrong while deleting region');
      })
      .catch( ( resp ) => {
        console.log(resp);
        alert('something went wrong while deleting region city');
      });
  };
};

/* END OF IT */

/* End of it */


/* ****************** END OF ACTION CREATORS ****************** */

/* ****************** REDUCER ********************************* */

/* ======= Start of normal functions ======= */

const manageAddCities = ( cityId, regionId, state, newUpdatedRegionObj) => {
  /*
   * 1. Check if the city was already there, unselected and selected again (Delete it from the deleted list
   * 2. Add to new cities, add to new list
  */
  console.log(newUpdatedRegionObj);
  const dummyRegionId = state.updatedRegions[regionId] ? state.updatedRegions[regionId] : newUpdatedRegionObj.regionId;
  const regionCityUObj = {};
  /* Check for non-existence */
  const checkExistenceRegion = () => {
    return ( !(dummyRegionId in state.regionCityUpdated )) ? newUpdatedRegionObj.regionCityUpdated[dummyRegionId] : state.regionCityUpdated[dummyRegionId];
  };

  let wasCityAvailable = false;
  regionCityUObj[dummyRegionId] = checkExistenceRegion();
  const checkExistenceCity = () => {
    return ( cityId in state.regionCity[regionId] );
  };

  const returnAfterDeleting = () => {
    delete regionCityUObj[dummyRegionId].deletedCities[cityId];
    return regionCityUObj;
  };

  const returnAfterInserting = () => {
    if ( 'insertedCities' in regionCityUObj[dummyRegionId] ) {
      regionCityUObj[dummyRegionId].insertedCities[cityId] = state.viewedState.stateInfo.id;
    } else {
      regionCityUObj[dummyRegionId].insertedCities = {};
      regionCityUObj[dummyRegionId].insertedCities[cityId] = state.viewedState.stateInfo.id;
    }
    return regionCityUObj;
  };

  wasCityAvailable = checkExistenceCity();
  return ( wasCityAvailable ) ?
  { ...state, regionCityUpdated: { ...state.regionCityUpdated, ...returnAfterDeleting() }, ...newUpdatedRegionObj }
  : { ...state, regionCityUpdated: { ...state.regionCityUpdated, ...returnAfterInserting() }, ...newUpdatedRegionObj};
};

const manageDeleteCities = ( cityId, regionId, state, newUpdatedRegionObj) => {
  /*
   * 1. Check if the city was already there, unselected and selected again (Delete it from the deleted list
   * 2. Add to new cities, add to new list
  */
  const dummyRegionId = state.updatedRegions[regionId] ? state.updatedRegions[regionId] : newUpdatedRegionObj.regionId;
  const regionCityUObj = {};
  /* Check for non-existence */
  const checkExistenceRegion = () => {
    return ( !(dummyRegionId in state.regionCityUpdated )) ? newUpdatedRegionObj.regionCityUpdated[dummyRegionId] : state.regionCityUpdated[dummyRegionId];
  };

  let wasCityAvailable = false;
  regionCityUObj[dummyRegionId] = checkExistenceRegion();
  const checkExistenceCity = () => {
    return ( cityId in state.regionCity[regionId] );
  };

  const returnAfterDeleting = () => {
    delete regionCityUObj[dummyRegionId].insertedCities[cityId];
    return regionCityUObj;
  };

  const returnAfterInserting = () => {
    if ( 'deletedCities' in regionCityUObj[dummyRegionId] ) {
      regionCityUObj[dummyRegionId].deletedCities[cityId] = state.viewedState.stateInfo.id;
    } else {
      regionCityUObj[dummyRegionId].deletedCities = {};
      regionCityUObj[dummyRegionId].deletedCities[cityId] = state.viewedState.stateInfo.id;
    }
    return regionCityUObj;
  };

  wasCityAvailable = checkExistenceCity();
  return ( !wasCityAvailable ) ?
  { ...state,
    regionCityUpdated: { ...state.regionCityUpdated, ...returnAfterDeleting() },
    ...newUpdatedRegionObj
  }
  : { ...state, regionCityUpdated: { ...state.regionCityUpdated, ...returnAfterInserting() }, ...newUpdatedRegionObj};
};

const checkAndCleanRegions = ( regionId, state, regionCityUpdatedMaster, value) => {
  /*
   * Check if the region has gotten back to the normal state
   * 1. Conflict_1: If cities are modified too. If there are no modified cities then delete it
  */

  const updatedRegions = Object.assign({}, state.updatedRegions);
  const updatedRegionReference = Object.assign({}, state.updatedRegionReference);

  let currentRegionCount = state.regionId;

  const regionCityUpdated = Object.assign( {}, state.regionCityUpdated[state.updatedRegions[regionId]] );

  if ( (
     regionCityUpdated.insertedCities
     ||
     regionCityUpdated.deletedCities
     )
   && (
     !Object.keys(regionCityUpdated.insertedCities).length
     &&
     !Object.keys(regionCityUpdated.deletedCities).length
     )
   ) {
    delete regionCityUpdatedMaster[state.updatedRegions[regionId]];
    delete updatedRegionReference[state.updatedRegions[regionId]];
    delete updatedRegions[regionId];

    currentRegionCount -= 1;
    return {
      regionCityUpdated: regionCityUpdatedMaster,
      updatedRegionReference: updatedRegionReference,
      updatedRegions: updatedRegions,
      regionId: currentRegionCount
    };
  }

  /* If not deleting change the value of the thing */
  updatedRegionReference[updatedRegions[regionId]] = value;
  /* End of it*/

  return {
    updatedRegionReference: updatedRegionReference,
    updatedRegions: updatedRegions
  };
};

const addNewUpdatedRegionEntry = ( state, value, regionId) => {
  let currentRegionCount = state.regionId;
  const regionCityUpdatedLocal = {};
  const updatedRegion = {};
  const updatedRegions = Object.assign({}, state.updatedRegions);
  if ( regionId in updatedRegions ) {
    updatedRegion[updatedRegions[regionId]] = value;
    return {
      updatedRegionReference: { ...state.updatedRegionReference, ...updatedRegion }
    };
  }
  updatedRegion[state.regionId + 1] = value;
  updatedRegions[regionId] = state.regionId + 1;
  regionCityUpdatedLocal[state.regionId + 1] = {};
  regionCityUpdatedLocal[state.regionId + 1].insertedCities = {};
  regionCityUpdatedLocal[state.regionId + 1].deletedCities = {};

  currentRegionCount += 1;
  return {
    updatedRegions: updatedRegions,
    updatedRegionReference: updatedRegion,
    regionCityUpdated: regionCityUpdatedLocal,
    regionId: currentRegionCount
  };
};

const createOrUpdateRegion = ( regionId, value, state ) => {
  // let regionCityUpdatedLocal = {};
  let checkAndCleanObjs = {};
  let returnObj = {};
  const regionCityUpdatedMaster = Object.assign( {}, state.regionCityUpdated );
  /* Obj
   * */
  if (state.region[regionId] !== value) {
    /* Create a new region and map it here */
    console.log('Here you go Now');
    returnObj = addNewUpdatedRegionEntry(state, value, regionId);
  } else {
    /*
     * If the value is same check if the entry was made before to the respective table and delete it if there is no conflict
     * 1. Conflict_1: If cities are modified too. If there are no modified cities then delete it
     */
    console.log('Here you go');

    // regionCityUpdatedLocal = {};
    // regionCityUpdatedLocal[state.updatedRegions[state.regionId]] = Object.keys({}, state.regionCityUpdated[state.updatedRegions[regionId]]);
    checkAndCleanObjs = checkAndCleanRegions( regionId, state, regionCityUpdatedMaster, value);
    // checkAndCleanObjs.regionCityUpdated = { ...state.regionCityUpdated, ...regionCityUpdatedLocal };

    // delete updatedRegions[regionId];
  }
  return {
    ...returnObj,
    ...checkAndCleanObjs
  };
};
/* ====== End of functions */

const brandReducer = (state = defaultBrandState, action) => {
  let region = {};
  let selectedCity = {};
  let regionCity = {};
  switch (action.type) {
    case BRAND_CATEGORY_FETCH:
      return {...state, categoryList: action.data};
    case BRAND_GENRE_FETCH:
      return {...state, genreList: action.data};
    case BRAND_ORIGIN_FETCH:
      return {...state, originList: action.data};
    case BRAND_COMPANY_FETCH:
      return {...state, companyList: action.data};
    case BRAND_STATE_FETCH:
      let countState = 0;
      const stateCityMapping = {};
      while ( countState < action.data.length) {
        stateCityMapping[action.data[countState].id] = {
          is_selected: true,
          selected_cities: {},
          duty_free: 0,
          duty_paid: 0,
          cities: action.data[countState].cities,
          stateInfo: action.data[countState],
          updatedCities: {}
        };
        countState++;
      }
      return {...state, stateList: action.data, stateCityMapping: stateCityMapping};
    case VIEW_STATE:
      return {...state, viewedState: state.stateCityMapping[action.data], viewedCity: {}};
    case TOGGLE_REGION_VISIBILITY:
      /* If it is being edited */
      if (state.isEdit) {
        return { ...state };
      }
      /* Create an entry in region state if the new region is clicked */
      if ( !state.showRegionState ) {
        region = {};
        region[ state.regionId + 1 ] = '';
        return { ...state, showRegionState: !state.showRegionState, viewedRegionId: (state.regionId + 1), region: { ...state.region, ...region }, regionId: (state.regionId + 1), isEdit: false};
      }

      region = Object.assign( {}, state.region );
      regionCity = Object.assign( {}, state.regionCity );
      delete region[action.data.id];
      delete regionCity[action.data.id];
      return { ...state, showRegionState: !state.showRegionState, region: { ...region }, viewedRegionId: 0, regionId: ( state.regionId - 1), regionCity: { ...regionCity }, isEdit: false};
    case REGION_INPUT_CHANGED:
      region = {};
      let createUpdateRegionObj = {};
      /* Handle update to existing entry in the database */
      if ( action.data.id < state.baseLocalRegionId ) {
        createUpdateRegionObj = createOrUpdateRegion(action.data.id, action.data.value, state);
      } else {
        region[action.data.id] = action.data.value;
      }
      return { ...state, region: { ...state.region, ...region}, ...createUpdateRegionObj};
    case MARK_CITY_SELECTED:
      /* Get the selected State right now */
      // selectedState = Object.assign( {}, state.viewedState);
      /* Check whether the region is updated or not */


      if ( action.data.regionId < state.baseLocalRegionId ) {
        // if ( state.updatedRegionReference[state.updatedRegions[action.data.regionId]] ) {
        /* Insert it if it is new by checking through the regionCity or deleted it if it was already there */
        return manageAddCities(action.data.cityId,
            action.data.regionId,
            state,
            addNewUpdatedRegionEntry(state,
              (state.updatedRegionReference[state.updatedRegions[action.data.regionId]] )
              ?
              state.updatedRegionReference[state.updatedRegions[action.data.regionId]]
              : state.region[action.data.regionId], action.data.regionId)
            );
      }
      selectedCity = {};
      let currentCity = [];
      currentCity = state.viewedState.cities.filter( (city) => {
        return city.id === action.data.cityId;
      });
      if ( selectedCity.length === 0) {
        alert('state is not selected');
        return { ...state };
      }
      regionCity = Object.assign({}, state.regionCity);
      selectedCity[action.data.cityId] = currentCity[0];
      selectedCity[action.data.cityId].state_id = state.viewedState.stateInfo.id;
      regionCity[action.data.regionId] = { ...regionCity[action.data.regionId], ...selectedCity };
      return {...state, regionCity: { ...state.regionCity, ...regionCity }};
    case UNMARK_CITY_SELECTED:
      if ( action.data.regionId < state.baseLocalRegionId ) {
        /* Insert it if it is new by checking through the regionCity or deleted it if it was already there */
        // return manageDeleteCities(action.data.cityId, action.data.regionId, state, addNewUpdatedRegionEntry(state, state.updatedRegions[state.updatedRegions[action.data.regionId]], action.data.regionId));
        return manageDeleteCities(action.data.cityId,
            action.data.regionId,
            state,
            addNewUpdatedRegionEntry(state,
              (state.updatedRegionReference[state.updatedRegions[action.data.regionId]] )
              ?
              state.updatedRegionReference[state.updatedRegions[action.data.regionId]]
              : state.region[action.data.regionId], action.data.regionId)
            );
      }
      regionCity = Object.assign({}, state.regionCity);
      delete regionCity[action.data.regionId][action.data.cityId];
      return {...state, regionCity: { ...regionCity }};
    case SAVE_TO_LOCAL:
      if ( state.regionCity[action.data.id] ) {
        /* Create an entry in region state if the new region is clicked */
        return { ...state, showRegionState: !state.showRegionState, isEdit: false, viewedState: {}};
      }
      alert('Please select cities to save the region');
      return { ...state };
    case VIEW_REGION:
      return { ...state, showRegionState: true, viewedRegionId: action.data, isEdit: true, viewedState: {}};
    case DELETE_REGION:
      region = Object.assign( {}, state.region );
      regionCity = Object.assign( {}, state.regionCity );
      delete region[action.data.id];
      delete regionCity[action.data.id];
      return { ...state, showRegionState: !state.showRegionState, region: { ...region }, viewedRegionId: 0, regionId: ( state.regionId - 1), regionCity: { ...regionCity }, isEdit: false};
    case BRAND_CREATED:
      return { ...state, brandId: action.data };
    case BRAND_FETCHED:
      /* Create region objects */
      const brandObj = action.data[0];
      let regionObj = {};
      if ( brandObj.regions ) {
        brandObj.regions.forEach( ( reg ) => {
          regionObj[reg.id] = reg.region_name;
          /* Initialize */
          if ( !(reg.id in regionCity )) {
            regionCity[reg.id] = {};
          }

          reg.cities.forEach( ( city ) => {
            const rCity = {};
            rCity.id = city.city_id;
            rCity.state_id = city.city.state_short.id;
            rCity.name = city.city.name;
            regionCity[reg.id][city.city_id] = rCity;
          });
        });
      } else {
        regionObj = {};
        regionCity = {};
      }
      return { ...state, brandObj: brandObj, region: { ...regionObj }, regionCity: { ...regionCity }, image: brandObj.image, brandId: brandObj.id, brandName: brandObj.brand_name, companyId: brandObj.company_id, categoryId: brandObj.category_id, genreId: brandObj.genre_id, genreShort: brandObj.category.genre_short_name, alcoholPer: brandObj.alcohol_per, temperature: brandObj.temperature, caloriesPer: brandObj.cal_per, caloriesTotal: brandObj.cal_total, origin: brandObj.origin_name, description: brandObj.description };
    case CANCEL_REGION:
      /* TODO: If existing region is viewed and modified ?
       * clear all the modifications if cancel is pressed
       * save if update is pressed
       * delete if delete is pressed
      */
      return { ...state, showRegionState: false, isEdit: false, viewedRegionId: 0, updatedRegions: {}, updatedRegionReference: {}, regionCityUpdated: {}};
    case NOTHING_CHANGED:
      return { ...state, showRegionState: false, isEdit: false, viewedRegionId: 0};
    case INPUT_VALUE_CHANGED:
      const categoryInfo = {};
      categoryInfo[action.data.key] = action.data.value;
      return { ...state, ...categoryInfo };
    case CLEAR_STORED_LOCAL_UPDATED_REGIONS:
      return { ...state, showRegionState: false, isEdit: false, viewedRegionId: 0, updatedRegions: {}, updatedRegionReference: {}, regionCityUpdated: {}};
    case IMAGE_UPLOAD_SUCCESS:
      return { ...state, image: action.data[0]};
    case IMAGE_UPLOAD_ERROR:
      return { ...state, image: ''};
    case CANCEL_IMAGE:
      return { ...state, image: ''};
    case RESET:
      return { ...defaultBrandState };
    default: return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchCategory,
  fetchGenre,
  fetchCompany,
  insertBrand,
  updateBrand,
  getBrandData,
  getAllBrandData,
  fetchState,
  RESET,
  viewState,
  TOGGLE_REGION_VISIBILITY,
  REGION_INPUT_CHANGED,
  MARK_CITY_SELECTED,
  UNMARK_CITY_SELECTED,
  SAVE_TO_LOCAL,
  VIEW_REGION,
  DELETE_REGION,
  CANCEL_REGION,
  fetchBrand,
  fetchOrigin,
  deleteRegionFromServer,
  updateRegion,
  INPUT_VALUE_CHANGED,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_ERROR,
  indexSku,
  CANCEL_IMAGE
};
export default brandReducer;
