const base = 'http://130.211.246.199';
// const base = 'http://104.155.192.64';
// const base = '';
const Endpoints = {
  login: base + '/hauth/login',
  db: base + '/api/1',
  getSchema: base + '/api/1/table',
  getConsumer: base + '/api/1/table/consumer/select',
  schemaChange: base + '/api/1/change',
  getCredentials: base + '/hauth/get_credentials',
  file_upload: base + '/file_upload/upload',
  file_get: base + '/file_upload/get?fs_url=',
  integrations_base: 'http://localhost:5000',
  baseUrl: base
};
const globalCookiePolicy = 'include';

export default Endpoints;
export {globalCookiePolicy};
