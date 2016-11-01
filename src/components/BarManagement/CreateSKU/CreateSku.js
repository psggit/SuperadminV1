import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchBrand,
  fetchCompany,
  fetchSkus,
  INPUT_VALUE_CHANGED,
} from './BrandAction';

// import TableHeader from '../../Common/TableHeader';

import formValidator from '../../Common/CommonFormValidator';

import commonDecorator from '../../Common/CommonDecorator';
import BreadCrumb from '../../Common/BreadCrumb';

class CreateSku extends Component { // eslint-disable-line no-unused-vars
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Bar Management',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'BAR SKU MANAGEMENT',
      sequence: 2,
      link: '/hadmin/bar_management/bar_sku_create_landing'
    });
    this.breadCrumbs.push({
      title: 'Create SKU from Existing Brand',
      sequence: 3,
      link: '#'
    });
  }
  componentWillMount() {
    Promise.all([
      this.props.dispatch(fetchCompany()),
      this.props.dispatch(fetchBrand()),
      this.props.dispatch(fetchSkus()),
    ]);
  }

  render() {
    const styles = require('./CreateSku.scss');

    const { ongoingRequest,
      brandList,
      skuList,
      companyList,
      companyId,
      brandId,
      skuId
    } = this.props;

    const filteredBrandList = brandList.filter( (brand) => {
      return ( companyId ) ? ( brand.company_id === companyId ) : true;
    });

    const filteredSkuList = skuList.filter( ( sku ) => {
      return ( brandId ) ? ( sku.brand_id === brandId ) : true;
    });

    const brandHtml = filteredBrandList.map(( brand, index) => {
      return (
          <option key={index} value={brand.id}>{brand.brand_name}</option>
        );
    });

    const skuHtml = filteredSkuList.map(( sku, index) => {
      return (
          <option key={index} value={sku.id}>{ sku.volume }</option>
        );
    });

    const companyHtml = companyList.map((company, index) => {
      return (
          <option key={index} value={company.id}>{company.name}</option>
        );
    });
    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className={styles.create_brand_container}>
          <div className={styles.heading + ' ' + styles.wd_100}>
            Create SKU from Existing Brand
          </div>
          <ul>
            <li>
              <label>Company Name</label>
              <select data-field-name="companyId" data-field-type="int" value={ companyId }>
                <option>Select Company</option>
                { companyHtml }
              </select>
            </li>
            <li>
              <label>Brand</label>
              <select data-field-name="brandId" data-field-type="int" value={ brandId }>
                <option>Select Brand</option>
                { brandHtml }
              </select>
            </li>
            <li>
              <label>Sku</label>
              <select data-field-name="skuId" data-field-type="int" value={ skuId } >
                <option>Select SKU</option>
                { skuHtml }
              </select>
            </li>
          </ul>
        </div>
        <div className="clearfix"></div>
        <button className={styles.edit_brand_btn} disabled={ ongoingRequest ? true : false}>
          Create Brand
        </button>
      </div>);
  }
}

CreateSku.propTypes = {
  ongoingRequest: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  skuList: PropTypes.array.isRequired,
  brandList: PropTypes.array.isRequired,
  companyList: PropTypes.array.isRequired,
  companyId: PropTypes.number.isRequired,
  skuId: PropTypes.number.isRequired,
  brandId: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {...state.page_data, ...state.bar_sku_data };
};

const decoratedOne = formValidator(CreateSku, 'data-field-name', 'data-field-type', INPUT_VALUE_CHANGED);
const decoratedConnectedComponent = commonDecorator(decoratedOne);
export default connect(mapStateToProps)(decoratedConnectedComponent);
