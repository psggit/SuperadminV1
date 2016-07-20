import React from 'react';

import { Link } from 'react-router';

/* Generically styles wrapper for this kind of component */

import TopPicks from './TopPicks';

const TopPicksGenre = ({ label, data, genreClicked, stateId}) => { // eslint-disable-line no-unused-vars
  const styles = require('./Toppicks.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837

  const optionHtml = ( data.length > 0 ) ? data.map( ( dat, index ) => {
    const genreStateUrl = '/hadmin/skus/top_picks/' + stateId + '/' + dat.genre_id;
    return (
      <li key={ index } >
        <label className={styles.genres_hd}>{ dat.genre_name }</label>
        <Link to={ genreStateUrl }>
          <p onClick={ genreClicked } data-genre-id={ dat.genre_id }>{ dat.genre_total_count } item{ dat.genre_total_count > 1 ? 's' : ''}</p>
        </Link>
      </li>
    );
  })
  :
  (<li> Sorry No Genre Available </li>);
  return (
    <TopPicks label={ label }>
      { optionHtml }
    </TopPicks>
  );
};
export default TopPicksGenre;
