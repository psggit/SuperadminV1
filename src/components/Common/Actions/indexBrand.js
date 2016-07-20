import requestAction from './requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';

const indexBrand = ( brandId ) => {
  return (dispatch) => {
    const brandObj = {};
    const url = Endpoints.baseUrl + '/retailer/inventory/update_brand';

    brandObj.brand = [ brandId ];
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify( brandObj ),
    };
    return dispatch(requestAction(url, options));
  };
};

export default indexBrand;
