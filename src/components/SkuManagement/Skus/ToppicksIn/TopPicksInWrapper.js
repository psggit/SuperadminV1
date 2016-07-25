import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllTopPicksData
  , getTopPicksData
  , getStateGenreData
  , deleteTopPick
} from './TopPicksInAction';

import SearchWrapper from './SearchWrapper';

import PaginationWrapper from '../../../Common/PaginationWrapper.js';

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

class TopPicksInWrapper extends React.Component { // eslint-disable-line no-unused-vars
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
    let { genreId, stateId } = props.params;
    genreId = parseInt(genreId, 10);
    stateId = parseInt(stateId, 10);
    this.genreId = genreId;
    this.stateId = stateId;
  }
  // Hook used by pagination wrapper to fetch the initial data
  fetchInitialData(page, limit) {
    this.props.dispatch(getAllTopPicksData(page, limit, this.genreId, this.stateId));
    this.props.dispatch(getStateGenreData(this.genreId, this.stateId));
  }
  triggerPageChange(clickedPage, limit) {
    this.props.dispatch(getTopPicksData(clickedPage, limit, this.genreId, this.stateId));
  }
  get myName() {
    return 'Karthik Venkateswaran';
  }
  handleDelete(e) {
    const skuId = parseInt(e.target.getAttribute('data-sku-id'), 10);
    const brandId = parseInt(e.target.getAttribute('data-brand-id'), 10);

    this.props.dispatch(deleteTopPick(skuId, brandId));
  }
  render() {
    const styles = require('../../Brand/BrandManagement.scss');
    const { lastSuccess, state, genre, stateId, genreId} = this.props;

    const createUrl = '/hadmin/skus/top_picks/' + stateId + '/' + genreId + '/add_top_picks';

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
    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    return (
        <div className={styles.container}>
          <BreadCrumb breadCrumbs={updatedBreadCrumbs} />
         	<div className={styles.search_wrapper + ' ' + styles.wd_100}>
         		<p>Search</p>
         		<div className={styles.search_form + ' ' + styles.wd_100}>
         			<input type="text" placeholder="Mobile Number" />
         			<input type="text" placeholder="Contains" />
         			<input type="number" />
         			<button className={styles.common_btn}>Search</button>
         		</div>
         	</div>
          <div className={styles.create_layout + ' ' + styles.wd_100}>
            <Link to={ createUrl }>
              <button className={styles.common_btn}>Add Top Picks</button>
            </Link>
          </div>
          <SearchWrapper data={lastSuccess} state={ state } genre={ genre} handleDelete = { this.handleDelete.bind(this) } />
          <PaginationWrapper
            {...this.props }
            fetchInitialData = { this.fetchInitialData.bind(this) }
            limit = "10"
            triggerPageChange={ this.triggerPageChange.bind(this) }
            showMax="5"
            parentUrl="/hadmin/skus/top_picks"
          />
        </div>
      );
  }
}

TopPicksInWrapper.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  state: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  stateId: PropTypes.number.isRequired,
  genreId: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return { ...state.page_data, ...state.sku_top_picks_state_genre_data };
};

const decoratedConnectedComponent = commonDecorator(TopPicksInWrapper);// connect(mapStateToProps)(CommonDecorator);

export default connect(mapStateToProps)(decoratedConnectedComponent);
