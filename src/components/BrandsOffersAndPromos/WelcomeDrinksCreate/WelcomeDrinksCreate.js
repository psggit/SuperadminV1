import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchStates, fetchSKU, fetchProducts, fetchBrands, citiesViewHandler, IMAGE_CANCEL} from './CreateAdBarActions';
import { checkState, unCheckState } from './CreateAdBarActions';
import { finalSave } from './CreateAdBarActions';
import { RESET } from './CreateAdBarActions';
/*
  Decorator which adds couple of use ful features like
  1. Clearing the state on component unmount
  2. Displaying/Hiding Loading icon on ajax fetch/complete
*/
import commonDecorator from '../../Common/CommonDecorator';
import BreadCrumb from '../../Common/BreadCrumb';

/* Components */
import AdInfo from './AdInfo';

class CreateWelcomeDrink extends Component { // eslint-disable-line no-unused-vars
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Welcome Drinks',
      sequence: 1,
      link: '#' // TODO
    });
    this.breadCrumbs.push({
      title: 'Create',
      sequence: 2,
      link: '#' // TODO
    });
  }
  componentWillMount() {
    Promise.all([
      this.props.dispatch(fetchStates())
    ]);
  }
  componentWillUnmount() {
    this.props.dispatch({ type: RESET });
  }
  onClickCitiesView(stateObj) {
    Promise.all([
      this.props.dispatch(citiesViewHandler(stateObj))
    ]);
  }
  onCancelClick() {
    this.props.dispatch({ type: IMAGE_CANCEL});
  }
  onChangeStateCheck(state, e) {
    if (e.target.checked) {
      Promise.all([
        this.props.dispatch(checkState(state))
      ]);
    } else {
      Promise.all([
        this.props.dispatch(unCheckState(state))
      ]);
    }
  }
  onBrandChange(e) {
    this.props.dispatch(fetchSKU(e.target.value));
  }
  onStateChange(e) {
    this.props.dispatch(fetchBrands(e.target.value));
  }
  onSkuChange(e) {
    this.props.dispatch(fetchProducts(e.target.value));
  }

  onClickSave() {
    Promise.all([
      this.props.dispatch(finalSave())
    ]);
  }
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  render() {
    const styles = require('./CreateBarAd.scss');
    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className={styles.brand_wrapper}>
          <AdInfo dispatch={this.props.dispatch} stateSelect={this.onStateChange.bind(this)} campaignDetails={this.props.campaignDetails} brandSelect={this.onBrandChange.bind(this)} skuSelect={this.onSkuChange.bind(this)} skus={this.props.availableSkus} products={this.props.availableProducts} brands={this.props.brandsAll} cities={this.props.citiesAll} selectedCity={this.props.selectedCity} />
          <div className="clearfix"></div>
          <div className="clearfix"></div>
          <button className={styles.edit_brand_btn} onClick={this.onClickSave.bind(this)}>
            Save
          </button>
        </div>
      </div>
    );
  }
}

CreateWelcomeDrink.propTypes = {
  citiesAll: PropTypes.array.isRequired,
  brandsAll: PropTypes.array.isRequired,
  availableSkus: PropTypes.array.isRequired,
  campaignDetails: PropTypes.array.isRequired,
  availableProducts: PropTypes.array.isRequired,
  selectedCity: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {...state.page_data, ...state.welcomeDrinksState};
};

const decoratedConnectedComponent = commonDecorator(CreateWelcomeDrink);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
