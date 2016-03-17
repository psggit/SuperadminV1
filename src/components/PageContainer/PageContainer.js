import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { routeActions } from 'redux-simple-router';

const PageContainer = ({schema, location, children, dispatch}) => { // eslint-disable-line no-unused-vars
  const styles = require('./PageContainer.scss');
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
            dispatch(routeActions.push('/upload_file'));
          }}>Upload File</button>
          <br/><br/>
          <ul>
          	<li><input type="checkbox" id="cb1"/><label htmlFor="cb1">CUSTOMER MANAGEMENT</label>
          		<ul>
              <li className={styles.sidebar_list}><label>
                <Link to={'/consumer/kycfunctions'}> KYC Functions </Link>
              </label></li>
              <li className={styles.sidebar_list}><label>
                <Link to={'/consumer/profiles'}>Profile</Link>
              </label></li>
              <li className={styles.sidebar_list}><label>
                <Link to={'/consumer_transactions'}>
                    Customer Transactions
                </Link>
              </label></li>
              <li className={styles.sidebar_list}><label>
                <a href="#"> Support </a>
              </label></li>
              </ul>
            </li>
          </ul>

          <ul>
          	<li><input type="checkbox" id="cb2"/><label htmlFor="cb2">USER MANAGEMENT</label>
          		<ul>
              <li className={styles.sidebar_list}><label>
                <Link to={'/consumer/kycfunctions'}> KYC Functions </Link>
              </label></li>
              <li className={styles.sidebar_list}><label>
                <Link to={'/consumer/profiles'}>Profile</Link>
              </label></li>
              <li className={styles.sidebar_list}><label>
                <a href="#"> Customer Transactions</a>
              </label></li>
              <li className={styles.sidebar_list}><label>
                <a href="#"> Support </a>
              </label></li>
              </ul>
            </li>
          </ul>

          <ul>
            <li><input type="checkbox" id="cb3"/><label htmlFor="cb3">SKU MANAGEMENT</label>
              <ul>
              <li className={styles.sidebar_list}><label>
                <Link to={'/consumer/kycfunctions'}> States </Link>
              </label></li>
              <li className={styles.sidebar_list}><label>
                <Link to={'/consumer/profiles'}>SKU</Link>
              </label></li>
              </ul>
            </li>
          </ul>
          <ul>
            <li><input type="checkbox" id="cb4"/><label htmlFor="cb4">RETAILER MANAGEMENT</label>
              <ul>
              <li className={styles.sidebar_list}><label>
                <Link to={'/consumer/kycfunctions'}> Retailer 1 </Link>
              </label></li>
              <li className={styles.sidebar_list}><label>
                <Link to={'/consumer/profiles'}>Retailer 2</Link>
              </label></li>
              </ul>
            </li>
          </ul>

          <ul>
            <li><input type="checkbox" id="cb5"/><label htmlFor="cb5">BRAND MANAGER</label>
              <ul>
              <li className={styles.sidebar_list}><label>
                <Link to={'/consumer/kycfunctions'}> Brand 1 </Link>
              </label></li>
              <li className={styles.sidebar_list}><label>
                <Link to={'/consumer/profiles'}>Brand 2</Link>
              </label></li>
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
    schema: state.tables.allSchemas,
    location: state.routing.location
  };
};

export default connect(mapStateToProps)(PageContainer);
