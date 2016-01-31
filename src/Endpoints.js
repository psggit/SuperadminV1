const Endpoints = {
  login: 'http://130.211.255.73/auth/login',
  db: 'http://130.211.255.73/db',
  getSchema: 'http://130.211.255.73/db/table',
  schemaChange: 'http://130.211.255.73/db/change',
  getCredentials: 'http://130.211.255.73/auth/get_credentials'
};
const globalCookiePolicy = 'include';

export default Endpoints;
export {globalCookiePolicy};
