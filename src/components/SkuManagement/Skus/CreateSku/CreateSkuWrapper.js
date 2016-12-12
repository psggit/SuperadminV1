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
  , STATE_MRP_INFORMATION
  , onSave
  , onUpdate
  , updateComponentState
  , getReservedItems
  , disableSku
  , RESET
} from './CreateSkuActions';

import {
  REQUEST_COMPLETED,
  MAKE_REQUEST
} from '../../../Common/Actions/Actions';
/* */

class SkuWrapper extends Component {
  constructor(props) {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'SKU Management',
      sequence: 1,
      link: '/hadmin/skus/list_sku'
    });
    this.breadCrumbs.push({
      title: ((props.params.Id) ? 'Edit SKU' : 'Create SKU'),
      sequence: 2,
      link: '#'
    });
  }
  componentDidMount() {
    /* Check if its a view request */
    /* Load more information incase of view/edit page */
    const { Id } = this.props.params;

    /* If a particular page is requested then load the page */
    if ( Id ) {
      Promise.all([
        this.props.dispatch({ type: MAKE_REQUEST }),

        this.props.dispatch(fetchBrand()),
        this.props.dispatch(fetchState()),
        this.props.dispatch(updateComponentState('edit_page', parseInt(Id, 10))),
        this.props.dispatch(getReservedItems(Id))
      ])
      .then( ( ) => {
        this.props.dispatch({ type: REQUEST_COMPLETED});
        console.log('Done');
      })
      .catch( () => {
        this.props.dispatch({ type: REQUEST_COMPLETED});
        console.log('Caught');
      });
    } else {
      Promise.all([
        this.props.dispatch({ type: MAKE_REQUEST }),
        this.props.dispatch(fetchBrand()),
        this.props.dispatch(fetchState())
      ])
      .then( () => {
        this.props.dispatch({ type: REQUEST_COMPLETED});
      })
      .catch( () => {
        this.props.dispatch({ type: REQUEST_COMPLETED});
      });
    }
  }
  componentWillUnmount() {
    this.props.dispatch({ type: RESET });
  }
  onStateSelect(e) {
    const stateId = e.target.getAttribute('data-state-id');
    this.props.dispatch(( e.target.checked ) ? markStateSelected(stateId) : unMarkStateSelected(stateId));
  }
  onStatePriceEntered(e) {
    const changedValue = e.target.getAttribute('data-field-name');
    const stateId = e.target.getAttribute('data-state-id');

    const data = {};
    data[changedValue] = parseFloat(e.target.value);
    data.key = changedValue;
    data.state_id = stateId;
    this.props.dispatch({ type: STATE_MRP_INFORMATION, data: { ...data }});
  }
  onStateView(e) {
    const stateId = e.target.parentNode.getAttribute('data-view-state-id');
    this.props.dispatch( viewState(stateId));
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

  onSaveClick() {
    this.props.dispatch(onSave());
  }
  onUpdateClick() {
    console.log('updating');
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch(onUpdate())
    ])
    .then( ( ) => {
      this.props.dispatch({ type: REQUEST_COMPLETED});
    })
    .catch( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED});
    });
  }
  onSkuInfoChange(e) {
    console.log(e.target);
  }

  disableSKUs() {
    console.log('clicked');
    this.props.dispatch( disableSku() );
  }

  render() {
    // const { brandList, stateList, stateCityMapping, viewedState, viewedCity} = this.props;
    return (
          <div className="sku_wrapper">
            <BreadCrumb breadCrumbs={this.breadCrumbs} />
            <CreateSku {...this.props}
              onStateSelect={this.onStateSelect.bind(this)}
              onStatePriceEntered={this.onStatePriceEntered.bind(this)}
              onStateView={this.onStateView.bind(this)}
              onCityCheck={this.onCityCheck.bind(this)}
              onCityView={this.onCityView.bind(this)}
              onRetailerCheck={this.onRetailerCheck.bind(this)}
              dispatch={ this.props.dispatch }
              onSave = { this.onSaveClick.bind(this) }
              skuReqObj = { this.props.skuReqObj }
              page = { this.props.currentPage }
              onUpdate = { this.onUpdateClick.bind(this) }
              disableSKUs = { this.disableSKUs.bind(this) }
            />
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
  reservedItems: PropTypes.array.isRequired,
  stateCityMapping: PropTypes.object.isRequired,
  cityRetailerMapping: PropTypes.object.isRequired,
  viewedCity: PropTypes.object.isRequired,
  viewedState: PropTypes.object.isRequired,
  skuReqObj: PropTypes.object.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  currentPage: PropTypes.string.isRequired
};
const decoratedConnectedComponent = commonDecorator(SkuWrapper);
export default connect( mapStateToProps )(decoratedConnectedComponent);
