import { globalCookiePolicy } from '../../../Endpoints';

const genOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin'},
  credentials: globalCookiePolicy
};

export {
  genOptions
};
