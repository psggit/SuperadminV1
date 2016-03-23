const base = 'http://130.211.246.199';
// const base = '';
const Endpoints = {
  login: base + '/hauth/login',
  db: base + '/api/1',
  getSchema: base + '/api/1/table',
  getConsumer: base + '/api/1/table/consumer/select',
  schemaChange: base + '/api/1/change',
  getCredentials: base + '/hauth/get_credentials',
  file_upload: 'http://130.211.246.199/file_upload/upload',
  baseUrl: base
};
const globalCookiePolicy = 'include';

export default Endpoints;
export {globalCookiePolicy};
