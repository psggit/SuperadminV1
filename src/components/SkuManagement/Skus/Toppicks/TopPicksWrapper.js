import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import commonDecorator from '../../../Common/CommonDecorator';
import BreadCrumb from '../../../Common/BreadCrumb';
import TopPicks from './TopPicksState';
import TopPicksGenre from './TopPicksGenre';

/* Action creators */
import {
  fetchStateGenre,
  STATE_SELECTED
} from './TopPicksAction';

/* Action creator imports */
// import {
//
// } from './CreateSkuActions';
/* */

class TopPicksSkuWrapper extends Component {
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
      title: 'SKU',
      sequence: 2,
      link: '/hadmin/skus'
    });
    this.breadCrumbs.push({
      title: 'Top Picks',
      sequence: 3,
      link: '#'
    });
  }
  componentDidMount() {
    console.log('mounted');
    this.props.dispatch( fetchStateGenre() );
  }
  stateClicked(e) {
    const element = e.target.tagName === 'P' ? e.target : e.target.parentNode;
    this.props.dispatch({ type: STATE_SELECTED, data: parseInt(element.getAttribute('data-state-id'), 10)});
  }
  genreClicked(e) {
    console.log(e.target);
  }
  render() {
    const {
      stateList,
      showGenre,
      selectedState
    } = this.props;

    console.log('the pros values ');
    console.log(this.props);
    // const { brandList, stateList, stateCityMapping, viewedState, viewedCity} = this.props;
    const genreComponent = ( showGenre ) ?
      (
        <TopPicksGenre label={ 'genre: ' + selectedState.state_name } data = { selectedState.values } stateId={ selectedState.state_id } genreClicked={ this.genreClicked.bind(this) } />
      )
      :
      (
       ''
      );
    return (
          <div className="top_picks_sku_wrapper">
            <BreadCrumb breadCrumbs={this.breadCrumbs} />
            <div>
              <TopPicks label="states" data= { stateList } stateClicked={this.stateClicked.bind(this) }/>
              { genreComponent }
            </div>
          </div>
        );
  }
}

const mapStateToProps = (state) => {
  return {...state.sku_top_picks_data, ...state.page_data};
};

TopPicksSkuWrapper.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  stateList: PropTypes.array.isRequired,
  selectedState: PropTypes.object.isRequired,
  showGenre: PropTypes.bool.isRequired
};

const decoratedConnectedComponent = commonDecorator(TopPicksSkuWrapper);
export default connect( mapStateToProps )(decoratedConnectedComponent);
