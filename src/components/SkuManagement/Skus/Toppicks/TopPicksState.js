import React from 'react';

/* Generically styles wrapper for this kind of component */

import TopPicks from './TopPicks';

const TopPicksState = ({ label, data, stateClicked}) => { // eslint-disable-line no-unused-vars
  const styles = require('./Toppicks.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  const optionHtml = ( data.length > 0 ) ? data.map( ( dat, index ) => {
    let totalItemCount = 0;
    dat.values.forEach( ( p ) => {
      totalItemCount += p.genre_total_count;
    });
    return (
      <li key={ index } >
        <label className={styles.genres_hd}>{ dat.state_name }</label>
        <p onClick={ stateClicked } data-state-id={ dat.state_id }>{ totalItemCount } item{ totalItemCount > 1 ? 's' : ''}</p>
      </li>
    );
  })
  :
  (<li> Sorry No States Available </li>);
  return (
    <TopPicks label={ label }>
      { optionHtml }
    </TopPicks>
  );
};
export default TopPicksState;
