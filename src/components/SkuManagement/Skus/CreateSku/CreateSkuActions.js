/*
 * Will receive default state from Common
 * */

import { defaultCreateSkuState } from '../../../Common/Actions/DefaultState';
import requestAction from '../../../Common/Actions/requestAction';

import Endpoints, { globalCookiePolicy } from '../../../../Endpoints';
import {
  REQUEST_ERROR
} from '../../../Common/Actions/Actions';

import { routeActions } from 'redux-simple-router';

/* Action Constants */
const BRAND_FETCH = 'SKU/BRAND_FETCH';
const RESET = 'SKU/RESET';
const STATE_FETCH_AND_COMPUTE_MAPPINGS = 'SKU/STATE_FETCH_AND_COMPUTE_MAPPINGS';
const MARK_STATE_SELECTED = 'SKU/MARK_STATE_SELECTED';
const UNMARK_STATE_SELECTED = 'SKU/UNMARK_STATE_SELECTED';

const MARK_CITY_SELECTED = 'SKU/MARK_CITY_SELECTED';
const UNMARK_CITY_SELECTED = 'SKU/UNMARK_CITY_SELECTED';

const MARK_RETAILER_SELECTED = 'SKU/MARK_RETAILER_SELECTED';
const UNMARK_RETAILER_SELECTED = 'SKU/UNMARK_RETAILER_SELECTED';

const VIEW_STATE = 'SKU/VIEW_STATE';
const VIEW_CITY = 'SKU/VIEW_CITY';

const IMAGE_UPLOAD_SUCCESS = 'SKU/IMAGE_UPLOAD_SUCCESS';
const IMAGE_UPLOAD_ERROR = 'SKU/IMAGE_UPLOAD_ERROR';
const CANCEL_IMAGE = 'SKU/CANCEL_IMAGE';

const SKU_INFORMATION_CHANGE = 'SKU/SKU_INFORMATION_CHANGE';

const STATE_MRP_INFORMATION = 'SKU/STATE_MRP_INFORMATION';

const UPDATE_COMPONENT_STATE = 'SKU/UPDATE_COMPONENT_STATE';
const POPULATE_SKU_DATA = 'SKU/POPULATE_SKU_DATA';

/* Insert Actions */

const SKU_ID_CREATED = 'SKU/SKU_ID_CREATED';
const SKU_PRICING_ID_CREATED = 'SKU/SKU_PRICING_ID_CREATED';

const fetchBrand = () => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/brand/select';
    const queryObj = {};
    queryObj.columns = [
      '*'
    ];
    queryObj.order_by = '+brand_name';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    // dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, BRAND_FETCH, REQUEST_ERROR))
    ]);
  };
};

