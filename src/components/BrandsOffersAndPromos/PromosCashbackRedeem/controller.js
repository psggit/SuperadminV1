/**
 * The below is structural breaking of the code. Since redux takes care of the
 * Modal-Controller part of the code and react the View.
 *
 * NOTE: A controller can deal with aspects such as validation processing data etc.
 * Keep actions.js simple and sweet :)
 *
 * action.js should do the bare minimum, try avoiding validation and testing in actions.
 * keep them in the controller.
 */

// Get all the actions which can be dispatched.
import {VALUE_CHANGE, INIT_BRAND_MANAGERS,
  ADD_PROMO, REMOVE_PROMO, EDIT_PROMO, PROMO_CHANGE,
  DO_NOTHING, ON_FAILED, ON_LOADING} from './actions';
// Request maker
import {makeRequest, createFetchOption} from '../../../utils/fetch';
// All queries for the page. NOTE: We can reuse query across pages.
import {
  selectBrandManagers,
  insertCampaignAndPromos } from './fetchQueries';

// validators
import { email as emailValidate,
  isEmpty, isNumber } from '../../../utils/validation';

import { convertStrToISODate, convertStrToPosgresDateStr } from '../../../utils/data';

// initial state
const fetchData = (getState, dispatch) => {
  const promises = [];
  promises.push(dispatch(makeRequest(selectBrandManagers.url, createFetchOption(selectBrandManagers.query), INIT_BRAND_MANAGERS, ON_FAILED, ON_LOADING)));

  return Promise.all(promises);
};

// Modal
const mapStateToProps = (state) => {
  return {...state.promosCashbackRedeemState};
};

/**
 * Calculates the budgets based on the promos
 *
 * @param  {Array} promos  promos array
 * @return {Number}        The amount
 */
const bugetAmountCalc = (promos) => {
  return promos.map((promo) => {
    const price = parseFloat(promo.price);
    const quantity = parseInt(promo.quantity, 10);
    const itemPrice = promo.pricing && promo.pricing.price
      ? parseFloat(promo.pricing.price) : 0;
    return promo.type === 'amount' ? (price * quantity) :
    ((((price / 100)) * itemPrice) * quantity);
  }).reduce((sum, discount) => {
    return sum + discount;
  });
};

/**
 * The validation dictionary has a bunch of functions which is used
 * for the validation of the fieldName is used to find the key. And the value & otherValues
 * is passed as a parameter to the function.
 *
 * @type {Dictionary} return type is function.
 *
 * TODO: Composite the function when you get time... Pass success and failure function insted
 * of hard-coding them.
 */
const campaignValidatorsDict = {
  brandEmail: (value) => {
    return emailValidate(value) ? () => {
      return true;
    } : () => {
      alert('Email isn\'t valid!');
      return false;
    };
  },
  campaignName: (value) => {
    return !isEmpty(value) ? () => {
      return true;
    } : () => {
      alert('Campaign name can\'t be empty!');
      return false;
    };
  },
  budgetedAmount: (value, otherValues) => {
    return isNumber(value) && parseFloat(value) <= parseFloat(otherValues.fundsCredited) ? () => {
      return true;
    } : () => {
      if (isNaN(value)) {
        alert('Amount has to be number.');
      } else {
        alert('Budgeted-amount is much more than funds-credited!');
      }
      return false;
    };
  },
  fundsCredited: (value, otherValues) => {
    return isNumber(value) && parseFloat(value) >= otherValues.minAmount ? () => {
      return true;
    } : () => {
      if (isNaN(value)) {
        alert('Amount has to be number.');
      } else {
        alert('Funds credited is less than 1 Re!');
      }
      return false;
    };
  },
  activeFrom: (value, otherValues) => {
    return new Date(value) <= new Date(otherValues.activeTo) &&
      new Date(value) >= new Date() ? () => {
        return true;
      } : () => {
        alert('Active-From date should be lesser-than or equal to Active-To date');
        return false;
      };
  },
  activeTo: (value, otherValues) => {
    return new Date(value) >= new Date(otherValues.activeFrom) ? () => {
      return true;
    } : () => {
      alert('Active-To date should be greater-than or equal to Active-From date');
      return false;
    };
  }
};

