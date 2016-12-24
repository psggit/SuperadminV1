import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { RESET,
  getAllConsumerData,
  getConsumerData
} from './ViewConsumerAction';

import PaginationWrapper from '../../../Common/PaginationWrapper.js';

import SearchWrapper from './SearchWrapper';

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

class ViewConsumer extends Component {
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Consumer Management',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Profile',
      sequence: 2,
      link: '#'
    });
  }
  componentWillUnmount() {
    this.props.dispatch( { type: RESET } );
  }
  // Hook used by pagination wrapper to fetch the initial data
  fetchInitialData(page, limit) {
    this.props.dispatch(getAllConsumerData(page, limit));
  }
  triggerPageChange(clickedPage, limit) {
    this.props.dispatch(getConsumerData(clickedPage, limit));
  }
  render() {
    const { lastSuccess } = this.props;
    const styles = require('./ViewConsumer.scss');
    return (
          <div className={styles.container}>
            <BreadCrumb breadCrumbs={this.breadCrumbs} />

            {/*
            <div className={styles.create_layout + ' ' + styles.wd_100}>
              <Link to={'/hadmin/brand_management/create'}>
                <button className={styles.common_btn}>Create Brand</button>
              </Link>
            </div>
            */}
            <SearchWrapper data={lastSuccess}/>
            <PaginationWrapper
              {...this.props }
              fetchInitialData = { this.fetchInitialData.bind(this) }
              limit = "10"
              triggerPageChange={ this.triggerPageChange.bind(this) }
              showMax="5"
              parentUrl="/hadmin/consumer/profiles"
            />
          </div>
        );
  }
}

ViewConsumer.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {...state.page_data};
};

const decoratedConnectedComponent = commonDecorator(ViewConsumer);// connect(mapStateToProps)(CommonDecorator);

export default connect(mapStateToProps)(decoratedConnectedComponent);
