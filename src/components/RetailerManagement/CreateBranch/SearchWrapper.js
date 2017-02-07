import React from 'react';

const SearchWrapper = ( {data, title, head, body} ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let tableHead;
  let tableContent;
  let objHtml;
  const list = (data === undefined) ? [] : data;

  tableContent = (tag) => {
    return (
      body.map((dat) => {
        return (
            <td> { tag[dat] } </td>
        );
      })
    );
  };

  tableBody = list.map((dat, index) => {
    return (
          <tr key={index}>
            { tableContent(dat) }
          </tr>
        );
  });
  tableHead = head.map((dat) => {
    return (
            <td> { dat } </td>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          Sorry no Logs
        </div>
        );
    }();
  } else {
    objHtml = () => {
      return (
            <table className={'table table-striped'}>
              <thead>
                <tr>
                 {tableHead}
                </tr>
              </thead>
              <tbody>
                {tableBody}
              </tbody>
            </table>
      );
    }();
  }

  return (
        <div className={styles.list_of_states_wrapper}>
          <label>
            { title }
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
