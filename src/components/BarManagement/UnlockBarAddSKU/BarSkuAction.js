import requestAction from '../../Common/Actions/requestAction';
// //
import { genOptions } from '../../Common/Actions/commonFunctions';
// import { routeActions } from 'redux-simple-router';
// // //
import Endpoints from '../../../Endpoints';

/* Action constants */

const RESET_BAR_SKU = '@barSkuDataReducer/RESET_BAR_SKU';
// const INITIAL_DATA_FETCHED = '@barSkuDataReducer/INITIAL_DATA_FETCHED';
const BAR_INFO_FETCHED = '@barSkuDataReducer/BAR_INFO_FETCHED';
const BAR_SKU_FETCHED = '@barSkuDataReducer/BAR_SKU_FETCHED';
const SKU_FETCHED = '@barSkuDataReducer/SKU_FETCHED';

const TOGGLE_SKU_DIV = '@barSkuDataReducer/TOGGLE_SKU_DIV';

const INPUT_VALUE_CHANGED = '@barSkuDataReducer/INPUT_VALUE_CHANGED';

const VIEW_SKU = '@barSkuDataReducer/VIEW_SKU';

const CANCEL_SKU = '@barSkuDataReducer/CANCEL_SKU';

const CLEAR_SKU = '@barSkuDataReducer/CLEAR_SKU';


/* End of it */

/* Action creators */

const getSkus = ( cityId ) => {
  return ( dispatch ) => {
    const barUrl = Endpoints.db + '/table/sku_pricing/select';

    const selectObj = {};
    selectObj.columns = ['*', {
      'name': 'sku',
      'columns': ['*', {
        'name': 'brand',
        'columns': ['*']
      }]
    }];

    selectObj.where = {
      'state_short': {
        'cities': {
          'id': parseInt(cityId, 10)
        }
      },
      'is_active': true,
      'sku': {
        'is_active': true
      }
    };

    const options = {
      ...genOptions,
      body: JSON.stringify(selectObj)
    };

    return dispatch( requestAction( barUrl, options, SKU_FETCHED ) )
    .catch( () => {
      alert('Error While fetching organisation');
      return Promise.reject();
    });
    // return Promise.resolve();
  };
};

const getBar = ( barId ) => {
  return ( dispatch ) => {
    const barUrl = Endpoints.db + '/table/bars/select';

    const selectObj = {};
    selectObj.columns = ['*', {
      'name': 'inventories',
      'columns': ['*', {
        'name': 'sku_pricing',
        'columns': [{
          'name': 'sku',
          'columns': ['volume', {
            'name': 'brand',
            'columns': ['brand_name']
          }]
        }]
      }]
    }, {
      'name': 'addresses',
      'columns': ['*'],
      'order_by': '+created_at',
      'limit': 1
    }, {
      'name': 'city',
      'columns': ['*']
    }];

    selectObj.where = {
      'id': parseInt(barId, 10)
    };

    const options = {
      ...genOptions,
      body: JSON.stringify(selectObj)
    };

    return dispatch( requestAction( barUrl, options, BAR_INFO_FETCHED) )
    .then( ( resp ) => {
      dispatch(getSkus( resp[0].city_id ));
    })
    .catch( () => {
      alert('Error While fetching Bar');
      return Promise.reject();
    });
    // return Promise.resolve();
  };
};

const fetchBarReservations = (barId) => {
  return ( dispatch ) => {
    const barUrl = Endpoints.db + '/table/bar_reserved_items/select';
    const filterObj = {
      'columns': ['*'],
      'where': {
        'bar_id': parseInt(barId, 10)
      }
    };
    const options = {
      ...genOptions,
      body: JSON.stringify(filterObj)
    };
    return dispatch( requestAction( barUrl, options, BAR_SKU_FETCHED ) )
    .catch( () => {
      alert('Error While fetching BAR SKU');
      return Promise.reject();
    });
  };
};

const fetchInitials = (barId) => {
  return ( dispatch ) => {
    return Promise.all([
      dispatch(getBar(barId)),
      dispatch(fetchBarReservations(barId))
    ]);
    // return Promise.resolve();
  };
};

/* Reindexing SKUs for bars */

const indexSku = ( barIds ) => {
  return ( dispatch ) => {
    const barSkuIndexUrl = Endpoints.blogicUrl + '/admin/update_index/index/bar';

    /*
    if ( barIds.length === 0 ) {
      return Promise.reject('Bar cannot be empty to index');
    }
    */

    const skuIndexObj = {
      'ids': [ barIds ]
    };

    const options = {
      ...genOptions,
      body: JSON.stringify(skuIndexObj)
    };

    return dispatch(requestAction(barSkuIndexUrl, options));
  };
};

/* End of it */

/* Saving */

