import React, { Component, PropTypes } from 'react';

class SearchFields extends Component {
  render() {
    const styles = require('./SearchComponent.scss');
    const { id, onTabOut, monitorChanges, isDisabled, values, selectedFilters, clearFilter } = this.props;
    let fields = ['name', 'id', 'email'];
    const operator = ['$eq'];
    const operatorMap = {};
    operatorMap.$eq = 'Equal';

    if ( !parseInt(isDisabled, 10 ) ) {
      fields = fields.filter( ( f ) => {
        return ( selectedFilters.indexOf(f) === -1 );
      });
    }

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
      <div className={styles.search_form + ' ' + styles.wd_100 } data-field-id={ id } onChange={ monitorChanges } >
        <select data-field-name="field" disabled={ parseInt(isDisabled, 10) ? true : '' } value={ values ? values.field : '' } >
          <option value=""> Select Field </option>
          { selectHtml }
        </select>
        <select data-field-name="operator" disabled={ parseInt(isDisabled, 10) ? true : '' } value={ values ? values.operator : '' } >
          <option value=""> Select Operator </option>
          { operatorHtml }
        </select>
      	<input type="text" placeholder="Contains" data-field-name="value" onBlur={ onTabOut } disabled={ parseInt(isDisabled, 10) ? true : '' } value={ values ? values.value : '' } />
        <div className={ styles.cross + ( !parseInt(isDisabled, 10 ) ? ' hide' : '') } data-field-id={ id } onClick={ clearFilter } >
          x
        </div>
      </div>
    );
  }
}

SearchFields.propTypes = {
  id: PropTypes.number.isRequired,
  monitorChanges: PropTypes.func.isRequired,
  onTabOut: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  isDisabled: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  selectedFilters: PropTypes.array.isRequired
};

export default SearchFields;
