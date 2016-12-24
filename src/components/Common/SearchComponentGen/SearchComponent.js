import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

import {
  ADD_DELETE_FILTER
} from './FilterState';

class SearchComponent extends Component {
  filterChange(e) {
    const parentNode = e.target.parentNode;
    const filterValue = parentNode.querySelectorAll('[data-field-name="value"]')[0].value;
    const filterOperator = parentNode.querySelectorAll('select[data-field-name=operator]')[0].selectedOptions[0].value;
    const filterField = parentNode.querySelectorAll('select[data-field-name=field]')[0].selectedOptions[0].value;

    if ( filterValue.length && filterOperator !== 'Select' && filterField !== 'Select' ) {
      try {
        const filterObj = {
          [filterField]: {
            [filterOperator]: filterValue
          }
        };
        parentNode.querySelectorAll('[data-field-name="value"]')[0].value = '';
        parentNode.querySelectorAll('select[data-field-name=operator]')[0].selectedOptions[0].value = '';
        parentNode.querySelectorAll('select[data-field-name=field]')[0].selectedOptions[0].value = '';
        this.props.dispatch({ type: ADD_DELETE_FILTER, data: { 'filter': filterField, data: filterObj } });
      } catch (err) {
        console.log(err);
        alert('invalid Val');
      }
    }
  }
  render() {
    const styles = require('./SearchComponent.scss');
    const fields = ['name', 'id', 'email'];
    const operator = ['$eq'];
    const operatorMap = {};
    operatorMap.$eq = 'Equal';

    const selectHtml = fields.map( ( field, index ) => {
      return (
        <option key={ index } value={ field }> { field.toUpperCase() } </option>
      );
    });

    const operatorHtml = operator.map( ( op, index ) => {
      return (
        <option key={ index } value={ op } > { operatorMap[op].toUpperCase() } </option>
      );
    });

    return (
      <div className={styles.search_wrapper + ' ' + styles.wd_100}>
      	<p>Search</p>
      	<div className={styles.search_form + ' ' + styles.wd_100} >
          <select data-field-name="field">
            <option value=""> Select Field </option>
            { selectHtml }
          </select>
          <select data-field-name="operator">
            <option value=""> Select Operator </option>
            { operatorHtml }
          </select>
      		<input type="text" placeholder="Contains" data-field-name="value" onBlur={ this.filterChange.bind(this) } />
          { this.props.children }
      	</div>
      </div>
    );
  }
}

SearchComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  currFilter: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => {
  return { currFilter: { ...state.gen_filter_data }};
};

export default connect(mapStateToProps)(SearchComponent);