const promoValidatorDict = {
  // below are the validations for promo array.
  type: (value, otherValues) => {
    const maxPriceFloat = parseFloat(otherValues.maxPrice);
    const priceFloat = parseFloat(otherValues.price);

    return (value && (value.toLowerCase() === 'amount' ||
        value.toLowerCase() === 'percentage') && (
          (priceFloat < 100 && value.toLowerCase() === 'percentage') ||
          (value.toLowerCase() === 'amount' && priceFloat <= (maxPriceFloat - 1))
        )) ?
      () => {
        return true;
      } : () => {
        alert('Promo type should be percentage \'or\' amount. If the discount'
        + ' is percentage keep it below 100 and if amount then cost should be'
        + ' below max price.');
        return false;
      };
  },
  brandName: () => {
    return () => {
      return true;
    };
  },
  price: (value, otherValues) => {
    const valueFloat = parseFloat(value);
    const maxPriceFloat = otherValues.maxPrice ?
    parseFloat(otherValues.maxPrice) : 0;

    return (
      (valueFloat < 100 && otherValues.type.toLowerCase() === 'percentage') ||
      (valueFloat <= (maxPriceFloat - 1) && otherValues.type.toLowerCase() === 'amount')) ? () => {
        return true;
      } : () => {
        alert('The amount should be less than product price (Pick a product first!) and percentage should be below 100.');
        return false;
      };
  },
  sku: (sku, otherValues) => {
    // returns true if the range of the sku is a subset or super-set
    // of the current campaign's activeTo or activeFrom date.
    const dateRangeCheck = ({activeTo, activeFrom}) => {
      const activeToDate = convertStrToISODate(activeTo);
      const activeFromDate = convertStrToISODate(activeFrom);
      const campaignActiveToDate = convertStrToISODate(otherValues.activeTo, false);
      const campaignActiveFromDate = convertStrToISODate(otherValues.activeFrom, false);

      // if the offer activeFromDate within a previous campaign date
      if (activeFromDate <= campaignActiveFromDate <= activeToDate) {
        return true;
        // if the offer activeFromDate within a previous campaign date
      } else if (activeFromDate <= campaignActiveToDate <= activeToDate) {
        return true;
        // if the offer  campaign date are a super-set of the active dates
        // of a offer.
      } else if (campaignActiveFromDate <= activeFromDate <= activeToDate
          <= campaignActiveToDate) {
        return true;
      }
      return false;
    };
    // Find out campaign which concide with the campaign.
    const coincidingCampaigns = sku.pricings.filter((pricing) => {
      const offers = pricing.cash_back_offers.filter((offer) => {
        return dateRangeCheck({
          activeFrom: offer.offer.campaign.active_from,
          activeTo: offer.offer.campaign.active_to
        });
      });
      return offers.length > 0;
    });
    // if the array has one coinciding campaign then don't allow.
    return coincidingCampaigns.length <= 0 ? () => {
      return true;
    } : () => {
      alert('This sku already has a campaign running with the dates'
        + ' coinciding.');
      return false;
    };
  },
  pricing: (value) => {
    return value && value.state_short && value.state_short.state_name ? () => {
      return true;
    } : () => {
      alert('The pricing can\'t be empty. (A state shoule be picked)');
      return false;
    };
  },
  quantity: (quantity, otherValues) => {
    const isValid = (() => {
      const quantityInt = parseInt(quantity, 10);

      const priceFloat = parseFloat(otherValues.price);
      const itemPriceFloat = parseFloat(otherValues.itemPrice);

      const fundsCreditedFloat = parseFloat(otherValues.fundsCredited);

      let budgetAmount = bugetAmountCalc(otherValues.promos);
      const promo = otherValues.promos[otherValues.currentEditingPromo];

      const prevQuantityInt = parseInt(promo.quantity, 10);
      const prevPriceFloat = parseFloat(promo.price);
      const prevItemPriceFloat = parseFloat(promo.itemPrice);
      const prevType = promo.type;

      if (prevType === 'amount') {
        budgetAmount = budgetAmount - (prevPriceFloat * prevQuantityInt);
      } else {
        budgetAmount = budgetAmount - (((prevPriceFloat / 100) * prevItemPriceFloat)
        * prevQuantityInt);
      }

      if (otherValues.type === 'amount') {
        budgetAmount = budgetAmount + (priceFloat * quantityInt);
      } else {
        budgetAmount = budgetAmount + (((priceFloat / 100) * itemPriceFloat)
        * quantityInt);
      }

      if (budgetAmount > fundsCreditedFloat) {
        return false;
      }
      return true;
    })();
    return isValid && parseInt(quantity, 10) >= 0 ? () => {
      return true;
    } : () => {
      alert('The quantity and price is more than the funded credited.');
      return false;
    };
  }
};

