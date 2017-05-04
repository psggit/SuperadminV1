import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

import {
  INPUT_CHANGED,
  INCREMENT_FILTER,
  CLEAR_FILTER
} from './FilterState';

import SearchFields from './SearchFields';

class SearchComponent extends Component {
  onTabOut( e ) {
    /* Monitors focus out event */
    console.log('Focussed Out');
    const fieldId = parseInt( e.target.parentNode.getAttribute('data-field-id'), 10 );

    /* Check all the values */
    const currFilterObj = { ...this.props.currFilter.filters[fieldId] };

    if ( currFilterObj.field && currFilterObj.operator && currFilterObj.value ) {
      this.props.dispatch({ type: INCREMENT_FILTER, data: fieldId });
    }
  }
  onClose( e ) {
    const fieldId = parseInt( e.target.parentNode.getAttribute('data-field-id'), 10 );
    this.props.dispatch({ type: CLEAR_FILTER, data: fieldId });
  }
  trackChanges(e) {
    /* Monitors changes on the form fields */
    console.log('Tracked');
    const fieldN = e.target.getAttribute('data-field-name');
    const fieldType = e.target.getAttribute('data-field-type');
    const returnProperValue = ( typ, val ) => {
      return ( typ === 'date' ) ? new Date(val).toISOString() : val;
    };
    const val = ( fieldType === 'number') ? parseInt(e.target.value, 10) : returnProperValue( fieldType, e.target.value );
    const fieldId = e.target.parentNode.getAttribute('data-field-id');
    this.props.dispatch({ type: INPUT_CHANGED, data: { id: fieldId, values: { [fieldN]: val }}});
  }
  render() {
    const styles = require('./SearchComponent.scss');

    const { currentFilter, selectedFields } = this.props.currFilter;

    const { configuredFields, fieldTypeMap, fieldOperatorMap } = this.props;

    const filters = Object.keys(this.props.currFilter.filters);

    const selectedFilters = [];

    if ( filters.length > 0 ) {
      filters.forEach( ( filter, index ) => {
        if ( this.props.currFilter.filters[filter].isValid ) {
          selectedFilters.push(
            <SearchFields key={ index } id = { parseInt(filter, 10) } monitorChanges={ this.trackChanges.bind(this) } onTabOut={ this.onTabOut.bind(this) } isDisabled="1" values = { this.props.currFilter.filters[filter] } selectedFilters={ selectedFields } clearFilter={ this.onClose.bind(this) } configuredFields={ configuredFields } fieldOperatorMap={ fieldOperatorMap } fieldTypeMap={ fieldTypeMap }/>
          );
        }
      });
    }

    return (
      <div className={styles.search_wrapper + ' ' + styles.wd_100}>
      	<p>Search</p>
        <SearchFields id = { currentFilter } monitorChanges={ this.trackChanges.bind(this) } onTabOut={ this.onTabOut.bind(this) } isDisabled="0" values={ this.props.currFilter.filters[currentFilter] ? this.props.currFilter.filters[currentFilter] : {} } selectedFilters={ selectedFields } clearFilter={ this.onClose.bind(this) } configuredFields={ configuredFields } fieldOperatorMap={ fieldOperatorMap } fieldTypeMap={ fieldTypeMap } />
        { this.props.children }
        { selectedFilters }
      </div>
    );
  }
}

SearchComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  currFilter: PropTypes.object.isRequired,
  fieldOperatorMap: PropTypes.object.isRequired,
  fieldTypeMap: PropTypes.object.isRequired,
  configuredFields: PropTypes.array.isRequired
};

const mapStateToProps = ( state ) => {
  return { currFilter: { ...state.gen_filter_data }};
};

export default connect(mapStateToProps)(SearchComponent);
