import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { definePage, fetchSKU, fetchProducts, fetchMisc, fetchBrands, citiesViewHandler, IMAGE_CANCEL} from './MiscellaneousItemActions';
import { selectCitySpecificBar, checkState, unCheckState, finalSave } from './MiscellaneousItemActions';
import { RESET } from './MiscellaneousItemActions';
/*
  Decorator which adds couple of use ful features like
  1. Clearing the state on component unmount
  2. Displaying/Hiding Loading icon on ajax fetch/complete
*/
import commonDecorator from '../Common/CommonDecorator';
import BreadCrumb from '../Common/BreadCrumb';
import SearchWrapper from '../RetailerManagement/CreateBranch/SearchWrapper';
import Lister from '../RetailerManagement/CreateBranch/Lister';

/* Components */
import MiscInfo from './MiscInfo';
import BarInfo from './BarInfo';

class CreateWelcomeDrink extends Component { // eslint-disable-line no-unused-vars
  constructor(props) {
    super();
    const barId = props.params.Bid;
    const miscId = props.params.Mid;
    this.breadCrumbs = [];
    if (barId !== undefined) {
      this.breadCrumbs.push({
        title: 'Map Bar',
        sequence: 1,
        link: '#' // TODO
      });
      this.breadCrumbs.push({
        title: barId,
        sequence: 2,
        link: '/hadmin/bar_management/edit_bar/' + barId // TODO
      });
    }
    if (miscId !== undefined) {
      this.breadCrumbs.push({
        title: 'Map',
        sequence: 3,
        link: '#' // TODO
      });
      this.breadCrumbs.push({
        title: 'Miscellaneous Item',
        sequence: 4,
        link: '#' // TODO
      });
      this.breadCrumbs.push({
        title: miscId,
        sequence: 5
      });
    }
  }
  componentWillMount() {
    const barId = this.props.params.id;
    const miscId = this.props.params.Mid;
    Promise.all([
      this.props.dispatch(definePage(barId, miscId)),
      this.props.dispatch(fetchMisc(1))
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
  onClickHandleIventoryListing(e) {
    e.preventDefault();
    const currentPage = parseInt(e.target.outerText, 10);
    // const brId = this.props.params.brId;
    console.log(e.target.outerText);
    if (currentPage) {
      Promise.all([
        this.props.dispatch(fetchMisc(currentPage))
      ]);
    }
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
  onCityChange(e) {
    this.props.dispatch(selectCitySpecificBar(e.target.value));
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
          <MiscInfo miscAll={this.props.miscAll} type={this.props.page} data={this.props.misc_detail} dispatch={this.props.dispatch}/>
          <BarInfo onCityChange={this.onCityChange.bind(this)} barsAll={this.props.barsAll} citiesAll={this.props.citiesAll} type={this.props.page} data={this.props.misc_detail} dispatch={this.props.dispatch}/>
          <div className="clearfix"></div>
          <div className="clearfix"></div>
          <button className={styles.edit_brand_btn} onClick={this.onClickSave.bind(this)}>
            Save
          </button>
        </div>
        <SearchWrapper title = { 'Miscellaneous Mappings' } body = { ['bar_name', 'hipbar_price', 'menu_price', 'start_date', 'end_date', 'charge_and_tax_percentage'] } head = { ['Bar Name', 'Hipbar Price', 'Menu Price', 'ActiveFrom', 'ActiveTo', 'Charge and tax percentage'] } data={this.props.miscellaneousInformation} />
        <Lister limit="10" onClickHandler={this.onClickHandleIventoryListing.bind(this)} currentPage={this.props.miscellaneousInformationPage} showMax="5" count={this.props.miscellaneousInformationCount} />
      </div>
    );
  }
}

CreateWelcomeDrink.propTypes = {
  params: PropTypes.object.isRequired,
  misc_detail: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired,
  miscellaneousInformationPage: PropTypes.array.isRequired,
  miscellaneousInformationCount: PropTypes.array.isRequired,
  miscellaneousInformation: PropTypes.array.isRequired,
  miscAll: PropTypes.array.isRequired,
  citiesAll: PropTypes.array.isRequired,
  barsAll: PropTypes.array.isRequired,
  selectedCity: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {...state.page_data, ...state.miscellaneousItemMapState};
};

const decoratedConnectedComponent = commonDecorator(CreateWelcomeDrink);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
