import React, { PropTypes } from 'react';

/* Notes Written in CommonFormValidator.md */

const commonFormValidator = ( Component, fieldName, fieldType, changeEmitter) => {
  if ( !fieldName ) {
    console.error('INITIALIZATIONERROR: Cannot enhance the component, initialize using commonFormValidator(<Component>, <attribute used to denote form fields>)');
    return Component;
  }
  class FormValidator extends React.Component {
    constructor() {
      super();
      this.eventHandlers = {};
      this.eventHandlers.handleInputChange = this.handleInputChange.bind(this);
      this.eventHandlers.lookFor = fieldName;
    }
    componentWillMount() {
      console.log('Form Validator is being mounted');
    }
    componentWillUnmount() {
      console.log('Form Validator is being unmounted');
    }
    handleInputChange(e) {
      /* Get the attribute name which was given when initialized */
      const fieldN = e.target.getAttribute(this.eventHandlers.lookFor);
      const data = {};
      let fieldT = e.target.getAttribute(fieldType);
      if ( !fieldT) {
        console.warn('`' + e.target.nodeName.toLowerCase() + ' tag with ' + '`' + fieldName + '=' + fieldN + '` as the field name doesnt contain a type. Defaults to string');
      }
      fieldT = (fieldT) ? fieldT : 'string';
      if (!fieldN) {
        const typeOf = '<' + e.target.nodeName.toLowerCase() + '>' + ' form tag';
        const message = this.eventHandlers.lookFor + ' attribute missing for the changed tag (' + typeOf + ')';
        console.warn('FORMVALIDATORERROR: ' + message);
        return false;
      }
      data.key = fieldN;
      /* Return valid value based on the data type of the field */
      const fetchVal = () => {
        if ( fieldT === 'boolean') {
          return Boolean(parseInt(e.target.value, 10));
        } else if (fieldT === 'float') {
          return parseFloat(e.target.value ? e.target.value : 0);
        }
        return e.target.value;
      };

      const makeIntValue = (value, isNegative ) => {
        let intVal = parseInt(value, 10);
        if ( isNegative ) {
          intVal = () => {
            if ( !Boolean(parseInt(isNegative, 10)) ) {
              return Math.abs(intVal);
            }
            return intVal;
          }();
        }
        return ( intVal ) ? intVal : 0;
      };

      data.value = (e.target.getAttribute(fieldType) === 'int') ? makeIntValue(e.target.value, e.target.getAttribute('data-is-negative')) : fetchVal();
      this.props.dispatch({ type: changeEmitter, data: data});
    }
    render() {
      return (
          <div className="attacher" onChange={ this.eventHandlers.handleInputChange }>
            <Component { ...this.props } />
          </div>
        );
    }
  }
  FormValidator.propTypes = {
    dispatch: PropTypes.func.isRequired
  };
  return FormValidator;
};

export default commonFormValidator;
