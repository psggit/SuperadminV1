import fetch from 'isomorphic-fetch';

const requestAction = (url, options, SUCCESS, ERROR) => {
  if (!(options.credentials)) {
    options.credentials = 'include';
  }
  const p1 = new Promise( (resolve, reject) => {
    fetch( url, options).then(
      (response) => {
        if (response.ok) {
          return response.json().then((results) => {
            // completeReq(dispatch);
            if (SUCCESS) {
              resolve(results);
            }
            resolve(results);
          });
        }
        if (response.status >= 400 && response.status < 500) {
          return response.json().then((errorMsg) => {
            if (ERROR) {
              reject(ERROR);
            }
            reject(errorMsg);
          });
        }
        if (ERROR) {
          reject(ERROR);
        }
        reject();
      },
      (error) => {
        reject(error);
      }
    );
  });
  return p1;
};

export default requestAction;
