import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { routeActions } from 'redux-simple-router';

const PageContainer = ({location, children, dispatch}) => { // eslint-disable-line no-unused-vars
  const styles = require('./PageContainer.scss');

  let lastPathname = location.pathname.split('/');
  lastPathname = lastPathname[(lastPathname.length - 1)];

  // const highlightfirstParent = (lastPathname === 'kycfunctions' || lastPathname === 'profiles' || lastPathname === 'consumer_transactions') ? 'customer-manager' : '';
  // const highlightsecParent = (lastPathname === 'kycfunctions' || lastPathname === 'profiles' || lastPathname === 'consumer_transactions') ? 'user-manager' : '';
  // const highlightthirdParent = (lastPathname === 'kycfunctions' || lastPathname === 'profiles' || lastPathname === 'consumer_transactions') ? 'customer-manager' : '';
  // const highlightfourthParent = (lastPathname === 'kycfunctions' || lastPathname === 'profiles' || lastPathname === 'consumer_transactions') ? 'customer-manager' : '';
  // const highlightfifthParent = (lastPathname === 'kycfunctions' || lastPathname === 'profiles' || lastPathname === 'consumer_transactions') ? 'customer-manager' : '';
 // <label htmlFor="cb2" className={ highlightsecParent === 'user-manager' ? styles.active : ''}>
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container + ' container-fluid'}>
      <div className={styles.flexRow}>
        <div className={styles.sidebar + ' col-md-3'}>
          <div className={styles.account}>
            Logged in: <b>admin</b>
          </div>
          <hr/>
          <br/><br/>
          <button className={styles.addBtn + ' btn btn-primary'} onClick={(e) => {
            e.preventDefault();
            dispatch(routeActions.push('/hadmin/upload_file'));
          }}>Upload File</button>
          <br/><br/>
          <ul>
          	<li><input type="checkbox" id="cb1"/><label htmlFor="cb1">CUSTOMER MANAGEMENT</label>
          		<ul>
              <li className={styles.sidebar_list}><label>
                <Link to={'/hadmin/consumer/kycfunctions'} className={ lastPathname === 'kycfunctions' ? styles.active : '' }> KYC Functions </Link>
              </label></li>
              <li className={styles.sidebar_list}><label>
                <Link to={'/hadmin/consumer/profiles'} className={ lastPathname === 'profiles' ? styles.active : '' }>Profile</Link>
              </label></li>
              <li className={styles.sidebar_list}><label>
                <Link to={'/hadmin/consumer_transactions'} className={ lastPathname === 'consumer_transactions' ? styles.active : '' }>
                    Customer Transactions
                </Link>
              </label></li>
              {/*
              <li className={styles.sidebar_list}><label>
                <Link to={'/hadmin/customer_support'} className={ lastPathname === 'customer_support' ? styles.active : '' }>
                    Customer Support
                </Link>
              </label></li>
              */}
              </ul>
            </li>
          </ul>

          {/*
          <ul>
          	<li><input type="checkbox" id="cb2"/><label htmlFor="cb2">USER MANAGEMENT</label>
          		<ul>
              <li className={styles.sidebar_list}><label>
                <Link to={'/consumer/kycfunctions'} className={ lastPathname === 'kycfunctions' ? styles.active : '' }> KYC Functions </Link>
              </label></li>
              <li className={styles.sidebar_list}><label>
                <Link to={'/consumer/profiles'} className={ lastPathname === 'profiles' ? styles.active : '' }>Profile</Link>
              </label></li>
              <li className={styles.sidebar_list}><label>
                <a href="#"> Customer Transactions</a>
              </label></li>
              <li className={styles.sidebar_list}><label>
                <Link to={'/customer_support/freshdesk_ticketlist'} className={ lastPathname === 'freshdesk_ticketlist' ? styles.active : '' }>Support</Link>
              </label></li>
              </ul>
            </li>
          </ul>
          */}

          <ul>
            <li><input type="checkbox" id="cb3"/><label htmlFor="cb3">SKU MANAGEMENT</label>
              <ul>
                <li className={styles.sidebar_list}>
                  <label>
                    <Link to={'/hadmin/state_management'}>Manage States</Link>
                  </label>
                </li>
                <li className={styles.sidebar_list}>
                  <label>
                    <Link to={'/hadmin/brand_management'}>Manage Brands</Link>
                  </label>
                </li>
                <li className={styles.sidebar_list}>
                  <label>
                    <Link to={'/hadmin/category_management'}>Manage Categories</Link>
                  </label>
                </li>
                <li className={styles.sidebar_list}>
                  <label>
                    <Link to={'/hadmin/genre_management'}>Manage Genres</Link>
                  </label>
                </li>
                <li className={styles.sidebar_list}>
                  <label>
                    <Link to={'/hadmin/companies_management'}>Manage Companies</Link>
                  </label>
                </li>
                <li className={styles.sidebar_list}>
                  <label>
                    <Link to={'/hadmin/skus'}>Manage SKUs</Link>
                  </label>
                </li>
              </ul>
            </li>
          </ul>
          {/*
          <ul>
            <li><input type="checkbox" id="cb4"/><label htmlFor="cb4">BRANDS OFFERS AND PROMOS</label>
              <ul>
              <li className={styles.sidebar_list}><label>
                <Link to={'/hadmin/brands_offers_and_promos/brand_managers_list'} className={ lastPathname === 'kycfunctions' ? styles.active : '' }>Brand Manager Profile</Link>
              </label></li>
              <li className={styles.sidebar_list}><label>
                <Link to={'/hadmin/brands_offers_and_promos/promos'} className={ lastPathname === 'profiles' ? styles.active : '' }>Promos</Link>
              </label></li>
              <li className={styles.sidebar_list}><label>
                <Link to={'/hadmin/brands_offers_and_promos/ads'} className={ lastPathname === 'consumer_transactions' ? styles.active : '' }>
                    Ads
                </Link>
              </label></li>
              </ul>
            </li>
          </ul>

          <ul>
            <li><input type="checkbox" id="cb5"/><label htmlFor="cb5">HOMEPAGE MANAGEMENT</label>
              <ul>
              <li className={styles.sidebar_list}><label>
                <Link to={'/hadmin/'} className={ lastPathname === 'kycfunctions' ? styles.active : '' }>Top Picks</Link>
              </label></li>
              <li className={styles.sidebar_list}><label>
                <Link to={'/hadmin/homepage_management/ads'} className={ lastPathname === 'profiles' ? styles.active : '' }>Ad Slots</Link>
              </label></li>
              </ul>
            </li>
          </ul>
          */}

          <ul>
            <li><input type="checkbox" id="cb4"/><label htmlFor="cb4">RETAILER MANAGEMENT</label>
              <ul>
              <li className={styles.sidebar_list}><label>
                  <Link to={'/hadmin/retailer_management/profile_and_kyc'} className={ lastPathname === 'profiles' ? styles.active : '' }> Profile & KYC </Link>
              </label></li>
              <li className={styles.sidebar_list}><label>
                  <Link to={'/hadmin/consumer/profiles'} className={ lastPathname === 'profiles' ? styles.active : '' }> Transactions </Link>
              </label></li>
              </ul>
            </li>
          </ul>
          {/* The Brand MANAGER UI*/}
          <ul>
            <li><input type="checkbox" id="cb5"/><label htmlFor="cb5">BRAND MANAGER</label>
              <ul>
              <li className={styles.sidebar_list}>
                <label>
                  <Link to={'/hadmin/brands_offers_and_promos/promos'} className={ lastPathname === 'promos' ? styles.active : '' }> Promos </Link>
                </label>
              </li>
              {/*
                <li className={styles.sidebar_list}>
                  <label>
                    <Link to={'/hadmin/consumer/promos'} className={ lastPathname === 'profiles' ? styles.active : '' }>Brand 2</Link>
                  </label>
                </li>
              */}
              </ul>
            </li>
          </ul>
        </div>
        <div className={styles.main + ' col-md-9'}>
          <div className={styles.right_wrapper}>
            {children}
          </div>
        </div>
      </div>
    </div>);
};

const mapStateToProps = (state) => {
  return {
    location: state.routing.location
  };
};

export default connect(mapStateToProps)(PageContainer);
