import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CustomersList from '../CustomersList';


const BrandManagerProfile = () => { // eslint-disable-line no-unused-vars
  const styles = require('./BrandManagerProfile.scss');
  const car = [{
    id: '1',
    name: 'Fiat',
    email: 'sarath@34cross.in',
    mobile: '+91 9600000000',
    company: '34cross',
    created: '9-11-2015',
    updated: '1-2-3010'
  }];
  return (
    <div className={styles.container}>
      <div className={styles.profile_wrapper}>
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
          <Link to={'/hadmin/brands_offers_and_promos/create_brand_manager'}>
            <button className={styles.common_btn}>Create BM</button>
          </Link>
        </div>
        <CustomersList data={car}/>
      </div>
    </div>);
};

export default connect()(BrandManagerProfile);
