import React from 'react';

/* Version change */
/* Changed all the state-id's to state-short-name's */

const StateElement = ({toggleState, stateInfo, stateCityMapping, onStateSelect, onStatePriceEntered}) => {
  const styles = require('./CreateSku.scss');

  const serverFetched = ( 'serverValues' in stateCityMapping );

  // TODO: Make another checkbox to set is_active flag for sku_pricing

  const stateElement = ( Object.keys(stateInfo).length > 0) ? (
      <div className="state_wrapper">
        <label className={styles.check_box} data-state-id={stateInfo.short_name} >
          <input data-state-id={stateInfo.short_name} disabled = { serverFetched } type="checkbox" checked={ stateCityMapping.is_selected } onClick={onStateSelect} data-field-name="state_id" data-field-type="int" /> { stateInfo.state_name }
        </label>
        {
          (stateCityMapping.is_selected) ?
            (
              <div className="input_wrapper">
                <input type="number" data-state-id={ stateInfo.short_name } placeholder="Price" data-field-name="price" data-field-value={ stateCityMapping.price ? stateCityMapping.price : '' } data-field-type="int" value={ stateCityMapping.price ? stateCityMapping.price : '' } onChange={ onStatePriceEntered }/>
                <button className={styles.save_btn} data-state-id={ stateInfo.short_name } data-current-status={ stateCityMapping.is_active } onClick={toggleState} >{ (stateCityMapping.is_active) ? 'Deactivate' : 'Activate' }</button>
              </div>

              //  Default to false, unless explicitly toggled
            ) : ''
        }
      </div>
    ) : (
      <div className={styles.indiv_element}>
        Sorry something is wrong  // - Why is this useful?
      </div>
    );

  return (
        <div className={styles.indiv_element}>
          { stateElement }
        </div>
      );
};

export default StateElement;
