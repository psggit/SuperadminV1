import React, { PropTypes, Component } from 'react';

import PaginationContainer from '../CustomerTransaction/components/Recharge/Pagination';

class PaginationWrapper extends Component {
  componentDidMount() {
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;
    this.props.fetchInitialData(page, parseInt(this.props.limit, 10));
  }
  onClickHandle(e) {
    // e.preventDefault();
    const currentPage = parseInt(e.target.href.split('?p=')[1], 10);
    if (currentPage) {
      this.props.triggerPageChange(currentPage, parseInt(this.props.limit, 10));
    }
  }
  render() {
    /* Constants for the Pagination Component */
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;
    const count = this.props.count;

    return (
      <PaginationContainer limit={ this.props.limit } showMax={ this.props.showMax } onClickHandler={this.onClickHandle.bind(this)} currentPage={page} count={count} parentUrl={ this.props.parentUrl } />
    );
  }
}

PaginationWrapper.propTypes = {
  count: PropTypes.number.isRequired,
  parentUrl: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  fetchInitialData: PropTypes.func.isRequired,
  triggerPageChange: PropTypes.func.isRequired,
  limit: PropTypes.string.isRequired,
  showMax: PropTypes.string.isRequired
};

export default PaginationWrapper;
