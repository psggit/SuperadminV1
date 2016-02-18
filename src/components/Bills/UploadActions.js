// import Endpoints, {globalCookiePolicy} from '../../Endpoints';
//
/*
*/

const FILE_UPLOAD = 'UploadItem/Upload';

/* ************ reducers *********************** */
const uploadReducer = (a, state, action) => {
  switch (action.type) {
    case FILE_UPLOAD:
      return {state};
    default:
      return state;
  }
};

export default uploadReducer;
export {FILE_UPLOAD};
