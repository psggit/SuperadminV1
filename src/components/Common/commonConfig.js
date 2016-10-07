
import { globalCookiePolicy } from '../../Endpoints';

const genOpt = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin'},
  credentials: globalCookiePolicy
};

export {
  genOpt
};
