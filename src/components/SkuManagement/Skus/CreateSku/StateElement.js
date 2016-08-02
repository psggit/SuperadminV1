import React from 'react';

const StateElement = ({ stateInfo, stateCityMapping, onStateSelect, onStatePriceEntered}) => {
  const styles = require('./CreateSku.scss');
  const stateElement = ( Object.keys(stateInfo).length > 0) ? (
      <div className="state_wrapper">
        <label className={styles.check_box} data-state-id={stateInfo.id} >
          <input data-state-id={stateInfo.id} type="checkbox" checked={ stateCityMapping.is_selected } onClick={onStateSelect} data-field-name="state_id" data-field-type="int" /> { stateInfo.state_name }
        </label>
        {
          (stateCityMapping.is_selected) ?
            (
              <div className="input_wrapper">
                <input type="number" data-state-id={ stateInfo.id } placeholder="MRP" data-field-name="duty_paid" data-field-type="int" value={ stateCityMapping.duty_paid ? stateCityMapping.duty_paid : '' } onChange={ onStatePriceEntered }/>
                <input type="number" data-state-id={ stateInfo.id } placeholder="Dutyfree" data-field-name="duty_free" value={ stateCityMapping.duty_free ? stateCityMapping.duty_free : '' } data-field-type="int" onChange={ onStatePriceEntered }/>
              </div>
            ) : ''
        }
      </div>
    ) : (
      <div className={styles.indiv_element}>
        Sorry something is wrong
      </div>
    );

  return (
        <div className={styles.indiv_element}>
          { stateElement }
        </div>
      );
};

export default StateElement;
