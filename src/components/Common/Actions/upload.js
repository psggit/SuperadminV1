/* Function which takes a form data as input, uploads the file and calls
 * SUCCESS/ERROR function */
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
import requestAction from './requestAction';

const uploadFile = (formData, REQUEST_SUCCESS, REQUEST_ERROR) => {
  return (dispatch) => {
    const fileUploadUrl = Endpoints.file_upload;
    // dispatch({ type: MAKE_REQUEST});
    const options = {
      method: 'POST',
      body: formData,
      credentials: globalCookiePolicy
    };
    dispatch(requestAction(fileUploadUrl, options, REQUEST_SUCCESS, REQUEST_ERROR));
    /*
      .then((data) => {
        console.log(data);
        // , REQUEST_SUCCESS, REQUEST_ERROR))
        if ( data.length > 0) {
          dispatch({ type: REQUEST_SUCCESS, data: data});
        } else {
          dispatch({ type: REQUEST_ERROR, data: data});
        }
        dispatch({ type: REQUEST_COMPLETED});
      });
      */
  };
};

export default uploadFile;
