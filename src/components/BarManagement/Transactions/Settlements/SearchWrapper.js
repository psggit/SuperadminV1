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
                { dat.bar.name }
            </td>
            <td>
                Rs { dat.net_manual_debits >= 0 ? dat.net_manual_debits : 'N/A' }
            </td>
            <td>
                Rs { dat.net_manual_credits >= 0 ? dat.net_manual_credits : 'N/A' }
            </td>
            <td>
                Rs { dat.discount >= 0 ? dat.discount : 'N/A' }
            </td>
            <td>
                Rs { dat.service_tax >= 0 ? dat.service_tax : 'N/A' }
            </td>
            <td>
                Rs { dat.opening_balance >= 0 ? dat.opening_balance : 'N/A' }
            </td>
            <td>
                Rs { dat.closing_balance >= 0 ? dat.closing_balance : 'N/A' }
            </td>
            <td>
                Rs { dat.bar_price >= 0 ? dat.bar_price : 'N/A' }
            </td>
            <td>
                Rs { dat.hipbar_deal_price >= 0 ? dat.hipbar_deal_price : 'N/A' }
            </td>

            <td>
                Rs { dat.commission >= 0 ? dat.commission : 'N/A' }
            </td>
            <td>
                Rs { dat.net_settlement_amt >= 0 ? dat.net_settlement_amt : 'N/A' }
            </td>
            <td>
                Rs { dat.being_paid_today >= 0 ? dat.being_paid_today : 'N/A' }
            </td>
            <td>
                Rs { dat.voucher >= 0 ? dat.voucher : 'N/A' }
            </td>
            <td>
                Rs { dat.hipbar_menu_price >= 0 ? dat.hipbar_menu_price : 'N/A' }
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
          Sorry no settlements
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
                  <th> Bar Name </th>
                  <th> Net Manual Debits </th>
                  <th> Net Manual Credits </th>
                  <th> Discount </th>
                  <th> Service Tax </th>
                  <th> Opening Balance </th>
                  <th> Closing Balance </th>
                  <th> Bar Price </th>
                  <th> Hipbar Deal Price </th>
                  <th> Commission </th>
                  <th> Net Settlement Amount </th>
                  <th> Being Today </th>
                  <th> Voucher </th>
                  <th> Hipbar Menu Price</th>
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
            Bar Settlements
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
