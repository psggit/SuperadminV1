import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getAllCompanyData, getCompanyData} from '../Action';

import CompaniesList from './CompaniesList';

import commonDecorator from '../../Common/CommonDecorator';
import BreadCrumb from '../../Common/BreadCrumb';

import PaginationWrapper from '../../Common/PaginationWrapper.js';

class CompaniesManagement extends React.Component { // eslint-disable-line no-unused-vars
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
      title: 'Manage Company',
      sequence: 2,
      link: '#'
    });
  }
  // Hook used by pagination wrapper to fetch the initial data
  fetchInitialData(page, limit) {
    this.props.dispatch(getAllCompanyData(page, limit));
  }
  triggerPageChange(clickedPage, limit) {
    this.props.dispatch(getCompanyData(clickedPage, limit));
  }
  render() {
    const styles = require('./CompaniesManagement.scss');
    const { ongoingRequest, lastError, lastSuccess } = this.props;
    console.log(lastError);
    console.log(ongoingRequest);
    console.log(lastSuccess);

    return (
      <div className={styles.container}>

        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className={styles.companies_wrapper}>
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
            <Link to={'/hadmin/companies_management/create'}>
              <button className={styles.common_btn}>Create Company</button>
            </Link>
          </div>
          <CompaniesList data={lastSuccess}/>
          <PaginationWrapper
            {...this.props }
            fetchInitialData = { this.fetchInitialData.bind(this) }
            limit = "10"
            triggerPageChange={ this.triggerPageChange.bind(this) }
            showMax="5"
            parentUrl="/hadmin/companies_management"
          />
        </div>
      </div>);
  }
}

CompaniesManagement.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {...state.sku_data };
};

const decoratedConnectedComponent = commonDecorator(CompaniesManagement);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
