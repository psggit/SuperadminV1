import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { makeRequest, RESET } from './Actions';
import Helmet from 'react-helmet';

/* State this guy needs
{
  loginState: {
    ongoingRequest : false, //true if request is going on
    lastError : null OR <string>
    lastSuccess: null OR <string>
  }
}
*/

class FileUpload extends Component {

  componentDidMount() {
    this.props.dispatch({type: RESET});
  }

  render() {
    const {lastError, ongoingRequest, lastSuccess, dispatch, fileUrl} = this.props;
    let loginText = 'Upload File';
    let file;
    if (lastError) {
      console.log(lastError);
      loginText = lastError;
    } else if (lastSuccess) {
      console.log(lastSuccess);
      loginText = 'Submitted!';
    } else if (ongoingRequest) {
      loginText = 'Submitting...';
    }

    return (
      <div className="container" id="login">
        <Helmet title="Upload File| Hipbar Superadmin" />
        <h1> <span style={{color: 'grey'}}>@hipbar</span></h1>
        <hr />
        <form className="form-horizontal" onSubmit={(e) => {
          e.preventDefault();
          dispatch(makeRequest({file: file.files[0]}));
        }}>
          <div className="form-group">
            <div className="col-sm-3">
              <input type="file" ref={(node) => {file = node;}} className="form-control" placeholder="username" />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-6">
              <button type="submit" className="btn btn-success">{loginText}</button>
            </div>
          </div>
        </form>
        {fileUrl ? <div className="alert alert-success" role="alert">
          <span className="glyphicon icon-info"></span>{fileUrl}</div> : null}
      </div>
    );
  }

}

FileUpload.propTypes = {
  fileUrl: PropTypes.string.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {...state.files};
};

export default connect(mapStateToProps)(FileUpload);
