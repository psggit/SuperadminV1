import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getUserData} from './KycUploadViewActions';
import TableHeader from './TableHeader';
// import TableHeader from './TableHeader';
// import {editItem, E_ONGOING_REQ} from './EditActions';

class KycUploadProfile extends Component {
  componentDidMount() {
    // this.props.dispatch({type: GET_CONSUMER, data: this.props.params.Id});
    this.props.dispatch(getUserData(parseInt(this.props.params.Id, 10)));
  }
  render() {
    console.log('PRO');
    console.log(this.props);
    const { ongoingRequest, lastError, lastSuccess } = this.props;
    const styles = require('./ViewProfile.scss');
    let getHtml;
    let getHeader = <TableHeader title={'Initial'}/>;
    if (lastError) {
      getHeader = <TableHeader title={'Error'}/>;
      getHtml = (<h4> error </h4>);
    } else if (lastSuccess) {
      getHeader = <TableHeader title={'Consumer: ' + lastSuccess[0].id}/>;
      console.log(lastSuccess);
      getHtml = Object.keys(lastSuccess[0]).map((key) => {
        return (
          <div className={styles.container + ' container-fluid'}>
          <div className="col-md-6">

          <p>
                {key}
          </p>
          </div>
          <div className="col-md-6">
            {lastSuccess[0][key] ? lastSuccess[0][key] : 'undefined'}
          </div>
          </div>
        );
      });
    } else if (ongoingRequest) {
      getHeader = <TableHeader title={'Requesting'}/>;
      getHtml = <h4> requesting </h4>;
    }
    return (
      <div>
        {getHeader}
        <div className="col-md-4">
        <div className={styles.container + ' container-fluid'}>
        <div className="col-md-6">
        <h4>Profile</h4>
        </div>
        </div>
          {getHtml}
        </div>
      </div>
    );
  }
}

KycUploadProfile.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {...state.kycupload};
};

export default connect(mapStateToProps)(KycUploadProfile);
