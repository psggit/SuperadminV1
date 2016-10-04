// const base = 'http://130.211.246.199';
const dataUrl = 'https://data.hipbar-stg.hasura-app.io';
const authUrl = 'https://auth.hipbar-stg.hasura-app.io';
// const base = '';
const Endpoints = {
  login: authUrl + '/login',
  db: dataUrl + '/api/1',
  getSchema: dataUrl + '/api/1/table',
  getConsumer: dataUrl + '/api/1/table/consumer/select',
  schemaChange: dataUrl + '/api/1/change',
  getCredentials: authUrl + '/user/account/info',
  file_upload: dataUrl + '/file_upload/upload',
  file_get: dataUrl + '/file_upload/get?fs_url=',
  integrations_dataUrl: 'http://localhost:5000',
  baseUrl: dataUrl
};
const globalCookiePolicy = 'include';

export default Endpoints;
export {globalCookiePolicy};
