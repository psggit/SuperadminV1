import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import { Link } from 'react-router';

import { getStateGenreData } from '../ToppicksIn/TopPicksInAction';
import { getBrandSKUData
  , BRAND_CHANGED
  , SKU_PRICING_CHANGED
  , CLEAR_SELECTED_SKU_PRICING
  , addTopPickBackend
  , RESET
} from './AddTopPickAction';

/*
 * Decorator which adds couple of use ful features like
 * 1. Clearing the state on component unmount
 * 2. Displaying/Hiding Loading icon on ajax fetch/complete
*/
import commonDecorator from '../../../Common/CommonDecorator';
import BreadCrumb from '../../../Common/BreadCrumb';

/*
 1. Required Components:
      a) Pagination
      b) Loading Screen *Done*
      c) Search
      d) Header *Done*
      e) Listing Component
*/

class AddTopPicksWrapper extends React.Component { // eslint-disable-line no-unused-vars
  constructor(props) {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'SKU Management',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Manage SKU',
      sequence: 2,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Top Picks',
      sequence: 3,
      link: '/hadmin/skus/toppicks'
    });
    /* 4 and 5 are inside the render function */
    this.breadCrumbs.push({
      title: 'Add',
      sequence: 6,
      link: '#'
    });

    let { genreId, stateId } = props.params;
    genreId = parseInt(genreId, 10);
    stateId = parseInt(stateId, 10);
    this.genreId = genreId;
    this.stateId = stateId;
  }
  componentDidMount() {
    this.props.dispatch(getStateGenreData(this.genreId, this.stateId));
    this.props.dispatch(getBrandSKUData(this.genreId, this.stateId));
  }
  componentWillUnmount() {
    this.props.dispatch({ type: RESET });
  }
  brandChanged(e) {
    const selectedOptions = e.target.selectedOptions;
    this.props.dispatch( { type: BRAND_CHANGED, data: parseInt(selectedOptions[0].value, 10) } );
  }
  skuPricingChanged(e) {
    const selectedOptions = e.target.selectedOptions;
    const optionValue = parseInt(selectedOptions[0].value, 10);
    if (!optionValue) {
      alert('Please select brand or select a valid sku option to proceed');
      this.props.dispatch({ type: CLEAR_SELECTED_SKU_PRICING });
      return false;
    }
    this.props.dispatch( { type: SKU_PRICING_CHANGED, data: optionValue } );
  }
  addTopPick() {
    this.props.dispatch( addTopPickBackend() );
  }
  render() {
    const styles = require('./AddTopPicksWrapper.scss');
    const { state, genre, brandList, selectedBrand, skuPricingId} = this.props;

    const updatedBreadCrumbs = [ ...this.breadCrumbs ];
    updatedBreadCrumbs.push({
      title: state,
      sequence: 4,
      link: '#'
    });
    updatedBreadCrumbs.push({
      title: genre,
      sequence: 5,
      link: '#'
    });

    const brandHtml = brandList.map((brand, index) => {
      return (
          <option key={index} value={brand.id}>{ brand.brand_name }</option>
        );
    });

    const skuHtml = (Object.keys(selectedBrand).length > 0) ?
      selectedBrand.skus.map((sku, index) => {
        if (sku.pricings.length > 0) {
          return (
            <option key={index} value={sku.pricings[0].id}>{sku.volume} ml</option>
          );
        }
      })
      :
      (
        <option value="Please select brand to select sku">
          Please select brand to select sku
        </option>
      );

    return (
        <div className={styles.container}>
          <BreadCrumb breadCrumbs={updatedBreadCrumbs} />
          <div className={styles.edit_account_details_container}>
            <div className={styles.account_details_form}>
              <label className={styles.heading}>Add Top Pick</label>
              {/*
              <div className={styles.indiv_form + ' ' + styles.wd_100}>
                <label>Order</label>
                <input type="text" data-field-name="full_name" />
              </div>
              */}
              <div className={styles.indiv_form + ' ' + styles.wd_100}>
                <label>Card Type</label>
                <select>
                  <option value="SKU">SKU</option>
                </select>
              </div>
              <div className={styles.indiv_form + ' ' + styles.wd_100}>
                <label>Brand</label>
                <select data-field-name="brand" data-field-type="int" onChange={ this.brandChanged.bind(this) }>
                  <option value="Select SKU">
                    Select Brand
                  </option>
                  { brandHtml }
                </select>
              </div>
              <div className={styles.indiv_form + ' ' + styles.wd_100}>
                <label>SKU</label>
                <select data-field-name="sku_pricing" data-field-type="int" onChange={ this.skuPricingChanged.bind(this) } value={ skuPricingId }>
                  <option value="0">
                    Select SKU
                  </option>
                  { skuHtml }
                </select>
              </div>
              <div className="clearfix"></div>
              <button className={styles.update_user_btn} onClick={ this.addTopPick.bind(this) }>Add Top Pick</button>
            </div>
          </div>
        </div>
        );
  }
}

AddTopPicksWrapper.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  brandList: PropTypes.array.isRequired,
  selectedBrand: PropTypes.object.isRequired,
  skuPricingId: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return { ...state.page_data, ...state.sku_top_picks_state_genre_data, ...state.add_top_picks_data };
};

const decoratedConnectedComponent = commonDecorator(AddTopPicksWrapper);// connect(mapStateToProps)(CommonDecorator);

export default connect(mapStateToProps)(decoratedConnectedComponent);
