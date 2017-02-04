import React from 'react';

const PromoDetails = ({styles, currentEditingPromo, promos, brands, fundsCredited,
  activeFrom, activeTo, isPromoSectionShown, onChangePromoObjInfo, onChangePromoInfo}) => {
  if (isPromoSectionShown) {
    const promo = promos[currentEditingPromo];
    const brandsMenu = brands ? brands.map((brand, index) => {
      return (
        <li title={brand.brand.description} key={index}>
          <label>
            <input type="radio" name="promo_brand" value={brand.brand.brand_name}
            checked={brand.brand.brand_name === promo.brandName}
            onChange={onChangePromoInfo.bind(this, 'brandName', currentEditingPromo, {})} />
            {brand.brand.brand_name}
          </label>
          <p>{brand.brand.skus ? brand.brand.skus.length : 'Not Available'}</p>
        </li>
      );
    }) : null;

    const skus = promo.brandName ? brands.filter((brand) => {
      return (brand && brand.brand && brand.brand.brand_name &&
        brand.brand.brand_name === promo.brandName);
    }).map((chosenBrand) => {
      return chosenBrand.brand.skus;
    }) : [];

    const skusMenu = skus.length > 0 && skus[0].length > 0 ? skus[0].map((sku, index) => {
      return (
        <li key={index}>
          <label>
            <input type="radio" name="sku" value={sku.volume}
              checked={sku.volume === promo.sku.volume}
              onChange={onChangePromoObjInfo.bind(this, 'sku', currentEditingPromo, sku, {
                activeFrom: activeFrom,
                activeTo: activeTo
              })}/>
            {sku.volume + ' ml'}
          </label>
        </li>
      );
    }) : null;

    const stateMenu = promo.sku && promo.sku.pricings && promo.sku.pricings.length
      ? promo.sku.pricings.map((pricing, index) => {
        return (
          <li key={index}>
            <label>
              <input type="radio" name="state" value={pricing.state_short.state_name}
                checked={promo.pricing.state_short && (pricing.state_short.state_name === promo.pricing.state_short.state_name)}
                onChange={onChangePromoObjInfo.bind(this, 'pricing', currentEditingPromo, pricing, {
                })}/> {pricing.state_short.state_name}
              <input type="number" min ="0" name="quantity" value={promo.quantity} className={styles.input_val}
                onChange={onChangePromoInfo.bind(this, 'quantity', currentEditingPromo, {
                  fundsCredited: fundsCredited,
                  price: promo.price,
                  type: promo.type,
                  promos: promos,
                  currentEditingPromo: currentEditingPromo,
                  itemPrice: pricing.price,
                  prevQuantity: promo.quantity
                })}/>
            </label>
          </li>
        );
      }) : null;

    return (
      <div className={styles.promo_details_container}>
        <div className={styles.heading}>
          promo details
        </div>
        {/*
          <div className={styles.wd_100}>
            <label className={styles.success_msg_lab}>
              Success Message
            </label>
            <textarea rows="4" cols="10" className={styles.text_msg}></textarea>
          </div>
        */}
        <div className={styles.wd_100 + ' ' + styles.padding_top}>
          <label className={styles.success_msg_lab}>
            Promo name
          </label>
          <div className={styles.text_input}>
            <input type="text" data-field-value={promo.promoName} value={promo.promoName}
              onChange={onChangePromoInfo.bind(this, 'promoName', currentEditingPromo, {})} />
          </div>
        </div>
        <div className={styles.wd_100 + ' ' + styles.padding_top}>
          <label className={styles.success_msg_lab}>
            Promo Description
          </label>
          <div className={styles.text_input}>
            <input data-field-value={promo.promo_description} value={promo.promo_description}
              onChange={onChangePromoInfo.bind(this, 'promo_description', currentEditingPromo, {})} />
          </div>
        </div>
        <div className={styles.wd_100 + ' ' + styles.padding_top}>
          <label className={styles.success_msg_lab}>
            Cashback Amount
          </label>
          <div className={styles.custom_select}>
            <input type="number" min= "0" className={styles.input_cash} data-field-value={promo.price ? promo.price : 0} value={promo.price ? promo.price : 0}
              onChange={onChangePromoInfo.bind(this, 'price', currentEditingPromo, {
                type: promo.type ? promo.type : 'amount',
                maxPrice: (promo.pricing ? promo.pricing.price : 0)
              })}
            />
            <select name="promo_type" value={promo.type ? promo.type : 'amount'}
              onChange={onChangePromoInfo.bind(this, 'type', currentEditingPromo, {
                price: promo.price,
                maxPrice: (promo.pricing ? promo.pricing.price : 0)
              })}>
              <option value={'amount'}>INR</option>
              <option value={'percentage'}>%</option>
            </select>
          </div>
        </div>

        <div className={styles.wd_100 + ' ' + styles.padding_top}>
          <label className={styles.success_msg_lab}>
            Service Charge
          </label>
          <div className={styles.custom_select}>
            <input type="number" min= "0" className={styles.input_cash} data-field-value={promo.serviceCharge ? promo.serviceCharge : 0} value={promo.serviceCharge ? promo.serviceCharge : 0}
              onChange={onChangePromoInfo.bind(this, 'serviceCharge', currentEditingPromo, {
                type: promo.type ? promo.type : 'amount',
                maxPrice: (promo.pricing ? promo.pricing.price : 0)
              })}
            />
            <select name="service_type" value={promo.service_type ? promo.service_type : 'amount'}
              onChange={onChangePromoInfo.bind(this, 'service_type', currentEditingPromo, {
                price: promo.serviceCharge,
                maxPrice: (promo.pricing ? promo.pricing.price : 0)
              })}>
              <option value={'amount'}>INR</option>
              <option value={'percentage'}>%</option>
            </select>
          </div>
        </div>

        <div className={styles.select_container}>
          {/* Brand Picker*/}
          <div className={styles.heading}>
            Select sku
          </div>
          <div className={styles.brand_container}>
            <div className={styles.heading}>
              <label>Brands</label>
            </div>
            <ul>
              {brandsMenu}
            </ul>
          </div>
          {/* Sku Picker*/}
          <div className={styles.product_ml_container}>
            <div className={styles.heading}>
              <span className={styles.state}>Volumes (Skus)</span>
            </div>
            <ul>
              {skusMenu}
            </ul>
          </div>
        </div>
        {/* Brand Picker*/}
        <div className={styles.quantity_container}>
          <div className={styles.heading}>
            Select State
          </div>
          <div className={styles.brand_container}>
            <div className={styles.heading}>
              <label>Regions</label>
            </div>
            <ul>
              {stateMenu}
            </ul>
          </div>
        </div>
        {/*
        <div className={styles.user_actions}>
          <button>Delete</button>
          <button>Update</button>
        </div>
        */}
      </div>
    );
  }
  // if the promo section is hidden
  return (
    <div></div>
  );
};

export default PromoDetails;
