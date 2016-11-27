import { dataUrl } from '../../../Endpoints';

const selectBrandManagers = {
  url: dataUrl + '/v1/query',
  query: {
    type: 'select',
    args: {
      table: 'brand_manager',
      columns: ['email', 'name', {
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
        is_disabled: false
      }
    }
  }
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
        url: dataUrl + '/v1/query',
        query: {
          type: 'insert',
          args: {
            table: 'cash_back_offer',
            returning: ['id'],
            objects: [{
              campaign_id: campaign_id,
              amount: (promo.type === 'amount' ? promo.amount : null),
              percentage: (promo.type === 'percentage' ? promo.amount : null)
            }]
          }
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
        url: dataUrl + '/v1/query',
        query: {
          type: 'insert',
          args: {
            table: 'cash_back_offer',
            returning: ['id'],
            objects: [{
              sku_pricing_id: promos.pricing.id,
              offer_id: offers[index].id,
              quantity: promo.quantity
            }]
          }
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
  selectBrandManagers,
  insertCampaignAndPromos
};