import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { insertCategory, fetchCategory, updateCategory, updateCategoryText, resetCategory} from '../Action';

class ManageCategory extends React.Component { // eslint-disable-line no-unused-vars
  componentDidMount() {
    /* If On edit operation */
    let CategoryId = this.props.params.Id;
    if (CategoryId) {
      CategoryId = parseInt(CategoryId, 10);
      this.props.dispatch(fetchCategory(CategoryId));
    } else {
      this.props.dispatch(resetCategory());
    }
  }
  onClickHandle() {
    // e.preventDefault();
    const CategoryName = document.querySelectorAll('[data-field-name="category_name"]')[0].value;
    const CategoryObj = {};
    CategoryObj.name = CategoryName;
    CategoryObj.created_at = new Date().toISOString();
    CategoryObj.updated_at = new Date().toISOString();
    this.props.dispatch(insertCategory(CategoryObj));
  }
  onClickEdit(e) {
    const CategoryName = document.querySelectorAll('[data-field-name="category_name"]')[0].value;
    const CategoryId = parseInt(e.target.getAttribute('data-category-id'), 10);
    const CategoryObj = {};
    CategoryObj.values = {};
    CategoryObj.values.name = CategoryName;
    CategoryObj.returning = ['id'];
    this.props.dispatch(updateCategory(CategoryObj, CategoryId));
  }
  /* Function to update the Fetched Category of this component so that input field is editable */
  inputOnChange(e) {
    e.target.value = e.target.value;
    this.props.dispatch(updateCategoryText(e.target.value));
  }
  render() {
    const styles = require('./CategoryManagement.scss');

    const { ongoingRequest, lastError, lastSuccess } = this.props;
    console.log(ongoingRequest);
    console.log(lastError);

    const htmlContent = () => {
      if (lastSuccess.length > 0) {
        return (
          <div className={styles.wrapper}>
            <div className={styles.head_container}>
            	SKU Management / Edit Category
            </div>
            <div className={styles.create_state_wrapper}>
              <p>
                Edit Category
              </p>
              <div className={styles.create_form}>
                <div className={styles.indiv_form}>
                	<label>Category Name</label>
                	<input type="text" data-field-name="category_name" onChange={this.inputOnChange.bind(this)} value={lastSuccess[0].name} />
                </div>
                {/*
                <div className={styles.indiv_form}>
                	<label>Status</label>
                	<select>
                		<option>Pending</option>
                	</select>
                </div>
                */}
                <button className={styles.common_btn + ' ' + styles.create_btn } data-category-id={lastSuccess[0].id} onClick={this.onClickEdit.bind(this)}>Edit Category</button>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className={styles.wrapper}>
          <div className={styles.head_container}>
          	SKU Management / Create Category
          </div>
          <div className={styles.create_state_wrapper}>
            <p>
              Create Category
            </p>
            <div className={styles.create_form}>
              <div className={styles.indiv_form}>
              	<label>Category Name</label>
              	<input type="text" data-field-name="category_name" />
              </div>
              {/*
              <div className={styles.indiv_form}>
              	<label>Status</label>
              	<select>
              		<option>Pending</option>
              	</select>
              </div>
              */}
              <button className={styles.common_btn + ' ' + styles.create_btn } onClick={this.onClickHandle.bind(this)} disabled={ongoingRequest ? true : false}>Create Category</button>
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
  lastSuccess: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {...state.sku_data};
};

export default connect(mapStateToProps)(ManageCategory);
