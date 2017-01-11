import React from 'react';

const SearchWrapper = ( {data} ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    let createdAt = dat.created_at;
    let updatedAt = dat.updated_at;

    createdAt = new Date(new Date(createdAt).getTime()).toLocaleString('en-GB');
    updatedAt = new Date(new Date(updatedAt).getTime()).toLocaleString('en-GB');
    return (
          <tr key={index}>
            <td> { dat.id } </td>
            <td>
                { dat.retailer.org_name}
            </td>
            <td>
                Rs { dat.opening_balance }
            </td>
            <td>
                Rs { dat.closing_balance }
            </td>
            <td>
                Rs { dat.net_consumer_amount }
            </td>
            <td>
                Rs { dat.net_brand_amount }
            </td>
            <td>
                Rs { dat.net_manual_credits }
            </td>
            <td>
                Rs { dat.net_manual_debits }
            </td>
            <td>
                Rs { dat.net_discount_amount }
            </td>
            <td>
                Rs { dat.net_gifting_amount }
            </td>
            <td> { createdAt } </td>
            <td> { updatedAt } </td>
          </tr>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          Sorry no daily reports
        </div>
        );
    }();
  } else {
    objHtml = () => {
      return (
            <table className={'table table-striped'}>
              <thead>
                <tr>
                  <th> ID </th>
                  <th> Branch Name </th>
                  <th> Opening Balance </th>
                  <th> Closing Balance </th>
                  <th> Net Consumer Amount </th>
                  <th> Net Brand Amount </th>
                  <th> Net Manual Credits </th>
                  <th> Net Manual Debits </th>
                  <th> Net Discount Amount </th>
                  <th> Net Gifting Amount </th>
                  <th> Created At </th>
                  <th> Updated At </th>
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
            Retailer Daily Reports
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
