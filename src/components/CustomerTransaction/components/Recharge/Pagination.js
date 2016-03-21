import React from 'react';
import { Link } from 'react-router';

const Pagination = ({limit, currentPage, showMax, count, parentUrl, onClickHandler}) => {
  const styles = require('./Pagination.scss');

  const currentLimit = parseInt(limit, 10);
  const spare = count % currentLimit;
  const pages = (spare) ? parseInt((count / currentLimit), 10) + 1 : parseInt((count / currentLimit), 10);
  let pageHtml;
  let leftPage;
  let rightPage;
  let isLeftPage;
  let isRightPage;

  /* Compute maximum pagination links to be shown */
  /* Logic
   *  Compute the starting number and go till the showMax
   * */
  const currentIndex = parseInt(currentPage, 10);
  let currentShowMax = parseInt(showMax, 10);

  /* Check if show Max is greater than the total pages
   * if yes let it be else reduce the showMax to the number of pages available
   * */
  currentShowMax = (currentShowMax > pages) ? pages : currentShowMax;
  /* Computation of lowest value to start with to go uptil the showMax */
  let compute = currentIndex - ((currentIndex + (currentShowMax - 1)) - pages);
  compute = (compute) ? compute : 1;
  let startVal = (currentIndex + (currentShowMax - 1)) <= pages ? currentIndex : compute;
  startVal = (startVal < 0) ? 1 : startVal;

  // currentShowMax = (currentIndex + (currentShowMax - 1)) <= pages ? currentShowMax : pages - 1;

  isLeftPage = (currentPage > 1) ? true : false;
  isRightPage = (currentPage < pages ) ? true : false;

  leftPage = (isLeftPage) ? parentUrl + '?p=' + (currentPage - 1) : '#';
  rightPage = (isRightPage) ? parentUrl + '?p=' + (currentPage + 1) : '#';

  /* Raise error if startVal + (showMax - 1) > pages */
  /* if startVal < 0 then raise an error
   * Check the current page is in the range of page links which will be shown */

  /* If the number of pages is 0 then throw an error */
  pageHtml = Array.apply(null, Array(currentShowMax)).map((p, i) => {
    const isActive = (startVal === currentIndex) ? true : false;
    return (
          <li key={i} className={(isActive) ? styles.active : ''}>
            <Link to={parentUrl + '?p=' + startVal} onClick={onClickHandler}>
              {startVal++}
            </Link>
          </li>
        );
  });

  return (
          <div className={styles.pagination_wrapper + ' ' + styles.wd_100 + ' ' + ''}>
            <ul className={styles.custom_pagination}>
              <li>
                <Link to={leftPage} onClick={onClickHandler}>
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li>
              {pageHtml}
              <li>
                <Link to={rightPage} onClick={onClickHandler}>
                  <span aria-hidden="true">&raquo;</span>
                </Link>
              </li>
            </ul>
          </div>
      );
};

export default Pagination;