const hydrateStateObj = () => {
  return ( dispatch, getState) => {
    /* Now fetch the sku information */
    const skuUrl = Endpoints.db + '/table/sku/select';
    const skuId = getState().create_sku_data.sku_id;
    const skuReqObj = {
      'columns': [
        '*',
        {
          'name': 'pricings',
          'columns': [
            '*',
            {
              'name': 'sku_inventories',
              'columns': ['*',
                {
                  'name': 'retailer',
                  'columns': ['*',
                    {
                      'name': 'kycs',
                      'columns': [
                        '*'
                      ],
                      'order_by': '-created_at',
                      'limit': 1
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      'where': {
        'id': skuId
      }
    };
    /* Check for empty thing */
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(skuReqObj),
    };
    return dispatch(requestAction(skuUrl, options, POPULATE_SKU_DATA, REQUEST_ERROR));
  };
};

const fetchState = () => {
  return (dispatch, getState) => {
    /* Url */
    const url = Endpoints.db + '/table/state/select';
    const queryObj = {};
    queryObj.columns = [
      '*',
      {
        'name': 'cities',
        'columns': [
          '*',
          {
            'name': 'retailers',
            'columns': [
              '*'
            ]
          }
        ],
        'where': {
          'retailers': {
            'id': {
              '$gt': 0
            }
          }
        }
      }
    ];
    queryObj.order_by = '-state_name';
    queryObj.where = {
      'cities': {
        'retailers': {
          'id': {
            '$gt': 0
          }
        }
      }
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    // dispatch({type: MAKE_REQUEST});
    // return Promise.all([
    return dispatch(requestAction(url, options))
      .then( ( data ) => {
        dispatch({ type: STATE_FETCH_AND_COMPUTE_MAPPINGS, data: data });
        // , REQUEST_ERROR))
        if ( getState().create_sku_data.currentPage === 'edit_page') {
          return dispatch( hydrateStateObj() );
        }
      });
  };
};

/* Function to Create sku */
const onSave = () => {
  return (dispatch, getState) => {
    // console.log(getState());
    const currState = getState();
    const skuInsertObj = {};
    const skuUrl = Endpoints.db + '/table/sku/insert';

    const brandListingObjs = {};
    let brandListingObj = {};
    const brandListingSelectObj = {};
    const brandListingUrl = Endpoints.db + '/table/brand_listing/insert';
    const brandListingSelectUrl = Endpoints.db + '/table/brand_listing/select';

    let options = {};
    let skuReqObj = {};
    skuReqObj = currState.create_sku_data.skuReqObj;
    skuReqObj.image = (currState.create_sku_data.skuImageUrl.length > 0) ? currState.create_sku_data.skuImageUrl : null;
    skuReqObj.created_at = new Date().toISOString();
    skuReqObj.updated_at = new Date().toISOString();

    /* Deleting status field as that is not required for the SKU */
    delete skuReqObj.status;

    /* SKU insert object creation */
    skuInsertObj.objects = [
      skuReqObj
    ];
    skuInsertObj.returning = ['id'];
    /* End of it */

    options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(skuInsertObj),
    };

    // console.log(skuReqObj);
    // console.log('jON');
    // console.log(JSON.stringify(skuInsertObj));
    // 1st Point for failure
    //  Effect: Nothing
    return dispatch(requestAction(skuUrl, options))
      .then((resp) => {
        const spiObjs = {};
        const skuPricingObjs = [];
        const skuPricingUrl = Endpoints.db + '/table/sku_pricing/insert';

        let spiObj = {};
        spiObjs.objects = [];
        spiObjs.returning = ['state_id', 'id'];

        brandListingObjs.objects = [];
        brandListingObjs.returning = ['id'];

        brandListingSelectObj.columns = ['brand_id', 'id', 'state_id'];
        brandListingSelectObj.where = {
          '$or': []
        };

        /* Dispatch an update for sku_id */
        dispatch({ type: SKU_ID_CREATED, data: resp.returning[0].id });
        /* Create SKU_PRICING OBJECTS */
        /* Selected skuPricings */
        Object.keys(currState.create_sku_data.stateCityMapping).forEach( ( key ) => {
          if ( currState.create_sku_data.stateCityMapping[key].is_selected ) {
            skuPricingObjs.push(currState.create_sku_data.stateCityMapping[key]);
          }
        });
        console.log(skuPricingObjs);
        skuPricingObjs.map( ( pricing ) => {
          spiObj = {};
          spiObj.duty_free = pricing.duty_free ? pricing.duty_free : null;
          spiObj.duty_paid = pricing.duty_paid ? pricing.duty_paid : null;
          spiObj.created_at = new Date().toISOString();
          spiObj.updated_at = new Date().toISOString();
          spiObj.state_id = pricing.stateInfo.id;
          spiObj.sku_id = resp.returning[0].id;
          spiObjs.objects.push(spiObj);

          // Need to create a brand listing entry for each brand in each state if it is not created

          brandListingObj = {};
          /* Creating brand listing objects */
          brandListingObj.brand_id = currState.create_sku_data.skuReqObj.brand_id;
          brandListingObj.display_order = 10000;
          brandListingObj.is_top_pick = false;
          brandListingObj.display_order_top_pick = 10000;
          brandListingObj.state_id = pricing.stateInfo.id;
          brandListingObj.created_at = new Date().toISOString();
          brandListingObj.updated_at = new Date().toISOString();
          brandListingObjs.objects.push(brandListingObj);

          brandListingSelectObj.where.$or.push(
            {
              'brand_id': parseInt(brandListingObj.brand_id, 10),
              'state_id': parseInt(brandListingObj.state_id, 10)
            }
          );
        });
        options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: globalCookiePolicy,
          body: JSON.stringify(spiObjs),
        };
        // 2nd Point of Failure
        //  Effect: This will end up in creation of SKU but not its prices in respective states
        return dispatch(requestAction(skuPricingUrl, options));
      })
      .then( (pricingResp) => {
        /* Variables for this retailers */
        if ( pricingResp.returning.length > 0) {
          dispatch( { type: SKU_PRICING_ID_CREATED, data: pricingResp.returning });
          const skuCityObjs = [];
          const rObjs = {};
          const inventoryRetailerUrl = Endpoints.db + '/table/inventory/insert';
          let rObj = {};
          rObjs.objects = [];
          rObjs.returning = ['id', 'retailer_id', 'sku_pricing_id'];
          /* Create inventory for retailers */
          Object.keys(currState.create_sku_data.cityRetailerMapping).forEach( ( key ) => {
            if ( currState.create_sku_data.cityRetailerMapping[key].is_selected && (Object.keys(currState.create_sku_data.cityRetailerMapping[key].selected_retailers)).length > 0 ) {
              skuCityObjs.push(currState.create_sku_data.cityRetailerMapping[key]);
            }
          });

          skuCityObjs.map( ( cityObj ) => {
            Object.keys(cityObj.selected_retailers).forEach( ( retailer ) => {
              rObj = {};
              rObj.retailer_id = parseInt(retailer, 10);
              rObj.sku_pricing_id = getState().create_sku_data.sku_state_id[ cityObj.cityInfo.state_id ];
              rObj.inventory_status_id = 3;
              rObj.stock = 5;
              rObj.created_at = new Date().toISOString();
              rObj.updated_at = new Date().toISOString();
              rObjs.objects.push(rObj);
            });
          });

          /* Check for empty thing */
          options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: globalCookiePolicy,
            body: JSON.stringify(rObjs),
          };
          // 3rd point of failure
          //  Effect: The sku wouldn't have gotten tagged with the relevant retailers
          return dispatch(requestAction(inventoryRetailerUrl, options));
        }
        throw Error('Something went wrong while creating inventory');
      })
      .then(( resp ) => {
        /* Update pricing ids */
        /* Check whether the brand listing entry is already there or no */
        console.log(resp);
        options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: globalCookiePolicy,
          body: JSON.stringify(brandListingSelectObj)
        };
        return dispatch(requestAction(brandListingSelectUrl, options));
      })
      .then( ( resp ) => {
        const existingMap = {};
        if ( resp.length === brandListingObjs.objects.length ) {
          return true;
        }
        /* Remove the already created brandLising objects */
        resp.forEach( ( r ) => {
          existingMap[r.brand_id + ',' + r.state_id] = true;
        });

        const updatedBrandListingObjs = [];
        brandListingObjs.objects.forEach( ( bl ) => {
          if ( !existingMap[bl.brand_id + ',' + bl.state_id] ) {
            updatedBrandListingObjs.push(bl);
          }
        });
        brandListingObjs.objects = [ ...updatedBrandListingObjs ];

        if ( brandListingObjs.objects.length === 0) {
          return true;
        }
        options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: globalCookiePolicy,
          body: JSON.stringify(brandListingObjs),
        };
        return dispatch(requestAction(brandListingUrl, options));
      })
      .then(() => {
        alert('SKU Updated Successfully');
        /* Add an entry to brand listing table too */
        return dispatch(routeActions.push('/hadmin/skus/list_sku'));
      })
      .catch((resp) => {
        alert('Error: ' + resp.error);
        return dispatch(routeActions.push('/hadmin/skus/list_sku'));
      });
  };
};

/* onUpdate */

const onUpdate = () => {
  return (dispatch, getState) => {
    // console.log(getState());
    const currState = getState();
    const skuInsertObj = {};
    const skuUrl = Endpoints.db + '/table/sku/update';

    let options = {};
    let skuReqObj = {};
    skuReqObj = currState.create_sku_data.skuReqObj;
    skuReqObj.image = (currState.create_sku_data.skuImageUrl.length > 0) ? currState.create_sku_data.skuImageUrl : null;
    skuReqObj.created_at = new Date().toISOString();
    skuReqObj.updated_at = new Date().toISOString();

    /* Deleting status field as that is not required for the SKU */
    delete skuReqObj.status;

    /* SKU insert object creation */
    skuInsertObj.values = {
      ...skuReqObj
    };
    skuInsertObj.where = {
      'id': currState.create_sku_data.sku_id
    };
    skuInsertObj.returning = ['id'];
    /* End of it */

    options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(skuInsertObj),
    };

    // console.log(skuReqObj);
    // console.log('jON');
    // console.log(JSON.stringify(skuInsertObj));
    // 1st Point for failure
    //  Effect: Nothing
    return dispatch(requestAction(skuUrl, options))
      .then(() => {
        alert('SKU Updated Successfully');
        /* Add an entry to brand listing table too */
        return dispatch(routeActions.push('/hadmin/skus/list_sku'));
      })
      .catch((resp) => {
        alert('Error: ' + resp.error);
        return dispatch(routeActions.push('/hadmin/skus/list_sku'));
      });
  };
};

/* Marking / UnMarking the checkboxes */
const markStateSelected = (stateId) => {
  return { type: MARK_STATE_SELECTED, data: stateId };
};

const unMarkStateSelected = (stateId) => {
  return { type: UNMARK_STATE_SELECTED, data: stateId };
};

const markCitySelected = (cityId) => {
  return { type: MARK_CITY_SELECTED, data: cityId};
};

const unMarkCitySelected = (cityId) => {
  return { type: UNMARK_CITY_SELECTED, data: cityId};
};

const markRetailerSelected = (cityId) => {
  return { type: MARK_RETAILER_SELECTED, data: cityId};
};

const unMarkRetailerSelected = (cityId) => {
  return { type: UNMARK_RETAILER_SELECTED, data: cityId};
};

/* End of it */

/* Viewing Action creators */
const viewState = (stateId) => {
  return { type: VIEW_STATE, data: stateId };
};

const viewCity = (cityId) => {
  return { type: VIEW_CITY, data: cityId};
};

const updateComponentState = ( page, id ) => {
  return ( dispatch ) => {
    dispatch({ type: UPDATE_COMPONENT_STATE, data: { 'page': page, 'id': id }});
  };
};

/* End of it */

/* Reducer Definition */

const createSKUReducer = (state = defaultCreateSkuState, action) => {
  let modifiedState;
  let selectedState;
  let selectedCity;
  let currRetailer;
  let modifiedCityRetailerMapping;
  switch (action.type) {
    case BRAND_FETCH:
      return {...state, brandList: action.data};
    case MARK_STATE_SELECTED:
      const currState = {};
      currState[action.data] = Object.assign({}, state.stateCityMapping[parseInt(action.data, 10)]);
      currState[action.data].is_selected = true;
      /* Check for updated server values */
      if ( currState[action.data].is_fetched ) {
        currState[action.data].is_updated = ( currState[action.data].duty_free !== currState[action.data].serverValues.duty_free ) || ( currState[action.data].duty_paid !== currState[action.data].serverValues.duty_paid );
      }
      return {...state, stateCityMapping: { ...state.stateCityMapping, ...currState }};
    case MARK_RETAILER_SELECTED:
      /* Get the selected State right now */
      currRetailer = {};
      currRetailer[action.data] = Object.assign({}, state.retailerMapping[action.data]);
      currRetailer[action.data].is_selected = true;
      selectedCity = Object.assign( {}, state.viewedCity);

      // modifiedCity[selectedCity.cityInfo.id] = Object.assign({}, state.cityRetailerMapping[parseInt(selectedCity.cityInfo.id, 10)]);
      // modifiedCity[selectedCity.cityInfo.id].selected_retailers[action.data] = currRetailer[action.data];
      modifiedCityRetailerMapping = Object.assign({}, state.cityRetailerMapping);
      modifiedCityRetailerMapping[parseInt(selectedCity.cityInfo.id, 10)].selected_retailers[action.data] = currRetailer[action.data];
      return {...state, cityRetailerMapping: { ...modifiedCityRetailerMapping }, retailerMapping: {...state.retailerMapping, ...currRetailer }};
    case UNMARK_RETAILER_SELECTED:
      currRetailer = {};
      currRetailer[action.data] = Object.assign({}, state.retailerMapping[action.data]);
      currRetailer[action.data].is_selected = false;
      selectedCity = Object.assign( {}, state.viewedCity);

      modifiedCityRetailerMapping = Object.assign({}, state.cityRetailerMapping);
      delete modifiedCityRetailerMapping[parseInt(selectedCity.cityInfo.id, 10)].selected_retailers[action.data];

      return {...state, cityRetailerMapping: { ...modifiedCityRetailerMapping }, retailerMapping: {...state.retailerMapping, ...currRetailer }};
    case MARK_CITY_SELECTED:
      const currCity2 = {};
      currCity2[action.data] = Object.assign({}, state.cityRetailerMapping[parseInt(action.data, 10)]);
      currCity2[action.data].is_selected = true;
      /* Get the selected State right now */
      selectedState = Object.assign( {}, state.viewedState);
      modifiedState = {};
      modifiedState[selectedState.stateInfo.id] = Object.assign({}, state.stateCityMapping[parseInt(selectedState.stateInfo.id, 10)]);
      modifiedState[selectedState.stateInfo.id].selected_cities[action.data] = currCity2[action.data];
      return {...state, cityRetailerMapping: { ...state.cityRetailerMapping, ...currCity2}, stateCityMapping: { ...state.stateCityMapping, ...modifiedState }};
    case UNMARK_CITY_SELECTED:
      const currCity1 = {};
      currCity1[action.data] = Object.assign({}, state.cityRetailerMapping[parseInt(action.data, 10)]);
      currCity1[action.data].is_selected = false;
      /* Added if the state is selected and cities are selected and the state is being unmarked selected cities should also get disabled */
      currCity1[action.data].selected_retailers = {};

      selectedState = Object.assign( {}, state.viewedState);
      modifiedState = Object.assign({}, state.stateCityMapping[parseInt(selectedState.stateInfo.id, 10)]);
      delete modifiedState.selected_cities[action.data];

      /* If the city is being viewed and it is unmarked just remove the retailers also NOT LITERALLY */
      let viewedCity = Object.assign({}, state.viewedCity );
      if ( Object.keys(viewedCity).length > 0) {
        viewedCity = ( viewedCity.cityInfo.id === action.data ) ? {} : viewedCity;
      } else {
        viewedCity = {};
      }
      return {...state, cityRetailerMapping: { ...state.cityRetailerMapping, ...currCity1}, viewedCity: viewedCity};
    case VIEW_STATE:
      return {...state, viewedState: state.stateCityMapping[action.data], viewedCity: {}};
    case VIEW_CITY:
      return {...state, viewedCity: state.cityRetailerMapping[action.data]};
    case UNMARK_STATE_SELECTED:
      const currState1 = {};
      currState1[action.data] = Object.assign({}, state.stateCityMapping[parseInt(action.data, 10)]);
      currState1[action.data].is_selected = false;
      /* Added if the state is selected and cities are selected and the state is being unmarked selected cities should also get disabled */
      /* TODO: 1 Unselect all cities if this guy is unmarked and marked again */
      /* TODO: 2 Unselect all the retailers as this is the chain reaction (State is unselect -> unselect the cities -> unselect the retailers */
      currState1[action.data].selected_cities = {};
      let viewedState = Object.assign({}, state.viewedState);
      if (Object.keys(viewedState).length > 0) {
        viewedState = ( viewedState.stateInfo.id === action.data ) ? {} : viewedState;
      } else {
        viewedState = {};
      }
      if ( currState1[action.data].is_fetched ) {
        currState1[action.data].is_updated = true;
      }
      return {...state, stateCityMapping: { ...state.stateCityMapping, ...currState1 }, viewedState: viewedState};
    case STATE_FETCH_AND_COMPUTE_MAPPINGS:
      /* Map states to cities */
      /* State with zero cities are considered now can be removed later */
      let countState = 0;
      let countCity = 0;
      let countRetailer = 0;
      const stateCityMapping = {};
      const cityRetailerMapping = {};
      const retailerMapping = {};
      while ( countState < action.data.length) {
        countCity = 0;
        stateCityMapping[action.data[countState].id] = {
          is_selected: false,
          selected_cities: {},
          duty_free: 0,
          duty_paid: 0,
          cities: action.data[countState].cities,
          stateInfo: action.data[countState]
        };
        while (countCity < action.data[countState].cities.length) {
          const currCity = action.data[countState].cities;
          const retailers = currCity[countCity].retailers;
          countRetailer = 0;
          cityRetailerMapping[currCity[countCity].id] = {
            retailers: currCity[countCity].retailers,
            is_selected: false,
            selected_retailers: {},
            cityInfo: currCity[countCity]
          };
          while ( countRetailer < retailers.length) {
            retailerMapping[retailers[countRetailer].retailer_id] = {
              is_selected: false,
              retailerInfo: retailers[countRetailer]
            };
            countRetailer++;
          }
          countCity++;
        }
        countState++;
      }
      // Hydrate view object
      // hydrateStateObj();
      return {...state, stateList: action.data, stateCityMapping: stateCityMapping, cityRetailerMapping: cityRetailerMapping, retailerMapping: retailerMapping};
    case IMAGE_UPLOAD_SUCCESS:
      return { ...state, skuImageUrl: action.data[0]};
    case IMAGE_UPLOAD_ERROR:
      return { ...state, skuImageUrl: ''};
    case CANCEL_IMAGE:
      return { ...state, skuImageUrl: ''};
    case SKU_INFORMATION_CHANGE:
      const skuInfo = {};
      skuInfo[action.data.key] = action.data.value;
      return { ...state, skuReqObj: { ...state.skuReqObj, ...skuInfo }};
    case STATE_MRP_INFORMATION:
      const currentStateObj = {};
      currentStateObj[action.data.state_id] = Object.assign( {}, state.stateCityMapping[action.data.state_id] );
      currentStateObj[action.data.state_id][action.data.key] = action.data[action.data.key];
      if ( currentStateObj[action.data.state_id].is_fetched ) {
        currentStateObj[action.data.state_id].is_updated = ( currentStateObj[action.data.state_id].duty_free !== currentStateObj[action.data.state_id].serverValues.duty_free ) || ( currentStateObj[action.data.state_id].duty_paid !== currentStateObj[action.data.state_id].serverValues.duty_paid );
      }

      return { ...state, stateCityMapping: { ...state.stateCityMapping, ...currentStateObj }};
    case SKU_ID_CREATED:
      return { ...state, sku_id: action.data };
    case SKU_PRICING_ID_CREATED:
      const skuPricingIdMap = {};
      action.data.map( ( pricing ) => {
        skuPricingIdMap[pricing.state_id] = pricing.id;
      });
      return { ...state, sku_state_id: skuPricingIdMap };
    case UPDATE_COMPONENT_STATE:
      return { ...state, currentPage: action.data.page, sku_id: action.data.id };
    case RESET:
      return { ...defaultCreateSkuState };
    case POPULATE_SKU_DATA:
      const localSkuInfo = { ...action.data[0] };
      const selectedStates = [ ...localSkuInfo.pricings ];
      const localStateCityMapping = { ...state.stateCityMapping };
      const localCityRetailerMapping = { ...state.cityRetailerMapping };
      const localRetailerMapping = { ...state.retailerMapping };
      delete localSkuInfo.pricings;
      selectedStates.forEach( ( sState ) => {
        /* Check if the retailer exists in the state */
        /* To avoid error data */
        if ( localStateCityMapping[sState.state_id] ) {
          localStateCityMapping[sState.state_id].is_selected = true;
          localStateCityMapping[sState.state_id].duty_free = sState.duty_free;
          localStateCityMapping[sState.state_id].duty_paid = sState.duty_paid;
          localStateCityMapping[sState.state_id].is_fetched = true;
          localStateCityMapping[sState.state_id].is_updated = false;
          localStateCityMapping[sState.state_id].serverValues = {
            'duty_free': sState.duty_free,
            'duty_paid': sState.duty_paid
          };
          sState.sku_inventories.forEach( ( inventory ) => {
            const cityId = inventory.retailer.kycs[0].city_id;
            const retailerId = inventory.retailer_id;
            localStateCityMapping[sState.state_id].selected_cities[cityId] = { ...state.cityRetailerMapping[cityId], is_selected: false};
            localRetailerMapping[retailerId].is_selected = true;
            localCityRetailerMapping[cityId].is_selected = true;
            localCityRetailerMapping[cityId].selected_retailers[retailerId] = localRetailerMapping[retailerId];
          });
        }
      });
      /* for each state price loop and get the selected states */
      /* for each retailer get the selected city */
      return { ...state, skuReqObj: { ...localSkuInfo }, stateCityMapping: { ...localStateCityMapping }, cityRetailerMapping: { ...localCityRetailerMapping }, retailerMapping: { ...localRetailerMapping }, skuImageUrl: (localSkuInfo.image ? localSkuInfo.image : '')};
    default: return state;
  }
};

/* End of it */

export {
  fetchBrand,
  fetchState,
  RESET,
  markStateSelected,
  unMarkStateSelected,
  markCitySelected,
  unMarkCitySelected,
  markRetailerSelected,
  unMarkRetailerSelected,
  viewState,
  viewCity,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_ERROR,
  CANCEL_IMAGE,
  SKU_INFORMATION_CHANGE,
  STATE_MRP_INFORMATION,
  onSave,
  onUpdate,
  updateComponentState
};

export default createSKUReducer;
