import { dataUrl } from '../../../Endpoints';

const deliveryConstraints = {
  insertConstraints: (cityId) => {
    return {
      url: dataUrl + '/v1/query',
      query: {
        type: 'bulk',
        args: [
          {
            type: 'update',
            args: {
              table: 'city',
              returning: ['id'],
              where: {'id': {'$eq': cityId}},
              $set: {'deliverable_city': true}
            }
          }, {
            type: 'insert',
            args: {
              table: 'delivery_constraints',
              returning: ['id'],
              objects: [{
                city_id: cityId,
                max_outlet_distance: 20,
                max_dp_distance: 5,
                delivery_charge: 100,
                cancellation_charge_before_pickup: 100,
                cancellation_charge_after_pickup: 100,
                delivery_accept_before: 60,
                delivery_available: true,
                dp_pool_length: 5,
                max_est_del_time: 90,
                dp_waiting_time: 10
              }]
            }
          }, {
            type: 'insert',
            args: {
              table: 'delivery_time',
              returning: ['id'],
              objects: [{
                city_id: cityId,
                weekday_id: 1,
                start_time: '10:00:00+05:30',
                end_time: '22:00:00+05:30',
                is_active: false
              },
                {
                  city_id: cityId,
                  weekday_id: 2,
                  start_time: '10:00:00+05:30',
                  end_time: '22:00:00+05:30',
                  is_active: false
                },
                {
                  city_id: cityId,
                  weekday_id: 3,
                  start_time: '10:00:00+05:30',
                  end_time: '22:00:00+05:30',
                  is_active: false
                },
                {
                  city_id: cityId,
                  weekday_id: 4,
                  start_time: '10:00:00+05:30',
                  end_time: '22:00:00+05:30',
                  is_active: false
                },
                {
                  city_id: cityId,
                  weekday_id: 5,
                  start_time: '10:00:00+05:30',
                  end_time: '22:00:00+05:30',
                  is_active: false
                },
                {
                  city_id: cityId,
                  weekday_id: 6,
                  start_time: '10:00:00+05:30',
                  end_time: '22:00:00+05:30',
                  is_active: false
                },
                {
                  city_id: cityId,
                  weekday_id: 7,
                  start_time: '10:00:00+05:30',
                  end_time: '22:00:00+05:30',
                  is_active: false
                }
              ]
            }
          }]
      }
    };
  },
  updateCity: (cityId, deliveryStatus) => {
    return {
      url: dataUrl + '/v1/query',
      query: {
        type: 'bulk',
        args: [{
          type: 'update',
          args: {
            table: 'city',
            returning: ['id'],
            where: { 'id': {'$eq': cityId}},
            $set: {'deliverable_city': deliveryStatus}
          }
        }]
      }
    };
  }
};

export {
  deliveryConstraints
};
