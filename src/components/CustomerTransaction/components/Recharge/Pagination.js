import React from 'react';

const Pagination = ({limit, currentPage, showMax, count, parentUrl}) => {
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
  const compute = currentIndex - ((currentIndex + (currentShowMax - 1)) - pages);
  let startVal = (currentIndex + (currentShowMax - 1)) < pages ? currentIndex : compute;
  startVal = (startVal < 0) ? 1 : startVal;

  currentShowMax = (currentIndex + (currentShowMax - 1)) < pages ? currentShowMax : pages;

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
            <a href={parentUrl + '?p=' + startVal} >
              {startVal++}
            </a>
          </li>
        );
  });

  return (
          <div className={styles.pagination_wrapper + ' ' + styles.wd_100 + ' ' + ''}>
            <ul className={styles.custom_pagination}>
              <li>
                <a href={leftPage} >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {pageHtml}
              <li>
                <a href={rightPage} >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </div>
      );
};

export default Pagination;
