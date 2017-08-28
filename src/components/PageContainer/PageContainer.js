import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Endpoints, {globalCookiePolicy} from '../../Endpoints';
import requestAction from '../Common/Actions/requestAction';

const PageContainer = ({location, name, role, children, dispatch}) => { // eslint-disable-line no-unused-vars
  const logout = () => {
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': role},
      credentials: globalCookiePolicy
    };
    const url = Endpoints.authUrl + '/user/logout';
    const options = {
      ...genOptions,
    };
    dispatch( requestAction( url, options ) );
  };
  const UserManagement = ({styles, lastPathname}) => {
    if ( role === 'admin') {
      return (
        <ul>
        	<li><input type="checkbox" id="cb0"/><label htmlFor="cb0">USER MANAGEMENT</label>
            <ul>
              <li title = "Create New Users" className={styles.sidebar_list}><label>
                <Link to={'/hadmin/user/create'} className={ lastPathname === 'kycfunctions' ? styles.active : '' }> Create User </Link>
              </label></li>
              <li title = "Edit Existing Users" className={styles.sidebar_list}><label>
                <Link to={'/hadmin/users/list'} className={ lastPathname === 'profiles' ? styles.active : '' }>Mangage User</Link>
              </label></li>
            </ul>
          </li>
        </ul>
      );
    }
    return ( <ul></ul> );
  };


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
            Logged in: <b>{name} ({role})</b> <br><span onClick={logout}> Logout </span> </br>
          </div>
          <hr/>
          <br/><br/>
            <UserManagement role = {role} styles={styles} lastPathname={lastPathname}/>
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
              <li className={styles.sidebar_list}><label>
                <Link to={'/hadmin/consumer_transactions/devices'} className={ lastPathname === 'devices' ? styles.active : '' }>
                    Customer Devices
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
                <li className={styles.sidebar_list}>
                  <label>
                    <Link to={'/hadmin/convenience_fee/create'}>Create Convenience Fees</Link>
                  </label>
                </li>
                <li className={styles.sidebar_list}>
                  <label>
                    <Link to={'/hadmin/convenience_fee/list'}>Manage Convenience Fees</Link>
                  </label>
                </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li><input type="checkbox" id="cb4"/><label htmlFor="cb4">BRANDS OFFERS AND PROMOS</label>
              <ul>
              <li className={styles.sidebar_list}><label>
                <Link to={'/hadmin/brands_offers_and_promos/promos'} className={ lastPathname === 'profiles' ? styles.active : '' }>Promos</Link>
              </label></li>
              <li className={styles.sidebar_list}><label>
                <Link to={'/hadmin/brands_offers_and_promos/ads'} className={ lastPathname === 'consumer_transactions' ? styles.active : '' }>
                    Ads
                </Link>
              </label></li>
              <li className={styles.sidebar_list}><label>
                <Link to={'/hadmin/ad_listing'} className={ lastPathname === 'consumer_transactions' ? styles.active : '' }>
                    Ad Listing
                </Link>
              </label></li>
              <li className={styles.sidebar_list}><label>
                <Link to={'/hadmin/brand_listing'} className={ lastPathname === 'consumer_transactions' ? styles.active : '' }>
                    Brand Listing
                </Link>
              </label></li>
              <li className={styles.sidebar_list}><label>
                <Link to={'/hadmin/brands_offers_and_promos/welcome_drinks_view'} className={ lastPathname === 'consumer_transactions' ? styles.active : '' }>
                    Welcome Drinks
                </Link>
              </label></li>
              </ul>
            </li>
          </ul>

          {/*
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
            <li><input type="checkbox" id="cb5"/><label htmlFor="cb5">RETAILER MANAGEMENT</label>
              <ul>
              <li className={styles.sidebar_list}><label>
                  <Link to={'/hadmin/retailer_management/profile_and_kyc'} > Profile & KYC </Link>
              </label></li>
              <li className={styles.sidebar_list}><label>
                  <Link to={'/hadmin/retailer_management/transactionlanding'} > Retailer Transactions </Link>
              </label></li>
              {/*
              <li className={styles.sidebar_list}><label>
                  <Link to={'/hadmin/consumer/profiles'} className={ lastPathname === 'profiles' ? styles.active : '' }> Transactions </Link>
              </label></li>
              */}
              </ul>
            </li>
          </ul>

          {/* Bar Management */}
          <ul>
            <li>
              <input type="checkbox" id="cb6"/><label htmlFor="cb6">BAR MANAGEMENT</label>
              <ul>
                <li className={styles.sidebar_list}>
                  <label>
                    <Link to={'/hadmin/bar_management/bar_profile_and_kyc'} > Profile & KYC </Link>
                  </label>
                </li>
                <li className={styles.sidebar_list}>
                  <label>
                    <Link to={'/hadmin/bar_management/bar_sku_landing'} > Add Bar SKUs</Link>
                  </label>
                </li>
                <li className={styles.sidebar_list}>
                  <label>
                    <Link to={'/hadmin/bar_management/all_bar_skus'} > Manage Bar Skus </Link>
                  </label>
                </li>
                <li className={styles.sidebar_list}><label>
                    <Link to={'/hadmin/bar_management/bartransactionlanding'} > Bar Transactions </Link>
                </label></li>
              </ul>
            </li>
          </ul>
          {/* End of it */}
          {/* The Brand MANAGER UI*/}
          <ul>
            <li><input type="checkbox" id="cb7"/><label htmlFor="cb7">BRAND MANAGER</label>
              <ul>
              <li className={styles.sidebar_list}><label>
                <Link to={'/hadmin/brands_offers_and_promos/brand_managers_list'} className={ lastPathname === 'kycfunctions' ? styles.active : '' }>Brand Manager Profile</Link>
              </label></li>
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
          <ul>
            <li><input type="checkbox" id="cb8"/><label htmlFor="cb8">WHATS NEW</label>
              <ul>
              <li className={styles.sidebar_list}>
                <label>
                  <Link to={'/hadmin/whats_new'} className={ lastPathname === 'whats_new' ? styles.active : '' }>Manage Articles</Link>
                </label>
              </li>
              <li className={styles.sidebar_list}>
                <label>
                  <Link to={'/hadmin/whats_new/create_article'} className={ lastPathname === 'create_article' ? styles.active : '' }>Create Article</Link>
                </label>
              </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li><input type="checkbox" id="cb9"/><label htmlFor="cb9">REPORTS</label>
              <ul>
              <li className={styles.sidebar_list}>
                <label>
                  <Link to={'/hadmin/reports'} className={ lastPathname === 'reports' ? styles.active : '' }>Reports</Link>
                </label>
              </li>
              <li className={styles.sidebar_list}>
                <label>
                  <Link to={'/hadmin/bar_report_upload'} className={ lastPathname === 'upload1' ? styles.active : '' }>Upload Bar Reports</Link>
                </label>
              </li>
              <li className={styles.sidebar_list}>
                <label>
                  <Link to={'/hadmin/retailer_report_upload'} className={ lastPathname === 'upload2' ? styles.active : '' }>Upload Retailer Reports</Link>
                </label>
              </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li><input type="checkbox" id="cb10"/><label htmlFor="cb10">DELIVERY MANAGEMENT</label>
              <ul>
                <li className={styles.sidebar_list}>
                  <label>
                    <Link to={'/hadmin/delivery_persons_list'}>Add Delivery Person</Link>
                  </label>
                </li>
                <li className={styles.sidebar_list}>
                  <label>
                    <Link to={'/hadmin/configure_delivery_constraints'}>Configure Constraints</Link>
                  </label>
                </li>
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
    location: state.routing.location,
    role: state.loginState.highestRole,
    name: state.loginState.credentials.username
  };
};

export default connect(mapStateToProps)(PageContainer);
