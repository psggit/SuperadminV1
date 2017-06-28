import React from 'react';
import formValidator from '../Common/CommonFormValidator';

import {AD_INFO} from './BrandListingActions';

const AdInfo = ({allState, allGenre, displayList}) => {
  const styles = require('./CreateBarAd.scss');
  const allStateHtml = allState.map((state) => {
    return (<option value={state.short_name}> {state.state_name} </option>);
  });
  const allGenreHtml = allGenre.map((genre) => {
    return (<option value={genre.short_name}> {genre.display_name} </option>);
  });
  return (
      <div className={styles.campaign_container}>
        <div className={styles.heading + ' ' + styles.wd_100}>Brand Ordering</div>
          <ul>
            <li>
              <label>Select State</label>
              <select data-field-name="state_short_name" id="state_short" data-field-type="string" onChange={displayList}>
                <option value={null}>Select</option>
                {allStateHtml}
              </select>
            </li>
            <li>
              <label>Select Genre</label>
              <select id="genre_short" onChange={displayList}>
                <option value={null}>Select</option>
                {allGenreHtml}
              </select>
            </li>
          </ul>
      </div>
  );
};

// Format
// formValidator( Component, Form Attribute for Models)
export default formValidator(AdInfo, 'data-field-name', 'data-field-type', AD_INFO);
// Change emitter is the function
