import { dataUrl } from '../../../Endpoints';

const selectCompanies = {
  url: dataUrl + '/v1/query',
  query: {
    type: 'select',
    args: {
      table: 'company',
      columns: ['name', 'updated_at', 'created_at', 'id', {
        name: 'brands',
        columns: ['brand_name', 'id', {
          name: 'managers',
          columns: ['brand_id', 'id', {
            name: 'brand_manager',
            columns: ['name', 'email']
          }]
        }]
      }]
    }
  }
};

const selectBrandManagers = (companyName) => {
  return {
    url: dataUrl + '/v1/query',
    query: {
      type: 'select',
      args: {
        table: 'brand_manager',
        columns: ['email', 'name', 'id', {
          name: 'company',
          columns: ['name']
        }, {
          name: 'campaigns',
          columns: ['id', 'name', 'created_at', 'updated_at', 'status', 'active_from',
            'active_to', 'type', 'budgeted_amount', 'funds_credited', {
              name: 'cashback_promos',
              columns: ['id', 'updated_at', 'created_at', 'amount', 'percentage', {
                name: 'skus',
                columns: ['id', 'updated_at', 'created_at', 'sku_pricing_id', 'offer_id',
                'price', 'quantity', {
                  name: 'sku_pricing',
                  columns: ['id', 'is_active', 'price', 'state_short_name', 'sku_id', {
                    name: 'sku',
                    columns: ['id', 'created_at', 'updated_at', 'brand_id', 'volume',
                      'is_active']
                  }]
                }]
              }]
            }
          ]
        }, {
          name: 'brands',
          columns: ['id', 'created_at', 'updated_at', {
            name: 'brand',
            columns: ['id', 'brand_name', 'short_name', 'is_active', 'description', {
              name: 'skus',
              columns: ['volume', 'updated_at', 'created_at', 'id', 'is_active', {
                name: 'pricings',
                columns: ['id', 'is_active', 'price', 'state_short_name', {
                  name: 'state_short',
                  columns: ['state_name', 'id']
                }, {
                  name: 'cash_back_offers',
                  columns: ['id', 'sku_pricing_id', {
                    name: 'offer',
                    columns: ['id', 'amount', 'percentage', {
                      name: 'campaign',
                      columns: ['id', 'name', 'status', 'active_from', 'active_to']
                    }]
                  }]
                }]
              }],
              where: {
                is_active: true
              }
            }],
          }, {
            name: 'region',
            columns: ['id', 'region_name', 'status', 'created_at', 'updated_at', {
              name: 'cities',
              columns: ['id', 'region_id', 'city_id', {
                name: 'city',
                columns: ['id', 'name', {
                  name: 'state',
                  columns: ['id', 'state_name']
                }]
              }]
            }]
          }],
          where: {
            $and: [{
              brand: {
                is_active: true
              }
            }, {
              brand: {
                skus: {
                  pricings: {
                    cash_back_offers: {
                      offer: {
                        campaign: {
                          status: 'active'
                        }
                      }
                    }
                  }
                }
              }
            }
          ]}
        }],
        // The below will ensure that account who's is_disabled is false.
        'where': {
          $and: [ {
            company: {
              name: companyName
            }
          }, {
            is_disabled: false
          }]
        }
      }
    }
  };
};

const insertCampaignAndPromos = {
  insertCampaign: ({name, status, active_from, active_to,
     funds_credited, budgeted_amount, brand_manager_id}) => {
    return {
      url: dataUrl + '/v1/query',
      query: {
        type: 'insert',
        args: {
          table: 'campaign',
          returning: ['id'],
          objects: [{
            name: name,
            status: status,
            active_from: active_from,
            active_to: active_to,
            type: 'cashback',
            brand_manager_id: brand_manager_id,
            budgeted_amount: budgeted_amount,
            funds_credited: funds_credited,
          }]
        }
      }
    };
  },
  insertPromos: ({campaign_id, promos}) => {
    const bulkInsert = promos.map((promo) => {
      return {
        type: 'insert',
        args: {
          table: 'cash_back_offer',
          returning: ['id'],
          objects: [{
            campaign_id: campaign_id,
            promoName: (promo.promoName),
            service_charge_percentage: (promo.service_type === 'percentage' ? parseFloat(promo.serviceCharge) : null),
            service_charge_flat: (promo.service_type === 'amount' ? parseFloat(promo.serviceCharge) : null),
            amount: (promo.type === 'amount' ? parseFloat(promo.price) : null),
            percentage: (promo.type === 'percentage' ? parseFloat(promo.price) : null)
          }]
        }
      };
    });

    return {
      url: dataUrl + '/v1/query',
      query: {
        type: 'bulk',
        args: bulkInsert
      }
    };
  },
  insertPromosSKUs: ({promos, offers}) => {
    const bulkInsert = promos.map((promo, index) => {
      return {
        type: 'insert',
        args: {
          table: 'cash_back_offer_sku',
          returning: ['id'],
          objects: [{
            sku_pricing_id: promo.pricing.id,
            // better to make bulk inserts in one query TODO: fix this later
            offer_id: offers[index].returning[0].id,
            quantity: (promo.quantity ? parseInt(promo.quantity, 10) : 0)
          }]
        }
      };
    });
    return {
      url: dataUrl + '/v1/query',
      query: {
        type: 'bulk',
        args: bulkInsert
      }
    };
  }
};

export {
  selectCompanies,
  selectBrandManagers,
  insertCampaignAndPromos
};
