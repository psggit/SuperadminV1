import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchGenres, fetchSkus, fetchSkuInventories, fetchRetailers, fetchBrands} from './GlobalIndexActions';
import { updateGenres, updateSkus, updateSkuInventories, updateRetailers, updateBrands} from './GlobalIndexActions';
import { RESET } from './GlobalIndexActions';
import commonDecorator from '../Common/CommonDecorator';
import BreadCrumb from '../Common/BreadCrumb';

class PositionListing extends Component { // eslint-disable-line no-unused-vars
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Position Listing',
      sequence: 1,
      link: '#' // TODO
    });
    this.breadCrumbs.push({
      title: 'Update',
      sequence: 2,
      link: '#' // TODO
    });
  }
  componentWillMount() {
    Promise.all([
      this.props.dispatch(fetchGenres()),
      this.props.dispatch(fetchSkus()),
      this.props.dispatch(fetchSkuInventories()),
      this.props.dispatch(fetchRetailers()),
      this.props.dispatch(fetchBrands())
    ]);
  }
  componentWillUnmount() {
    this.props.dispatch({ type: RESET });
  }
  indexGenres() {
    updateGenres();
  }
  indexSku() {
    updateSkus();
  }
  indexInventories() {
    updateSkuInventories();
  }
  indexRetailes() {
    updateRetailers();
  }
  indexBrands() {
    updatBrands();
  }
  render() {
    const styles = require('./PositionList.scss');
    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className={styles.brand_wrapper}>
          INDEX ALL GENRES: <button onClick={indexGenres}></button> 
          INDEX ALL SKU: <button onClick={indexGenres}></button> 
          INDEX ALL SKU INVENTORIES: <button onClick={indexGenres}></button> 
          INDEX ALL RETAILERS: <button onClick={indexGenres}></button> 
          INDEX ALL BRANDS: <button onClick={indexGenres}></button> 
          <div className="clearfix"></div>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}

PositionListing.propTypes = {
  allState: PropTypes.array.isRequired,
  allList: PropTypes.array.isRequired,
  allTypes: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {...state.page_data, ...state.positionLimitsState};
};

const decoratedConnectedComponent = commonDecorator(PositionListing);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