const saveSku = ( barId ) => {
  return ( dispatch, getState ) => {
    const invUrl = Endpoints.blogicUrl + '/admin/bar/insert';

    const barState = getState().bar_sku_create_data;

    if ( new Date(barState.newSkuData.start_date).toISOString() === 'Invalid Date' ) {
      alert('Invalid Start Date');
      return Promise.reject();
    }

    if ( new Date(barState.newSkuData.end_date).toISOString() === 'Invalid Date' ) {
      alert('Invalid End Date');
      return Promise.reject();
    }

    const barDataObj = {
      ...barState.newSkuData,
      bar_id: parseInt(barId, 10),
      base_sku_price: parseFloat(barState.newSkuData.base_sku_price),
      negotiated_sku_price: parseFloat(barState.newSkuData.negotiated_sku_price),
      charges_and_tax_percentage: parseFloat(barState.newSkuData.charges_and_tax_percentage),
      start_date: barState.newSkuData.start_date + ':00.000000+05:30',
      end_date: barState.newSkuData.end_date + ':00.000000+05:30'
    };

    const brInsertCheck = [
      'listingOrder',
      'sku_pricing_id',
      'quantity',
      'base_sku_price',
      'negotiated_sku_price',
      'charges_and_tax_percentage',
      'start_date',
      'end_date'
    ];
    let brCheckStatus = true;
    const brList = [];

    brInsertCheck.forEach( ( i ) => {
      brCheckStatus = brCheckStatus && ( barDataObj[i] ? true : false );
      if ( barDataObj[i] === undefined) {
        brList.push(i);
      }
      if ( barDataObj[i] === 0) {
        brList.push(i);
      }
    });

    // This is THE spot
    // barDataObj.menuPrice = barDataObj.base_sku_price + (barDataObj.base_sku_price * barDataObj.charges_and_tax_percentage / 100);
    // barDataObj.hipbarPrice = barDataObj.negotiated_sku_price + (barDataObj.negotiated_sku_price * barDataObj.charges_and_tax_percentage / 100);


    if ( !brCheckStatus ) {
      let text = 'Following Fields Missing:\n';
      brList.forEach( ( i, index ) => {
        text += (index + 1) + ') ' + i + '\n';
      });
      alert(text);
      return Promise.reject({ stage: 0 });
    }

    const postData = { ...barDataObj };
    const options = {
      ...genOptions,
      body: JSON.stringify(postData)
    };

    return dispatch( requestAction( invUrl, options ) )
    .then( ( ) => {
      return Promise.all([
        dispatch( indexSku(parseInt(barId, 10) ) ),
        dispatch({ type: CLEAR_SKU }),
        dispatch({ type: TOGGLE_SKU_DIV }),
        dispatch(getBar( barId ))
      ]);
    }).catch( (error) => {
      alert('Unsuccessfull :' + error.message);
    });
    // return Promise.resolve();
  };
};
const updateSku = ( barId ) => {
  return ( dispatch, getState ) => {
    const invUrl = Endpoints.blogicUrl + '/admin/bar/insert';

    const barState = getState().bar_sku_create_data;
    const barDataObj = {
      ...barState.newSkuData,
      bar_id: parseInt(barId, 10)
    };

    /* Removing the arbitrary object */
    delete barDataObj.status;
    /* */

    const brInsertCheck = [
      'listingOrder',
      'sku_pricing_id',
      'quantity',
      'base_sku_price',
      'negotiated_sku_price',
      'charges_and_tax_percentage',
      'start_date',
      'end_date'
    ];
    let brCheckStatus = true;

    brInsertCheck.forEach( ( i ) => {
      brCheckStatus = brCheckStatus && ( barDataObj[i] ? true : false );
    });

    if ( !brCheckStatus ) {
      alert('All the fields for Bar are mandatory');
      return Promise.reject({ stage: 0 });
    }

    if ( new Date(barState.newSkuData.start_date).toISOString() === 'Invalid Date' ) {
      alert('Invalid Start Date');
      return Promise.reject();
    }

    if ( new Date(barState.newSkuData.end_date).toISOString() === 'Invalid Date' ) {
      alert('Invalid End Date');
      return Promise.reject();
    }

    const updatedBarDataObj = {
      ...barDataObj,
      bar_id: parseInt(barId, 10),
      base_sku_price: parseFloat(barState.newSkuData.base_sku_price),
      negotiated_sku_price: parseFloat(barState.newSkuData.negotiated_sku_price),
      charges_and_tax_percentage: parseFloat(barState.newSkuData.charges_and_tax_percentage),
      id: parseInt( barState.inventoryId, 10 )
    };

    // updatedBarDataObj.start_date = new Date(barDataObj.start_date).toISOString();
    // updatedBarDataObj.end_date = new Date(barDataObj.end_date).toISOString();

    const options = {
      ...genOptions,
      method: 'PUT',
      body: JSON.stringify(updatedBarDataObj)
    };

    return dispatch( requestAction( invUrl, options ) )
    .then( ( resp ) => {
      if ( resp ) {
        alert('Updated');
        return Promise.all([
          dispatch( indexSku(parseInt(barId, 10) ) ),
          dispatch({ type: CANCEL_SKU}),
          dispatch(getBar( barId ))
        ]);
      }
    }).catch((err) => {
      alert(JSON.stringify(err));
    });
    // return Promise.resolve();
  };
};

