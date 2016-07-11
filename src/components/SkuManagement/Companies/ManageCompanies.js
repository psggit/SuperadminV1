import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateCompany, fetchCity, fetchState, INPUT_VALUE_CHANGED, insertCompany, fetchCompany, RESET} from './CompanyAction';

import formValidator from '../../Common/CommonFormValidator';

import commonDecorator from '../../Common/CommonDecorator';
import BreadCrumb from '../../Common/BreadCrumb';

class ManageCompanies extends React.Component { // eslint-disable-line no-unused-vars
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
      link: '/hadmin/companies_management'
    });
    this.breadCrumbs.push({
      title: 'Create/Edit Company',
      sequence: 3,
      link: '#'
    });
  }
  componentDidMount() {
    /* If On edit operation */
    let CompanyId = this.props.params.Id;
    if (CompanyId) {
      CompanyId = parseInt(CompanyId, 10);
      this.props.dispatch(fetchCompany(CompanyId));
    } else {
      this.props.dispatch({ type: RESET });
    }
    this.props.dispatch(fetchCity());
    this.props.dispatch(fetchState());
  }
  createCompany() {
    /*
    // e.preventDefault();
    const CategoryName = document.querySelectorAll('[data-field-name="category_name"]')[0].value;
    const CategoryObj = {};
    CategoryObj.name = CategoryName;
    CategoryObj.created_at = new Date().toISOString();
    CategoryObj.updated_at = new Date().toISOString();
    */
    this.props.dispatch(insertCompany());
  }
  updateCompany() {
    this.props.dispatch(updateCompany());
  }
  /* Function to update the Fetched Category of this component so that input field is editable */

  render() {
    const styles = require('./ManageCompanies.scss');
    const { cityList,
      stateList,
      name,
      address,
      pinCode,
      cityId,
      stateId,
      companyId
    } = this.props;

    const cityHtml = cityList.map((city, index) => {
      return (
          <option key={index} value={city.id}>{city.name }</option>
        );
    });

    const stateHtml = stateList.map((state, index) => {
      return (
          <option key={index} value={state.id}>{state.state_name}</option>
        );
    });
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
            <div className={styles.create_company_container}>
              <div className={styles.heading + ' ' + styles.wd_100}>Create Company</div>
                <ul>
                  <li>
                    <label>Company Name</label>
                    <input data-field-name="name" data-field-type="text" data-field-name="name" data-field-type="text" value={ name} />
                  </li>
                  <li>
                    <label>Address</label>
                    <textarea rows="4" cols="10" data-field-name="address" data-field-type="text" value={ address }></textarea>
                  </li>
                  <li>
                    <label>City</label>
                    <select data-field-name="cityId" data-field-type="int" value={ cityId }>
                      <option > Select City </option>
                      { cityHtml }
                    </select>
                  </li>
                  <li>
                    <label>State</label>
                    <select data-field-name="stateId" data-field-type="int" value={ stateId }>
                      <option > Select State </option>
                      { stateHtml }
                    </select>
                  </li>
                  <li>
                    <label>Pincode</label>
                    <input type="number" data-field-name="pinCode" data-field-type="int" value={ pinCode }/>
                  </li>
                  {/*
                  <li>
                    <label>Status</label>
                    <select data-field-name="">
                      <option>Select</option>
                    </select>
                  </li>
                  */}
                </ul>
                <center>
                  <button className={styles.common_btn} onClick={ companyId ? this.updateCompany.bind(this) : this.createCompany.bind(this) }>{(companyId) ? 'Update Company' : 'Create Company'}</button>
                </center>
            </div>
          </div>
        </div>
      </div>);
  }
}

ManageCompanies.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  cityId: PropTypes.number.isRequired,
  stateId: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  pinCode: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  companyId: PropTypes.number.isRequired,
  cityList: PropTypes.array.isRequired,
  stateList: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {...state.sku_data, ...state.company_data};
};

const decoratedOne = formValidator(ManageCompanies, 'data-field-name', 'data-field-type', INPUT_VALUE_CHANGED);

const decoratedConnectedComponent = commonDecorator(decoratedOne);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
