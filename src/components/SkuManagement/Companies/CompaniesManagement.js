import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CompaniesList from './CompaniesList';
import PaginationContainer from '../../CustomerTransaction/components/Recharge/Pagination';


const CompaniesManagement = () => { // eslint-disable-line no-unused-vars
  const styles = require('./CompaniesManagement.scss');
  const car = [{
    id: '1',
    name: 'sasa',
    status: 'Active',
    created: '9-11-2015',
    updated: '1-2-3010'
  }];
  return (
    <div className={styles.container}>
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
        <CompaniesList data={car}/>
        <PaginationContainer limit="10" showMax="5" parentUrl="/hadmin/companies_management" />
      </div>
    </div>);
};

export default connect()(CompaniesManagement);
