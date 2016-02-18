const base = 'http://130.211.246.199';
const Endpoints = {
  login: base + '/hauth/login',
  db: base + '/api/1',
  getSchema: base + '/api/1/table',
  schemaChange: base + '/api/1/change',
  getCredentials: base + '/hauth/get_credentials',
  file_upload: 'http://192.168.99.100:8081/upload'
};
const globalCookiePolicy = 'include';

export default Endpoints;
export {globalCookiePolicy};
