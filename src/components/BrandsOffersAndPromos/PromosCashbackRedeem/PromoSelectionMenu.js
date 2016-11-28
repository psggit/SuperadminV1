import React from 'react';

const PromoSelectionMenu = ({styles, promos, onEditPromo, onAddPromo,
  onRemovePromo}) => {
  const promoSelectMenu = promos.map((promo, index) => {
    // Abstract function to make the name for the promo
    const promoName = (() => {
      if (!promo.brandName) {
        return 'No-Name-yet';
      } else if (!promo.sku || !promo.sku.volume) {
        return promo.brandName;
      } else if (!promo.pricing || !promo.pricing.state_short || !promo.pricing.state_short.state_name) {
        return promo.brandName + ' (' + promo.sku.volume + 'ml)';
      }
      return promo.brandName + ' (' + promo.sku.volume + 'ml) for ' + promo.pricing.state_short.state_name;
    })();

    return (
      <div className={styles.indiv_item} key={index}>
        <div className={styles.heading_container}>
          <p>
            <a onClick={onRemovePromo.bind(this, index)}>X</a>
          </p>
          <p className={styles.heading_lab}>
            {promoName}
          </p>
          <p className={styles.edit_lab} onClick={onEditPromo.bind(this, index)}>
            Edit
          </p>
        </div>
        <div className="clearfix"></div>
        <div className={styles.custom_table_th + ' ' + 'row'}>
          <div className={styles.table_th + ' ' + 'col-md-4'}>
            Cashback
          </div>
          <div className={styles.table_th + ' ' + 'col-md-4'}>
            Total Bottles
          </div>
          <div className={styles.table_th + ' ' + 'col-md-4'}>
            Total Amount
          </div>
        </div>
        <div className={styles.custom_table_td + ' ' + 'row'}>
          <div className={styles.table_td + ' ' + 'col-md-4'}>
            {
              promo.type === 'amount' ? ('INR ' + promo.price)
              : ('INR ' + (((promo.price / 100)) * promo.pricing.price))
            }
          </div>
          <div className={styles.table_td + ' ' + 'col-md-4'}>
            {promo.quantity}
          </div>
          <div className={styles.table_td + ' ' + 'col-md-4'}>
            {
              promo.type === 'amount' ?
                'INR ' + (promo.price * promo.quantity) :
                ('INR ' + ((((promo.price / 100)) * promo.pricing.price) * promo.quantity))
            }
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={styles.promo_items_container}>
      <div className={styles.heading}>
        Promo items
      </div>
      <p className={styles.add_promo_lab} onClick={onAddPromo.bind(this)}>
        + Add Promo
      </p>
      <div className={styles.items_list_container}>
        {promoSelectMenu}
      </div>
    </div>
  );
};

export default PromoSelectionMenu;
