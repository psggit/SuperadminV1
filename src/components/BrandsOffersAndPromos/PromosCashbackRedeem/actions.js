import {defaultState} from './state';
// data convertion
import { convertListToDictUsingKV,
  findDuplicatesIndices,
  removeElementsFromArray } from '../../../utils/data';

import {bugetAmountCalc} from './controller';

const ON_FAILED = '@PromosInstantCashback/ON_FAILED';
const ON_LOADING = '@PromosInstantCashback/ON_LOADING';
const DO_NOTHING = '@PromosInstantCashback/DO_NOTHING';

const VALUE_CHANGE = '@PromosInstantCashback/VALUE_CHANGE';

const ADD_PROMO = '@PromosInstantCashback/ADD_PROMO';
const REMOVE_PROMO = '@PromosInstantCashback/REMOVE_PROMO';
const EDIT_PROMO = '@PromosInstantCashback/EDIT_PROMO';

const PROMO_CHANGE = '@PromosInstantCashback/PROMO_CHANGE';

const INIT_COMPANY = '@PromosInstantCashback/INIT_COMPANY';
const INIT_BRAND_MANAGERS = '@PromosInstantCashback/INIT_BRAND_MANAGERS';

/**
 * The reduces deals with the default state of the various components
 * @param  {[type]} state  =             defaultState [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case VALUE_CHANGE:
      return { ...state, ...action.data};

    case PROMO_CHANGE:
      const editedPromo = { ...state.promos[action.index], ...action.data };
      let newPromosList = state.promos.slice(0, action.index)
        .concat(editedPromo).concat(state.promos.slice(action.index + 1));

      // check if the user has entered a new promo with the same set of infor
      // as a previous promo.
      const listOfDupicates = findDuplicatesIndices(newPromosList, (data) => {
        return {
          brandName: data.brandName,
          sku: data.sku,
          pricing: data.pricing
        };
      });

      let currentEditingPromo = state.currentEditingPromo;
      if (listOfDupicates.length > 0) {
        alert('Two or more promos have the same set of unique information. ' +
        'Which means you selected the same set of product multiple times. ' +
        'on this given campaigns. Continue will remove the duplicates ' +
        'from the list of promos attached to this campaign.');
        // will remove the set of index elements from the array.
        newPromosList = removeElementsFromArray(newPromosList, listOfDupicates);
        currentEditingPromo = 0;
      }
      let budgetedAmount = bugetAmountCalc(newPromosList);

      return {
        ...state,
        budgetedAmount: budgetedAmount,
        currentEditingPromo: currentEditingPromo,
        promos: newPromosList
      };

    case ADD_PROMO:
      newPromosList = state.promos.concat({
        brandName: '',
        promoName: '',
        sku: {},
        pricing: {},
        price: 0,
        quantity: 0,
        itemPrice: 0,
        type: 'amount'
      });
      return { ...state, promos: newPromosList,
        currentEditingPromo: (newPromosList.length - 1),
        isPromoSectionShown: true
      };

    case REMOVE_PROMO:
      // action data is the index which should be removed.
      newPromosList = state.promos.slice(0, action.data).concat(state.promos.slice(action.data + 1));

      budgetedAmount = newPromosList.length > 0 ? bugetAmountCalc(newPromosList) : 0;

      return { ...state,
        promos: newPromosList,
        currentEditingPromo: 0,
        budgetedAmount: budgetedAmount,
        isPromoSectionShown: (newPromosList.length > 0)
      };

    case EDIT_PROMO:
      return {
        ...state,
        currentEditingPromo: action.data,
        isPromoSectionShown: true,
      };

    case INIT_COMPANY:
      return {
        ...state,
        companies: action.data
      };

    case INIT_BRAND_MANAGERS:
      const brandManagerList = action.data && action.data.length > 0 ? action.data : [];
      const campaigns = brandManagerList.length > 0 ? brandManagerList[0].campaigns : [];
      const brands = brandManagerList.length > 0 ? brandManagerList[0].brands : [];

      const brandManagerCampaignMap = convertListToDictUsingKV('email', 'campaigns', brandManagerList);
      const brandManagerBrandMap = convertListToDictUsingKV('email', 'brands', brandManagerList);
      const brandManagerIdMap = convertListToDictUsingKV('email', 'id', brandManagerList);

      return { ...state,
        brandManagers: brandManagerList,
        brandManagerIdMap: brandManagerIdMap,
        campaigns: campaigns,
        brands: brands,
        brandManagerCampaignMap: brandManagerCampaignMap,
        brandManagerBrandMap: brandManagerBrandMap
      };
    case ON_FAILED:
      console.error(action.error);
      try {
        alert('Error during operation : ' + JSON.stringify(action.error));
      } catch (e) {
        alert('Error during operation : ' + action.error);
        console.error(e);
      }
      return { ...state };
    default:
      return state;
  }
};

export {
  reducer,
  VALUE_CHANGE,
  INIT_COMPANY,
  INIT_BRAND_MANAGERS,
  ADD_PROMO,
  EDIT_PROMO,
  REMOVE_PROMO,
  PROMO_CHANGE,
  ON_FAILED,
  DO_NOTHING,
  ON_LOADING
};

export default reducer;
