import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import commonDecorator from '../../../Common/CommonDecorator';
import BreadCrumb from '../../../Common/BreadCrumb';
import CreateSku from './CreateSku';

/* Action creator imports */
import { fetchBrand
  , fetchState
  , markStateSelected
  , unMarkStateSelected
  , markCitySelected
  , unMarkCitySelected
  , markRetailerSelected
  , unMarkRetailerSelected
  , viewState
  , viewCity
} from './CreateSkuActions';
/* */

class SkuWrapper extends Component {
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'SKU Management',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Create SKU',
      sequence: 2,
      link: '#'
    });
  }
  componentDidMount() {
    this.props.dispatch(fetchBrand());
    this.props.dispatch(fetchState());
  }
  onStateSelect(e) {
    const stateId = e.target.getAttribute('data-state-id');
    this.props.dispatch(( e.target.checked ) ? markStateSelected(parseInt(stateId, 10)) : unMarkStateSelected(parseInt(stateId, 10)));
  }
  onStateView(e) {
    const stateId = e.target.parentNode.getAttribute('data-view-state-id');
    this.props.dispatch( viewState(parseInt(stateId, 10)));
    console.log(stateId);
  }
  onCityView(e) {
    const cityId = ( e.target.tagName.toLowerCase() === 'p') ? e.target.getAttribute('data-view-city-id') : e.target.parentNode.getAttribute('data-view-city-id');
    const cityNode = document.querySelectorAll('[data-city-id="' + cityId + '"]');
    if (cityNode.length > 0) {
      if (cityNode[0].checked) {
        this.props.dispatch( viewCity(parseInt(cityId, 10)));
      } else {
        alert('Please select the city first to view the retailers');
      }
    } else {
      alert('Something is not right please contact the system administrator');
    }
    console.log(cityId);
  }
  onCityCheck(e) {
    const cityId = e.target.getAttribute('data-city-id');
    this.props.dispatch(( e.target.checked ) ? markCitySelected(parseInt(cityId, 10)) : unMarkCitySelected(parseInt(cityId, 10)));
  }

  onRetailerCheck(e) {
    const retailerId = e.target.getAttribute('data-retailer-id');
    this.props.dispatch(( e.target.checked ) ? markRetailerSelected(parseInt(retailerId, 10)) : unMarkRetailerSelected(parseInt(retailerId, 10)));
  }

  render() {
    // const { brandList, stateList, stateCityMapping, viewedState, viewedCity} = this.props;
    return (
          <div className="sku_wrapper">
            <BreadCrumb breadCrumbs={this.breadCrumbs} />
            <CreateSku {...this.props} onStateSelect={this.onStateSelect.bind(this)} onStateView={this.onStateView.bind(this)} onCityCheck={this.onCityCheck.bind(this)} onCityView={this.onCityView.bind(this) } onRetailerCheck={ this.onRetailerCheck.bind(this) }/>
          </div>
        );
  }
}

const mapStateToProps = (state) => {
  return {...state.create_sku_data, ...state.page_data};
};

SkuWrapper.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  brandList: PropTypes.array.isRequired,
  stateList: PropTypes.array.isRequired,
  stateCityMapping: PropTypes.object.isRequired,
  cityRetailerMapping: PropTypes.object.isRequired,
  viewedCity: PropTypes.object.isRequired,
  viewedState: PropTypes.object.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
};
const decoratedConnectedComponent = commonDecorator(SkuWrapper);
export default connect( mapStateToProps )(decoratedConnectedComponent);
