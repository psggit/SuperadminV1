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
const FETCHED_RESERVED_ITEMS = 'SKU/FETCHED_RESERVED_ITEMS';
const POPULATE_SKU_DATA = 'SKU/POPULATE_SKU_DATA';

/* Variable */

const genOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin'},
  credentials: globalCookiePolicy
};

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
      ...genOptions,
      body: JSON.stringify(queryObj)
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
                },
              ],
              'where': {
                'is_active': true
              }
            }
          ],
          'where': {
            'is_active': true
          }
        }
      ],
      'where': {
        'id': skuId,
      }
    };
    /* Check for empty thing */
    const options = {
      ...genOptions,
      body: JSON.stringify(skuReqObj)
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
      ...genOptions,
      body: JSON.stringify(queryObj)
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

const disableSku = () => {
  return ( dispatch, getState ) => {
    console.log(dispatch);
    console.log('Disabling SKU');
    const skuState = getState().create_sku_data.reservedItems;

    const normalUrl = Endpoints.blogicUrl + '/admin/cancel/normal';
    const cashbackUrl = Endpoints.blogicUrl + '/admin/cancel/cashback';

    if ( skuState.length === 0 ) {
      alert('Nothing to cancel');
      return Promise.resolve();
    }

    const cashbackItems = [];
    const normalItems = [];

    skuState.forEach( ( sku ) => {
      if ( sku.reservation_type === 'cashback' ) {
        cashbackItems.push(sku.id);
      } else {
        normalItems.push(sku.id);
      }
    });
    console.log('normal');
    console.log(normalItems);
    console.log('cachbac');
    console.log(cashbackItems);

    const normalCancel = () => {
      if ( normalItems.length > 0 ) {
        const optionsNormal = {
          ...genOptions,
          body: JSON.stringify({ 'itemId': normalItems }),
          method: 'PUT'
        };
        return dispatch(requestAction(normalUrl, optionsNormal));
      }
      return Promise.resolve();
    };
    const cashbackCancel = () => {
      if ( cashbackItems.length > 0 ) {
        const optionsCashback = {
          ...genOptions,
          body: JSON.stringify({ 'itemId': cashbackItems }),
          method: 'PUT'
        };
        return dispatch(requestAction(cashbackUrl, optionsCashback));
      }
      return Promise.resolve();
    };
    return Promise.all([
      normalCancel(),
      cashbackCancel()
    ])
    .then( () => {
      console.log('request queued');
      return dispatch(routeActions.push('/hadmin/skus/list_sku'));
    })
    .catch( () => {
      console.log('request error');
      // return dispatch(routeActions.push('/hadmin/skus/list_sku'));
    });
  };
};

const getReservedItems = ( Id ) => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/reserved_items/select';
    const queryObj = {};
    queryObj.columns = ['*'];
    queryObj.where = {
      'sku_id': parseInt(Id, 10)
    };
    const options = {
      ...genOptions,
      body: JSON.stringify(queryObj)
    };
    /* Make a MAKE_REQUEST action */
    // dispatch({type: MAKE_REQUEST});
    // return Promise.all([
    return dispatch(requestAction(url, options))
      .then( ( data ) => {
        dispatch({ type: FETCHED_RESERVED_ITEMS, data: data });
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
    skuReqObj = Object.assign({}, currState.create_sku_data.skuReqObj);
    // skuReqObj.image = (currState.create_sku_data.skuImageUrl.length > 0) ? currState.create_sku_data.skuImageUrl : null;
    skuReqObj.brand_id = currState.create_sku_data.brandSlug[skuReqObj.brand_id];
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
      ...genOptions,
      body: JSON.stringify(skuInsertObj)
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
        spiObjs.returning = ['state_short_name', 'id'];

        brandListingObjs.objects = [];
        brandListingObjs.returning = ['id'];

        brandListingSelectObj.columns = ['brand_short_name', 'id', 'state_short_name'];
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
          spiObj.price = pricing.price ? pricing.price : null;
          spiObj.created_at = new Date().toISOString();
          spiObj.updated_at = new Date().toISOString();
          spiObj.state_short_name = pricing.stateInfo.short_name;
          spiObj.sku_id = resp.returning[0].id;
          spiObjs.objects.push(spiObj);

          // Need to create a brand listing entry for each brand in each state if it is not created

          brandListingObj = {};
          /* Creating brand listing objects */
          brandListingObj.brand_short_name = currState.create_sku_data.skuReqObj.brand_id;
          brandListingObj.featured_order = 1;
          brandListingObj.all_display_order = 10000;
          brandListingObj.state_short_name = pricing.stateInfo.short_name;
          brandListingObj.created_at = new Date().toISOString();
          brandListingObj.updated_at = new Date().toISOString();
          brandListingObjs.objects.push(brandListingObj);

          brandListingSelectObj.where.$or.push(
            {
              'brand_short_name': brandListingObj.brand_short_name,
              'state_short_name': brandListingObj.state_short_name
            }
          );
        });
        options = {
          ...genOptions,
          body: JSON.stringify(spiObjs)
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
              rObj.stock = 5;
              rObj.created_at = new Date().toISOString();
              rObj.updated_at = new Date().toISOString();
              rObjs.objects.push(rObj);
            });
          });

          if ( rObjs.objects.length === 0 ) {
            return Promise.resolve({ message: 'resolving'} );
          }

          /* Check for empty thing */
          options = {
            ...genOptions,
            body: JSON.stringify(rObjs)
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
          ...genOptions,
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
          existingMap[r.brand_short_name + ',' + r.state_short_name] = true;
        });

        const updatedBrandListingObjs = [];
        brandListingObjs.objects.forEach( ( bl ) => {
          if ( !existingMap[bl.brand_short_name + ',' + bl.state_short_name ] ) {
            updatedBrandListingObjs.push(bl);
          }
        });
        brandListingObjs.objects = [ ...updatedBrandListingObjs ];

        if ( brandListingObjs.objects.length === 0) {
          return true;
        }
        options = {
          ...genOptions,
          body: JSON.stringify(brandListingObjs)
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
    /* Add the bonus feature if the product inactive then make it active on select */
    // Handle five cases
    // 1. Remove State ( Update it as inactive )
    // 2. Update State ( Update SKU Pricing )
    // 3. Remove Retailer (Mark the inventory as inactive or delete)
    // 4. Added State (Add sku_pricing )
    // 5. Added Retailer (Add Inventory ) (To the existing sku_pricing or to the new sku_pricing )
    //
    /* Input: Array of sku_pricing_id's
     * Output: Return the disable status for all the entries
     * */

    const currState = getState().create_sku_data;

    const disableRetailers = Object.keys(currState.retailerMapping).filter( ( ret ) => {
      return ( currState.retailerMapping[ret].is_fetched && !currState.retailerMapping[ret].is_selected );
    });

    const disablePricings = Object.keys(currState.stateCityMapping).filter( ( state ) => {
      return ( currState.stateCityMapping[state].is_fetched && !currState.stateCityMapping[state].is_selected );
    });

    const enableRetailers = Object.keys(currState.retailerMapping).filter( ( ret ) => {
      return ( !( 'is_fetched' in currState.retailerMapping[ret] ) && ( currState.retailerMapping[ret].is_selected ) );
    });

    const enablePricings = Object.keys(currState.stateCityMapping).filter( ( state ) => {
      return ( !( 'is_fetched' in currState.stateCityMapping[state] ) && ( currState.stateCityMapping[state].is_selected ) );
    });

    const updatePricings = Object.keys(currState.stateCityMapping).filter( ( state ) => {
      return ( ( 'is_fetched' in currState.stateCityMapping[state] ) && ( currState.stateCityMapping[state].is_selected ) && ( currState.stateCityMapping[state].is_updated ) );
    });

    const updatePricing = ( pricings ) => {
      if ( pricings.length > 0 ) {
        const updatePricingUrl = 'https://data.hipbar-stg.hasura-app.io/v1/query';
        const updateObjs = pricings.map( ( pricingId ) => {
          const localObj = {};
          localObj.type = 'update';
          localObj.args = {};
          localObj.args.table = 'sku_pricing';

          localObj.args.$set = {};
          localObj.args.$set.price = currState.stateCityMapping[pricingId].price;
          localObj.args.where = {
            'sku_id': currState.sku_id,
            'state_short_name': pricingId
          };
          console.log(localObj);
          return localObj;
        });
        const bulkUpdate = {};
        bulkUpdate.type = 'bulk';
        bulkUpdate.args = updateObjs;

        console.log('final');
        console.log(updateObjs);
        const localOpt = {
          ...genOptions,
          body: JSON.stringify(bulkUpdate)
        };

        return dispatch( requestAction( updatePricingUrl, localOpt ) )
        .then( ( resp ) => {
          console.log('SKU Pricing update');
          console.log(resp);
        });
      }
      return Promise.resolve();
    };

    const addRetailers = ( retailers, map ) => {
      if ( retailers.length > 0 ) {
        const updateObjs = {};
        const inventoryUrl = Endpoints.db + '/table/inventory/insert';
        updateObjs.objects = retailers.map( ( retailerId ) => {
          console.log('here');
          console.log(currState.retailerMapping);
          console.log(currState.retailerMapping[parseInt(retailerId, 10)].retailerInfo.city_id);
          const localObj = {};
          localObj.retailer_id = parseInt(retailerId, 10);
          localObj.sku_pricing_id = map[currState.cityRetailerMapping[currState.retailerMapping[parseInt(retailerId, 10)].retailerInfo.city_id].cityInfo.state_short_name];
          localObj.stock = 5;
          return localObj;
        });
        updateObjs.returning = ['id'];

        const localOpt = {
          ...genOptions,
          body: JSON.stringify(updateObjs)
        };

        return dispatch( requestAction( inventoryUrl, localOpt ) )
        .then( ( resp ) => {
          console.log('inventory response is ');
          console.log(resp);
          Promise.resolve( { success: true });
        });
      }
      return Promise.resolve();
    };

    const addPricing = ( pricings ) => {
      if ( pricings.length > 0) {
        const updateObjs = {};
        const skuPricingUrl = Endpoints.db + '/table/sku_pricing/insert';
        const skuPricingMap = {};
        updateObjs.objects = pricings.map( ( pricingId ) => {
          const localObj = {};
          localObj.price = currState.stateCityMapping[pricingId].price;
          localObj.sku_id = currState.sku_id;
          localObj.state_short_name = pricingId;
          return localObj;
        });
        updateObjs.returning = ['id', 'sku_id', 'state_short_name'];

        const localOpt = {
          ...genOptions,
          body: JSON.stringify(updateObjs)
        };

        return dispatch( requestAction( skuPricingUrl, localOpt ) )
          .then( ( response ) => {
            if ( response.returning.length > 0 ) {
              response.returning.forEach( ( skuPricing ) => {
                skuPricingMap[skuPricing.state_short_name] = skuPricing.id;
              });
              return addRetailers( enableRetailers, { ...skuPricingMap, ...currState.skuStatePricingMap } );
            }
            Promise.reject();
          });
      } else if ( enableRetailers.length > 0 ) {
        return addRetailers( enableRetailers, currState.skuStatePricingMap );
      }
      return Promise.resolve();
    };

    const removeState = ( skuPricingIds ) => {
      if ( skuPricingIds.length > 0 ) {
        const updateObj = {};
        const removeUrl = Endpoints.db + '/table/sku_pricing/update';
        updateObj.values = {
          'is_active': false
        };
        updateObj.where = {
          '$or': ( skuPricingIds.map( ( pricingId ) => { return { 'state_short_name': pricingId }; } ) ),
          'sku_id': currState.sku_id
        };
        updateObj.returning = ['id'];

        const opt = {
          ...genOptions,
          body: JSON.stringify(updateObj)
        };

        return dispatch( requestAction(removeUrl, opt) )
        .then( ( response ) => {
          console.log('remove State response');
          console.log(response);
        });
      }
      return Promise.resolve();
    };

    const removeInventory = ( retailerIds ) => {
      if ( retailerIds.length > 0 ) {
        const updateObj = {};
        const removeUrl = Endpoints.db + '/table/inventory/update';
        updateObj.values = {
          'is_active': false
        };
        updateObj.where = {
          '$or': ( retailerIds.map( ( retailerId ) => { return { 'retailer_id': parseInt(retailerId, 10) }; } ) ),
          'sku_pricing': {
            'sku_id': currState.sku_id
          }
        };
        updateObj.returning = ['id'];

        const opt = {
          ...genOptions,
          body: JSON.stringify(updateObj)
        };

        return dispatch( requestAction(removeUrl, opt) )
        .then( ( resp ) => {
          console.log('remove inventory response');
          console.log(resp);
        });
      }
      return Promise.resolve();
    };

    /* Tester Funcs */
    /*
    removeState(disablePricings).then( ( resp ) => {
      console.log('resp is ');
      console.log(resp);
    });
    removeInventory(disableRetailers).then( ( resp ) => {
      console.log('Inventory resp is ');
      console.log(resp);
    });
    */
    /* End of it */
    const skuInsertObj = {};
    const skuUrl = Endpoints.db + '/table/sku/update';

    let options = {};
    let skuReqObj = {};
    skuReqObj = Object.assign( {}, currState.skuReqObj );
    // skuReqObj.image = (currState.create_sku_data.skuImageUrl.length > 0) ? currState.create_sku_data.skuImageUrl : null;
    skuReqObj.created_at = new Date().toISOString();
    skuReqObj.updated_at = new Date().toISOString();


    skuReqObj.brand_id = currState.brandSlug[skuReqObj.brand_id];
    /* Deleting status field as that is not required for the SKU */
    delete skuReqObj.status;

    /* SKU insert object creation */
    skuInsertObj.values = {
      ...skuReqObj
    };
    skuInsertObj.where = {
      'id': currState.sku_id
    };
    skuInsertObj.returning = ['id'];
    /* End of it */

    options = {
      ...genOptions,
      body: JSON.stringify(skuInsertObj)
    };

    // console.log(skuReqObj);
    // console.log('jON');
    // console.log(JSON.stringify(skuInsertObj));
    // 1st Point for failure
    //  Effect: Nothing
    return dispatch(requestAction(skuUrl, options))
      .then(() => {
        if ( disablePricings.length > 0 || disableRetailers.length > 0 || updatePricings.length > 0 || enableRetailers.length > 0 || enablePricings.length > 0 ) {
          return Promise.all([
            removeState(disablePricings),
            removeInventory(disableRetailers),
            updatePricing(updatePricings),
            addPricing(enablePricings)
          ]);
          /* Add an entry to brand listing table too */
        }
        return Promise.resolve();
      })
      .then( ( ) => {
        alert('SKU Updated Successfully');
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
  let retailersObj;
  switch (action.type) {
    case BRAND_FETCH:
      const brandSlugMap = {};
      const brandIdMap = {};
      action.data.forEach( ( brand ) => {
        brandSlugMap[ brand.short_name ] = brand.id;
      });
      action.data.forEach( ( brand ) => {
        brandIdMap[ brand.id ] = brand.short_name;
      });
      return {...state, brandList: action.data, brandIdMap: { ...brandIdMap}, brandSlug: { ...brandSlugMap }};
    case MARK_STATE_SELECTED:
      const currState = {};
      currState[action.data] = Object.assign({}, state.stateCityMapping[action.data]);
      currState[action.data].is_selected = true;
      /* Check for updated server values */
      if ( currState[action.data].is_fetched ) {
        currState[action.data].is_updated = ( currState[action.data].price !== currState[action.data].serverValues.price );
      }
      return {...state, stateCityMapping: { ...state.stateCityMapping, ...currState }};
    case MARK_RETAILER_SELECTED:
      /* Flow */
      /* If the retailer is getting selected for the first time then proceed with the normal flow else apply the update logic */

      /* Get the selected State right now */
      currRetailer = {};
      currRetailer[action.data] = Object.assign({}, state.retailerMapping[action.data]);
      currRetailer[action.data].is_selected = true;
      selectedCity = Object.assign( {}, state.viewedCity);

      // modifiedCity[selectedCity.cityInfo.id] = Object.assign({}, state.cityRetailerMapping[parseInt(selectedCity.cityInfo.id, 10)]);
      // modifiedCity[selectedCity.cityInfo.id].selected_retailers[action.data] = currRetailer[action.data];
      modifiedCityRetailerMapping = Object.assign({}, state.cityRetailerMapping);
      modifiedCityRetailerMapping[parseInt(selectedCity.cityInfo.id, 10)].selected_retailers[action.data] = currRetailer[action.data];

      /* Update module */
      currRetailer[action.data].is_updated = currRetailer[action.data].is_fetched ? false : true;
      /* End of it */
      return {...state, cityRetailerMapping: { ...modifiedCityRetailerMapping }, retailerMapping: {...state.retailerMapping, ...currRetailer }};
    case UNMARK_RETAILER_SELECTED:
      currRetailer = {};
      currRetailer[action.data] = Object.assign({}, state.retailerMapping[action.data]);
      currRetailer[action.data].is_selected = false;
      selectedCity = Object.assign( {}, state.viewedCity);

      modifiedCityRetailerMapping = Object.assign({}, state.cityRetailerMapping);
      delete modifiedCityRetailerMapping[parseInt(selectedCity.cityInfo.id, 10)].selected_retailers[action.data];

      /* Update module */
      currRetailer[action.data].is_updated = currRetailer[action.data].is_fetched ? true : false;
      /* End of it */
      return {...state, cityRetailerMapping: { ...modifiedCityRetailerMapping }, retailerMapping: {...state.retailerMapping, ...currRetailer }};
    case MARK_CITY_SELECTED:
      const currCity2 = {};
      currCity2[action.data] = Object.assign({}, state.cityRetailerMapping[parseInt(action.data, 10)]);
      currCity2[action.data].is_selected = true;
      /* Get the selected State right now */
      selectedState = Object.assign( {}, state.viewedState);
      modifiedState = {};
      modifiedState[selectedState.stateInfo.short_name ] = Object.assign({}, state.stateCityMapping[selectedState.stateInfo.short_name]);
      modifiedState[selectedState.stateInfo.short_name ].selected_cities[action.data] = currCity2[action.data];

      /* Update module */
      currCity2[action.data].is_updated = !currCity2[action.data].is_fetched ? true : false;
      /* End of it */

      return {...state, cityRetailerMapping: { ...state.cityRetailerMapping, ...currCity2}, stateCityMapping: { ...state.stateCityMapping, ...modifiedState }};
    case UNMARK_CITY_SELECTED:
      const currCity1 = {};
      currCity1[action.data] = Object.assign({}, state.cityRetailerMapping[parseInt(action.data, 10)]);
      currCity1[action.data].is_selected = false;
      /* Added if the state is selected and cities are selected and the state is being unmarked selected cities should also get disabled */

      selectedState = Object.assign( {}, state.viewedState);
      modifiedState = Object.assign({}, state.stateCityMapping[selectedState.stateInfo.short_name]);
      delete modifiedState.selected_cities[action.data];

      /* If the city is being viewed and it is unmarked just remove the retailers also NOT LITERALLY */
      let viewedCity = Object.assign({}, state.viewedCity );
      if ( Object.keys(viewedCity).length > 0) {
        viewedCity = ( viewedCity.cityInfo.id === action.data ) ? {} : viewedCity;
      } else {
        viewedCity = {};
      }

      /* Update module */
      currCity1[action.data].is_updated = currCity1[action.data].is_fetched ? true : false;
      retailersObj = Object.assign({}, state.retailerMapping);
      /* Unmark all the retailers under that city */
      if ( currCity1[action.data].is_fetched ) {
        const yetToBeUnmarkedRetailers = currCity1[action.data].selected_retailers;
        Object.keys(yetToBeUnmarkedRetailers).forEach( ( retailerId ) => {
          /* If the retailer is also fetched update it to false */
          retailersObj[retailerId] = { ...yetToBeUnmarkedRetailers[retailerId], is_selected: false, is_updated: true };
        });
      } else {
        const yetToBeUnmarkedRetailers = currCity1[action.data].selected_retailers;
        Object.keys(yetToBeUnmarkedRetailers).forEach( ( retailerId ) => {
          /* If the retailer is also fetched update it to false */
          retailersObj[retailerId] = { ...yetToBeUnmarkedRetailers[retailerId], is_selected: false, is_updated: false };
        });
      }
      /* End of it */
      currCity1[action.data].selected_retailers = {};
      return {...state, cityRetailerMapping: { ...state.cityRetailerMapping, ...currCity1}, viewedCity: viewedCity, retailerMapping: { ...retailersObj } };
    case VIEW_STATE:
      return {...state, viewedState: state.stateCityMapping[action.data], viewedCity: {}};
    case VIEW_CITY:
      return {...state, viewedCity: state.cityRetailerMapping[action.data]};
    case UNMARK_STATE_SELECTED:
      const currState1 = {};
      currState1[action.data] = Object.assign({}, state.stateCityMapping[action.data]);
      currState1[action.data].is_selected = false;
      /* Added if the state is selected and cities are selected and the state is being unmarked selected cities should also get disabled */
      /* TODO: 1 Unselect all cities if this guy is unmarked and marked again */
      /* TODO: 2 Unselect all the retailers as this is the chain reaction (State is unselect -> unselect the cities -> unselect the retailers */
      let viewedState = Object.assign({}, state.viewedState);
      if (Object.keys(viewedState).length > 0) {
        viewedState = ( viewedState.stateInfo.short_name === action.data ) ? {} : viewedState;
      } else {
        viewedState = {};
      }
      if ( currState1[action.data].is_fetched ) {
        currState1[action.data].is_updated = true;
      }


      const citiesObj = Object.assign({}, state.cityRetailerMapping);
      retailersObj = Object.assign({}, state.retailerMapping);
      /* Unmark all the retailers under that city */
      if ( currState1[action.data].is_fetched ) {
        const yetToBeUnmarkedCities = currState1[action.data].selected_cities;
        Object.keys(yetToBeUnmarkedCities ).forEach( ( cityId ) => {
          /* If the retailer is also fetched update it to false */
          citiesObj[cityId] = { ...yetToBeUnmarkedCities[cityId], is_selected: false, is_updated: true };
          const yetToBeUnmarkedRetailers = citiesObj[cityId].selected_retailers;
          citiesObj[cityId] = { ...citiesObj[cityId], selected_retailers: {}};
          Object.keys(yetToBeUnmarkedRetailers).forEach( ( retailerId ) => {
            /* If the retailer is also fetched update it to false */
            retailersObj[retailerId] = { ...yetToBeUnmarkedRetailers[retailerId], is_selected: false, is_updated: true };
          });
        });
      } else {
        const yetToBeUnmarkedCities = currState1[action.data].selected_cities;
        Object.keys(yetToBeUnmarkedCities ).forEach( ( cityId ) => {
          /* If the retailer is also fetched update it to false */
          citiesObj[cityId] = { ...yetToBeUnmarkedCities[cityId], is_selected: false };
          const yetToBeUnmarkedRetailers = citiesObj[cityId].selected_retailers;
          citiesObj[cityId] = { ...citiesObj[cityId], selected_retailers: {}};
          Object.keys(yetToBeUnmarkedRetailers).forEach( ( retailerId ) => {
            /* If the retailer is also fetched update it to false */
            retailersObj[retailerId] = { ...yetToBeUnmarkedRetailers[retailerId], is_selected: false };
          });
        });
      }

      currState1[action.data].selected_cities = {};

      return {...state, stateCityMapping: { ...state.stateCityMapping, ...currState1 }, viewedState: viewedState, cityRetailerMapping: { ...citiesObj }, retailerMapping: { ...retailersObj } };
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
        stateCityMapping[action.data[countState].short_name] = {
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
            retailerMapping[retailers[countRetailer].id] = {
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
        currentStateObj[action.data.state_id].is_updated = ( currentStateObj[action.data.state_id].price !== currentStateObj[action.data.state_id].serverValues.price );
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
      const skuStatePricingMap = {};
      delete localSkuInfo.pricings;
      console.log('selectedStates');
      console.log(selectedStates);
      selectedStates.forEach( ( sState ) => {
        /* Check if the retailer exists in the state */
        /* To avoid error data */
        if ( localStateCityMapping[sState.state_short_name ] ) {
          localStateCityMapping[ sState.state_short_name ].is_selected = true;
          localStateCityMapping[ sState.state_short_name ].price = sState.price;
          localStateCityMapping[ sState.state_short_name ].is_fetched = true;
          localStateCityMapping[ sState.state_short_name ].is_updated = false;
          localStateCityMapping[ sState.state_short_name ].serverValues = {
            'price': sState.price
          };
          sState.sku_inventories.forEach( ( inventory ) => {
            const cityId = inventory.retailer.city_id;
            const retailerId = inventory.retailer_id;
            localStateCityMapping[ sState.state_short_name ].selected_cities[cityId] = { ...state.cityRetailerMapping[cityId], is_selected: false};
            localRetailerMapping[retailerId].is_selected = true;
            localRetailerMapping[retailerId].is_fetched = true;
            // localRetailerMapping[retailerId].serverValues = { is_selected: true };
            localCityRetailerMapping[cityId].is_selected = true;
            localCityRetailerMapping[cityId].is_fetched = true;
            localCityRetailerMapping[cityId].serverValues = { 'selected_retailers': ( ( 'serverValues' in localCityRetailerMapping[cityId]) ? localCityRetailerMapping[cityId].serverValues.selected_retailers : {} ) };
            localCityRetailerMapping[cityId].serverValues.selected_retailers[retailerId] = localRetailerMapping[retailerId];
            localCityRetailerMapping[cityId].selected_retailers[retailerId] = localRetailerMapping[retailerId];
          });

          skuStatePricingMap[sState.state_short_name] = sState.id;
        }
      });
      /* for each state price loop and get the selected states */
      /* for each retailer get the selected city */
      return { ...state, skuReqObj: { ...localSkuInfo, 'brand_id': state.brandIdMap[localSkuInfo.brand_id], status: localSkuInfo.is_active }, stateCityMapping: { ...localStateCityMapping }, cityRetailerMapping: { ...localCityRetailerMapping }, retailerMapping: { ...localRetailerMapping }, skuImageUrl: (localSkuInfo.image ? localSkuInfo.image : ''), skuStatePricingMap: { ...skuStatePricingMap }};
    case FETCHED_RESERVED_ITEMS:
      return { ...state, reservedItems: action.data };
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
  updateComponentState,
  getReservedItems,
  disableSku
};

export default createSKUReducer;
