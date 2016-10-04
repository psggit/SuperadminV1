import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateCategoryText, resetCategory} from '../Action';

import { updateCategory, fetchGenre, INPUT_VALUE_CHANGED, insertCategory, fetchCategory, RESET, REQUEST_COMPLETED, MAKE_REQUEST } from './CategoryAction';

import formValidator from '../../Common/CommonFormValidator';

import commonDecorator from '../../Common/CommonDecorator';
import BreadCrumb from '../../Common/BreadCrumb';

class ManageCategory extends React.Component { // eslint-disable-line no-unused-vars
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
      title: 'Manage Category',
      sequence: 2,
      link: '/hadmin/category_management'
    });
    this.breadCrumbs.push({
      title: 'Create/Edit Category',
      sequence: 3,
      link: '#'
    });
  }
  componentDidMount() {
    /* If On edit operation */
    let CategoryId = this.props.params.Id;
    if (CategoryId) {
      CategoryId = parseInt(CategoryId, 10);
      Promise.all([
        this.props.dispatch( { type: MAKE_REQUEST } ),
        this.props.dispatch(fetchCategory(CategoryId)),
        this.props.dispatch(fetchGenre())
      ]).then( () => {
        this.props.dispatch( { type: REQUEST_COMPLETED } );
      });
    } else {
      this.props.dispatch(resetCategory());
      this.props.dispatch(fetchGenre());
    }
  }
  componentWillUnmount() {
    this.props.dispatch({ type: RESET });
  }
  createCategory() {
    /*
    // e.preventDefault();
    const CategoryName = document.querySelectorAll('[data-field-name="category_name"]')[0].value;
    const CategoryObj = {};
    CategoryObj.name = CategoryName;
    CategoryObj.created_at = new Date().toISOString();
    CategoryObj.updated_at = new Date().toISOString();
    */
    this.props.dispatch(insertCategory());
  }
  updateCategory() {
    this.props.dispatch(updateCategory());
  }
  /* Function to update the Fetched Category of this component so that input field is editable */
  inputOnChange(e) {
    e.target.value = e.target.value;
    this.props.dispatch(updateCategoryText(e.target.value));
  }
  render() {
    const styles = require('./CategoryManagement.scss');

    const { ongoingRequest,
      lastError,
      genreList,
      genreShort,
      name,
      categoryId,
      categoryStatus
    } = this.props;
    console.log(ongoingRequest);
    console.log(lastError);

    const genreHtml = genreList.map((genre, index) => {
      return (
          <option key={index} value={ genre.short_name }>{genre.genre_name}</option>
        );
    });

    const htmlContent = () => {
      if (categoryId) {
        return (
          <div className={styles.wrapper}>
            <BreadCrumb breadCrumbs={this.breadCrumbs} />
            <div className={styles.create_state_wrapper}>
              <p>
                Edit Category
              </p>
              <div className={styles.create_form}>
                <div className={styles.indiv_form}>
                  <label>Genre</label>
                  <select value = { genreShort } data-field-name="genreShort" data-field-type="text" >
                    <option>Select Genre Type</option>
                    { genreHtml }
                  </select>
                </div>
                <div className={styles.indiv_form}>
                	<label>Category Name</label>
                	<input type="text" value={ name } data-field-name="name" data-field-type="text" onChange={ () => { return true; } } />
                </div>
                <div className={styles.indiv_form}>
                	<label>Status</label>
                	<select value = { categoryStatus ? '1' : '0' } data-field-name="categoryStatus" data-field-type="boolean" onChange={ () => { return true; } }>
                		<option value="1">Active</option>
                		<option value="0">InActive</option>
                	</select>
                </div>
                <button className={styles.common_btn + ' ' + styles.create_btn } onClick={this.updateCategory.bind(this)}>Edit Category</button>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className={styles.wrapper}>
          <BreadCrumb breadCrumbs={this.breadCrumbs} />
          <div className={styles.create_state_wrapper}>
            <p>
              Create Category
            </p>
            <div className={styles.create_form}>
              <div className={styles.indiv_form}>
                <label>Genre</label>
                <select data-field-name="genreShort" data-field-type="text">
                  <option value="default">
                    Select Genre
                  </option>
                  { genreHtml }
                </select>
              </div>
              <div className={styles.indiv_form}>
              	<label>Category Name</label>
              	<input type="text" data-field-name="name" data-field-type="text" onChange={ () => { return true; } }/>
              </div>
              <div className={styles.indiv_form}>
              	<label>Status</label>
              	<select value = { categoryStatus ? '1' : '0' } data-field-name="categoryStatus" data-field-type="boolean" onChange={ () => { return true; } }>
              		<option value="1">Active</option>
              		<option value="0">InActive</option>
              	</select>
              </div>
              <button className={styles.common_btn + ' ' + styles.create_btn } onClick={this.createCategory.bind(this)} disabled={ongoingRequest ? true : false}>Create Category</button>
            </div>
          </div>
        </div>
      );
    }();
    // Check if there are any results, if yes show edit state page else show create state
    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    return (
        <div className={styles.container}>
          { htmlContent }
        </div>
      );
  }
}

ManageCategory.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  genreList: PropTypes.array.isRequired,
  genreShort: PropTypes.string.isRequired,
  categoryStatus: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  categoryId: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {...state.sku_data, ...state.category_data, ...state.page_data };
};

const decoratedOne = formValidator(ManageCategory, 'data-field-name', 'data-field-type', INPUT_VALUE_CHANGED);

const decoratedConnectedComponent = commonDecorator(decoratedOne);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
