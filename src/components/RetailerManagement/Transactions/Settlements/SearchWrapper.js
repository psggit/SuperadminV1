import React from 'react';

const SearchWrapper = ( {data} ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    let createdAt = dat.created_at;
    let updatedAt = dat.updated_at;

    createdAt = new Date(new Date(createdAt).getTime()).toLocaleString();
    updatedAt = new Date(new Date(updatedAt).getTime()).toLocaleString();
    return (
          <tr key={index}>
            <td> { dat.id } </td>
            <td>
                { dat.retailer.org_name}
            </td>
            <td>
                Rs { dat.net_manual_credits ? dat.net_manual_credits : 0 }
            </td>
            <td>
                Rs { dat.net_amount ? dat.net_amount : 0 }
            </td>
            <td>
                Rs { dat.discount ? dat.discount : 0 }
            </td>
            <td>
                Rs { dat.service_tax ? dat.service_tax : 0 }
            </td>
            <td>
                { dat.payment_status ? dat.payment_status : 'N/A' }
            </td>
            <td>
                Rs { dat.opening_balance ? dat.opening_balance : 0 }
            </td>
            <td>
                Rs { dat.closing_balance ? dat.closing_balance : 0 }
            </td>
            <td>
                Rs { dat.escrow_amount ? dat.escrow_amount : 0 }
            </td>
            <td>
                Rs { dat.promo_reserve_amount ? dat.promo_reserve_amount : 0 }
            </td>
            <td>
                Rs { dat.location ? dat.location : 0 }
            </td>
            <td>
                Rs { dat.amount_being_paid ? dat.amount_being_paid : 0 }
            </td>
            <td>
                Rs { dat.icb_rcb_dbr_amount ? dat.icb_rcb_dbr_amount : 0 }
            </td>
            <td>
                Rs { dat.net_gift_amount ? dat.net_gift_amount : 0 }
            </td>
            <td>
                Rs { dat.voucher ? dat.voucher : 0 }
            </td>
            <td>
                Rs { dat.net_consumer_amount ? dat.net_consumer_amount : 0 }
            </td>
            <td>
                Rs { dat.net_brand_amount ? dat.net_brand_amount : 0 }
            </td>
            <td>
                Rs { dat.gross_amount ? dat.gross_amount : 0 }
            </td>
            <td>
                Rs { dat.net_manual_debits ? dat.net_manual_debits : 0 }
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
                  <th> Branch Name </th>
                  <th> Net Manual Credits </th>
                  <th> Net Amount </th>
                  <th> Discount </th>
                  <th> Service Tax </th>
                  <th> Payment Status </th>
                  <th> Opening Balance </th>
                  <th> Closing Balance </th>
                  <th> Escrow Amount </th>
                  <th> Promo Reserve Amount </th>
                  <th> Location </th>
                  <th> Amount Being Paid </th>
                  <th> ICB RCB DBR Amount </th>
                  <th> Net Gift Amount </th>
                  <th> Voucher </th>
                  <th> Net Consumer Amount </th>
                  <th> Net Brand Amount </th>
                  <th> Gross Amount </th>
                  <th> Net Manual Debits </th>
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
            Retailer Settlements
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
