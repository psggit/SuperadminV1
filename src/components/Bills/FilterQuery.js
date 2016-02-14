/*
  Use state exactly the way columns in create table do.
  dispatch actions using a given function,
  but don't listen to state.
  derive everything through viewtable as much as possible.
*/
import React from 'react';

const FilterQuery = () => {
  const styles = require('./FilterQuery.scss');
  return (
    <div className={styles.filterOptions + ' row'}>
      <div className={styles.queryBox + ' col-md-5'}>
        <b className={styles.boxHeading}>Select</b>
      </div>
      <div className={styles.queryBox + ' col-md-2'}>
        <b className={styles.boxHeading}>Sort</b>
      </div>
      <div className={styles.queryBox + ' col-md-2'}>
        <b className={styles.boxHeading}>Limit/Offset</b>
        <nav>
          <ul className={styles.pagination + ' pagination'}>
            <li>
              <a href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li>
              <a href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    );
};

export default FilterQuery;
