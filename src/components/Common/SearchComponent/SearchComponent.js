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
      const dateString = new Date(filterValue);
      try {
        const filterObj = {
          [filterField]: {
            [filterOperator]: dateString.toISOString()
          }
        };
        this.props.dispatch({ type: ADD_DELETE_FILTER, data: { 'filter': parentNode.getAttribute('data-field-name'), data: filterObj } });
      } catch (err) {
        console.log(err);
        alert('invalid Date');
      }
    }
  }
  render() {
    const styles = require('./SearchComponent.scss');
    return (
      <div className={styles.search_wrapper + ' ' + styles.wd_100}>
      	<p>Search</p>
      	<div className={styles.search_form + ' ' + styles.wd_100} data-field-name="filter1" onChange={ this.filterChange.bind(this) } >
          <select data-field-name="field">
            <option value="created_at"> Date </option>
          </select>
          <select data-field-name="operator">
            <option value="$gt"> Greater </option>
          </select>
      		<input type="date" placeholder="Contains" data-field-name="value"/>
      	</div>
      	<div className={styles.search_form + ' ' + styles.wd_100} data-field-name="filter2" onChange={ this.filterChange.bind(this) }>
          <select data-field-name="field">
            <option value="created_at"> Date </option>
          </select>
          <select data-field-name="operator">
            <option value="$lt"> Less Than </option>
          </select>
      		<input type="date" placeholder="Contains" data-field-name="value"/>
          { this.props.children }
      	</div>
      </div>
    );
  }
}

SearchComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default connect()(SearchComponent);
