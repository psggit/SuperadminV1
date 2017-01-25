import React from 'react';
import { Link } from 'react-router';

const SearchWrapper = ( {data} ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let objHtml;

  console.log(data);
  tableBody = data.map((dat, index) => {
    let from = dat.active_from;
    let to = dat.active_to;

    const viewPromos = () => {
      // Currently only one sku per promo.
      const makePromos = dat.cashback_promos.map((promo, pid) => {
        return (
          <tr key={pid}>
            <td> </td>
            <td>{promo.promoName}</td>
            <td>{promo.promo_description}</td>
            <td>{promo.amount ? 'fixed' : 'percentage'}</td>
            <td>{promo.amount ? promo.amount : promo.percentage}</td>
            <td>{promo.service_charge_flat ? 'fixed' : 'percentage'}</td>
            <td>{promo.service_charge_flat ? promo.service_charge_flat : promo.service_charge_percentage}</td>
            <td>{promo.skus.length > 0 && promo.skus[0].quantity ? promo.skus[0].quantity : 'n.a.'}</td>
            <td>{promo.skus.length > 0 && promo.skus[0].price ? promo.skus[0].price : 'n.a.'}</td>
            <td>{promo.skus.length > 0 && promo.skus[0].sku_pricing.sku.volume ? promo.skus[0].sku_pricing.sku.volume : 'n.a.'}</td>
            <td>{promo.skus.length > 0 && promo.skus[0].sku_pricing.sku.brand.brand_name ?
              promo.skus[0].sku_pricing.sku.brand.brand_name : 'n.a.'}</td>
            <td>{promo.skus.length > 0 && promo.skus[0].sku_pricing.state_short.state_name ?
              promo.skus[0].sku_pricing.state_short.state_name : 'n.a.'}</td>
          </tr>
        );
      });

      return (
        <div>
          <button type="button" className={"btn btn-info btn-lg"} data-toggle="modal" data-target={'#viewModal' + index}>View</button>
          <div id={'viewModal' + index} className="modal fade" role="dialog">
            <div className="modal-dialog" style={{width: 'auto'}}>
              <div className="modal-content">
                <div className="modal-body">
                  <table className={'table table-responsive table-striped'} style={{width: '100%'}}>
                    <thead>
                      <tr>
                        <th> </th>
                        <th> Name </th>
                        <th> Description </th>
                        <th> Type </th>
                        <th> Amount | Percentage </th>
                        <th> Service Type </th>
                        <th> Service Amount | Percentage </th>
                        <th> Skus Quantity </th>
                        <th> Skus Price </th>
                        <th> Skus Volume </th>
                        <th> Sku Brand Name </th>
                        <th> Sku Region </th>
                      </tr>
                    </thead>
                    <tbody>
                      {makePromos}
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };


    from = new Date(new Date(from).getTime()).toLocaleString('en-GB');
    to = new Date(new Date(to).getTime()).toLocaleString('en-GB');
    return (
          <tr key={index}>
            <td>
              <Link to={'#'}>
                <button className={styles.edit_btn} data-campaign-id={dat.id}>
                  Disable
                </button>
              </Link>
            </td>
            <td> { dat.id } </td>
            <td> { dat.name } </td>
            <td> { dat.brand_manager ? dat.brand_manager.name : 'N/A' } </td>
            <td> { dat.brand_manager ? dat.brand_manager.email : 'N/A' } </td>
            <td> { dat.status } </td>
            <td>
              { dat.cashback_promos.length > 0 ? dat.cashback_promos[0].skus[0].sku_pricing.sku.brand.brand_name : 'N/A' }
            </td>
            <td>
              { dat.cashback_promos.length > 0 ? dat.cashback_promos[0].skus[0].sku_pricing.sku.volume : 'N/A' }
            </td>
            <td>
              Rs { dat.budgeted_amount }
            </td>
            <td>
              Rs { dat.funds_credited }
            </td>
            <td>
              { dat.type }
            </td>
            <td>
              { from }
            </td>
            <td>
              { to }
            </td>
            <td>
              { viewPromos() }
            </td>
          </tr>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          Sorry no Campaigns
        </div>
        );
    }();
  } else {
    objHtml = () => {
      return (
            <table className={'table table-striped'}>
              <thead>
                <tr>
                  <th> </th>
                  <th> ID </th>
                  <th> Campaign Name </th>
                  <th> Brand Manager Name </th>
                  <th> Brand Manager Email </th>
                  <th> Campaign Status </th>
                  <th> Brand Name </th>
                  <th> Volume </th>
                  <th> Budgeted Amount </th>
                  <th> Funds Credited </th>
                  <th> Campaign Type </th>
                  <th> Active From </th>
                  <th> Active To </th>
                  <th> Promos </th>
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
            List of Campaigns
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
