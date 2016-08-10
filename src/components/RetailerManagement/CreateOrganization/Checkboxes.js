import React, { Component, PropTypes } from 'react';

/* Component which returns list of checkbox html's for an array of Checkbox */
class Checkboxes extends Component {
  constructor(props) {
    super();
    this.state = {};
    this.localState = {};
    // Setting false to all the checkboxes initially
    props.checkBoxes.forEach( ( checkbox ) => {
      this.localState[checkbox.checkVal] = false;
    });
    this.state.checkBoxStatus = { ...this.localState };
    this.defaultState = { ...this.localState };
  }
  handleLocally(e) {
    const checkBoxState = {};
    checkBoxState[e.target.getAttribute('data-checkbox-key')] = e.target.checked;
    this.setState({ checkBoxStatus: { ...this.defaultState, ...checkBoxState }});
  }
  render() {
    const styles = require('./OrganizationCheckbox.scss');
    const { fieldType, fieldName, checkBoxes } = this.props;

    const checkBoxList = checkBoxes.map( ( checkbox, index ) => {
      return (
              <div className = {styles.constitution_organisation_checkbox} key = { index }>
                <input type="checkbox" data-checkbox-key={ checkbox.checkVal } data-field-name={ fieldName } data-field-type={ fieldType } checked={ this.state.checkBoxStatus[checkbox.checkVal] } onChange={ this.handleLocally.bind(this) } value={ checkbox.checkVal } />
                <label htmlFor = {checkbox.checkVal}>{checkbox.labelVal}</label>
              </div>
          );
    });
    return (
      <div data-field-name={ fieldName } data-field-type={ fieldType } >
        { checkBoxList }
      </div>
    );
  }
}

Checkboxes.propTypes = {
  fieldType: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  checkBoxes: PropTypes.array.isRequired
};
export default Checkboxes;
