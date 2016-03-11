const base = 'http://130.211.246.199';
const Endpoints = {
  login: base + '/hauth/login',
  db: base + '/api/1',
  getSchema: base + '/api/1/table',
  getConsumer: base + '/api/1/table/consumer/select',
  schemaChange: base + '/api/1/change',
  getCredentials: base + '/hauth/get_credentials',
  file_upload: 'http://130.211.246.199:30181/file_upload/upload'
};
const globalCookiePolicy = 'include';

export default Endpoints;
export {globalCookiePolicy};