const disableSku = ( ) => {
  return ( dispatch, getState ) => {
    const currState = getState().bar_sku_create_data;
    const isEdit = currState.isEdit;
    if ( !isEdit ) {
      // Silently Die
      return Promise.resolve();
    }
    const skuId = currState.newSkuData.sku_pricing_id;
    const cancelReservations = ( skuId in currState.barSKUs ) ? currState.barSKUs[skuId] : [];
    if ( cancelReservations.length ) {
      const reservationObjs = {};
      const cancelUrl = Endpoints.blogicUrl + '/admin/cancel/bar';
      reservationObjs.itemId = cancelReservations;
      const options = {
        ...genOptions,
        body: JSON.stringify(reservationObjs),
        method: 'PUT'
      };
      return dispatch(requestAction(cancelUrl, options ))
      .then( ( resp ) => {
        console.log(resp);
        alert('Reservations Cancelled Successfully');
        return dispatch({ type: CANCEL_SKU });
      })
      .catch( ( ) => {
        alert('Something went wrong while cancelling reservations');
      });
    }
    alert('Nothing to cancel');
    return Promise.resolve();
  };
};

/* End of it */

/* Default State */

const defaultBarSkuState = {
  barData: [],
  skuData: [],
  showSku: false,
  barCityInfo: {},
  newSkuData: {
    sku_pricing_id: 0,
    hipbarPrice: 0,
    menuPrice: 0,
    is_active: false,
    listingOrder: 0,
    quantity: 0,
  },
  addedInventory: [],
  inventoryMap: {},
  inventoryId: 0,
  isEdit: false,
  barSKUs: {}
};

/* End of it */

/* Reducers */

const barSkuDataReducer = ( state = defaultBarSkuState, action ) => {
  switch ( action.type ) {
    case BAR_INFO_FETCHED:
      const pricingIds = [];
      const inventoryItems = {};

      action.data[0].inventories.forEach( ( sku ) => {
      // pricingIds.push(sku.sku_pricing_id);
      // inventoryItems[sku.sku_pricing_id] = sku;
        pricingIds.push(sku.id);
        inventoryItems[sku.id] = sku;
      });

      return { ...state, barData: action.data, barCity: action.data[0].city_id, barCityInfo: action.data[0].city, addedInventory: [ ...pricingIds ], inventoryMap: { ...inventoryItems }};
    case SKU_FETCHED:
      return { ...state, skuData: action.data };
    case VIEW_SKU:
      return { ...state, newSkuData: { ...state.inventoryMap[action.data], status: state.inventoryMap[action.data].is_active }, isEdit: true, inventoryId: state.inventoryMap[action.data].id, showSku: true };
    case TOGGLE_SKU_DIV:
      return { ...state, showSku: !state.showSku };
    case INPUT_VALUE_CHANGED:
      const brandSKUINFO = {};
      brandSKUINFO[action.data.key] = action.data.value;
      return { ...state, newSkuData: { ...state.newSkuData, ...brandSKUINFO}};
    case CLEAR_SKU:
      return { ...state, newSkuData: {} };
    case CANCEL_SKU:
      return { ...state, newSkuData: {}, showSku: false, inventoryId: 0, isEdit: false };
    case RESET_BAR_SKU:
      return { ...defaultBarSkuState };
    case BAR_SKU_FETCHED:
      const barSKUs = {};
      action.data.forEach( ( data ) => {
        if ( data.sku_pricing_id in barSKUs ) {
          barSKUs[data.sku_pricing_id].push(data.item_id);
        } else {
          barSKUs[data.sku_pricing_id] = [];
          barSKUs[data.sku_pricing_id].push(data.item_id);
        }
      });
      return { ...state, barSKUs: { ...barSKUs }};
    default:
      return { ...state };
  }
};

export default barSkuDataReducer;

export {
  RESET_BAR_SKU,
  fetchInitials,
  TOGGLE_SKU_DIV,
  INPUT_VALUE_CHANGED,
  saveSku,
  updateSku,
  VIEW_SKU,
  CANCEL_SKU,
  indexSku,
  disableSku
};