const promoDefaultDict = {
  type: (value) => {
    return value ? value : 'amount';
  }
};

/**
 * The validators function takes 3 arguments. The otherValues are used for
 * validations which required another variable to validate the fieldValue
 * @param  {String} fieldName        The feildName stored in the state variable.
 * @param  {Object} fieldValue       [The value can be any type.
 * @param  {Object} [otherValues={}] The other values are used to compare fieldValue
 *
 * @return {bool}                  If the validation is successful.
 */
const validators = (validatorsDictObj, fieldName, fieldValue, otherValues = {}) => {
  return validatorsDictObj[fieldName](fieldValue, otherValues)();
};

// Controller
const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitData: (values, e) => {
      e.preventDefault();
      // validators check for input changes.
      if (validators(campaignValidatorsDict, 'brandEmail', values.brandEmail, values) &&
        validators(campaignValidatorsDict, 'campaignName', values.campaignName, values) &&
        validators(campaignValidatorsDict, 'budgetedAmount', values.budgetedAmount, values) &&
        validators(campaignValidatorsDict, 'fundsCredited', values.fundsCredited, values) &&
        validators(campaignValidatorsDict, 'activeFrom', values.activeFrom, values) &&
        validators(campaignValidatorsDict, 'activeTo', values.activeTo, values)) {
        // valid data of each promo
        for (let i = 0; i < values.promos.length; i++ ) {
          const promo = values.promos[i];
          // there are multiple promos.
          if (!validators(promoValidatorDict, 'type', promo.type, {...values,
            price: promo.price,
            type: promo.type,
            maxPrice: (promo.pricing ? promo.pricing.price : 0)})
          || !validators(promoValidatorDict, 'brandName', promo.brandName, values)
          || !validators(promoValidatorDict, 'price', promo.price, {...values,
            price: promo.price,
            type: promo.type,
            maxPrice: (promo.pricing ? promo.pricing.price : 0)})
          || !validators(promoValidatorDict, 'sku', promo.sku, values)
          || !validators(promoValidatorDict, 'pricing', promo.pricing, values)
          || !validators(promoValidatorDict, 'quantity', promo.quantity, {...values,
            price: promo.price,
            type: promo.type,
            maxPrice: (promo.pricing ? promo.pricing.price : 0),
            currentEditingPromo: i
          })) {
            return;
          }
        }

        // If everything is valid then perform the submit of the data.
        // FIXME: This is not a transaction and basically need to be replaced
        // by transaction, but since HasuraDB doesn't yet support transaction with
        // references.
        const insertCampaignQuery = insertCampaignAndPromos.insertCampaign({
          name: values.campaignName,
          status: values.campaignStatus,
          active_from: convertStrToPosgresDateStr(values.activeFrom),
          active_to: convertStrToPosgresDateStr(values.activeTo),
          brand_manager_id: values.brandManagerBrandMap[values.brandEmail][0].id,
          budgeted_amount: parseFloat(values.budgetedAmount),
          funds_credited: parseFloat(values.fundsCredited)
        });

        dispatch(makeRequest(insertCampaignQuery.url, createFetchOption(insertCampaignQuery.query), DO_NOTHING, ON_FAILED, ON_LOADING)).then((campaign) => {
          // the array will have a single campaign
          const insertPromosQuery = insertCampaignAndPromos.insertPromos({
            campaign_id: campaign[0].id,
            promos: values.promos
          });
          dispatch(makeRequest(insertPromosQuery.url, createFetchOption(insertPromosQuery.query), DO_NOTHING, ON_FAILED, ON_LOADING)).then((cashbackOffers) => {
            const insertPromosSKUsQuery = insertCampaignAndPromos.insertPromosSKUs({
              promos: values.promos,
              offers: cashbackOffers
            });
            dispatch(makeRequest(insertPromosSKUsQuery.url, createFetchOption(insertPromosSKUsQuery.query), DO_NOTHING, ON_FAILED, ON_LOADING)).then((cashbackOffersSKU) => {
              alert('Successful inserted campaign and corresponding skus');
              console.log(cashbackOffersSKU);
            }, (error) => {
              console.error('<<----- This is a transaction error (Cashback Offer SKU Insert operation)------>>');
              console.error(error);
            });
          }, (error) => {
            console.error('<<----- This is a transaction error (Cashback Offer Insert operation)------>>');
            console.error(error);
          });
        }, (error) => {
          console.error('<<----- This is a transaction error (campaign Insert operation)------>>');
          console.error(error);
        });
      }
    },

    onAddPromo: (e) => {
      e.preventDefault();
      dispatch({type: ADD_PROMO});
    },

    onRemovePromo: (index, e) => {
      e.preventDefault();
      dispatch({type: REMOVE_PROMO, data: index});
    },

    onEditPromo: (index, e) => {
      e.preventDefault();
      dispatch({type: EDIT_PROMO, data: index});
    },

    onChangePromoInfo: (fieldName, index, otherValues, e) => {
      // e.preventDefault();
      const newValueObj = {};
      newValueObj[fieldName] = e.target.value;
      if (validators(promoValidatorDict, fieldName, newValueObj[fieldName], otherValues)) {
        dispatch({type: PROMO_CHANGE, data: newValueObj, index: index});
      }
    },

    onChangePromoObjInfo: (fieldName, index, obj, otherValues) => {
      // e.preventDefault();
      const newValueObj = {};
      newValueObj[fieldName] = obj;
      if (validators(promoValidatorDict, fieldName, newValueObj[fieldName], otherValues)) {
        dispatch({type: PROMO_CHANGE, data: newValueObj, index: index});
      }
    },

    onBrandManagerChange: (brandManagerCampaignMap, brandManagerBrandMap, e) => {
      const newValueObj = {};
      // store the brand manager related information.
      newValueObj.brandEmail = e.target.value;
      newValueObj.campaigns = brandManagerCampaignMap[newValueObj.brandEmail] ? brandManagerCampaignMap[newValueObj.brandEmail] : [];
      newValueObj.brands = brandManagerBrandMap[newValueObj.brandEmail] ? brandManagerBrandMap[newValueObj.brandEmail] : [];
      // Reset all the promos stored. Onces the user changes
      // NOTE: If you got time in the future you can use browser.storage
      newValueObj.promos = [];
      newValueObj.currentEditingPromo = 0;
      newValueObj.isPromoSectionShown = false;
      newValueObj.budgetedAmount = 0;

      dispatch({type: VALUE_CHANGE, data: newValueObj});
    },
    onValueChange: (fieldName, e) => {
      const newValueObj = {};
      newValueObj[fieldName] = e.target.value;
      dispatch({type: VALUE_CHANGE, data: newValueObj});
    },
    dispatch: (action) => {
      return dispatch(action);
    }
  };
};

export {
  promoDefaultDict,
  bugetAmountCalc,
  fetchData,
  mapStateToProps,
  mapDispatchToProps
};
