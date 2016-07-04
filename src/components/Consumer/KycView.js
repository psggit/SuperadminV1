import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getUserData} from './KycViewActions';
import TableHeader from './TableHeader';
// import TableHeader from './TableHeader';
// import {editItem, E_ONGOING_REQ} from './EditActions';

class KycViewProfile extends Component {
  componentDidMount() {
    // this.props.dispatch({type: GET_CONSUMER, data: this.props.params.Id});
    // this.props.dispatch(getUserData(parseInt(this.props.params.Id, 10)));
  }
  render() {
    const { ongoingRequest, lastError, lastSuccess } = this.props;
    // const styles = require('./ViewState.scss');
    let getHtml;
    let getHeader = <TableHeader title={'Initial'}/>;
    if (lastError) {
      getHeader = <TableHeader title={'Error'}/>;
      getHtml = (<h4> error </h4>);
    } else if (lastSuccess) {
      getHeader = <TableHeader title={'Consumer: ' + lastSuccess[0].id}/>;
      // console.log('This is Masochism');
      console.log(lastSuccess);
      getHtml = Object.keys(lastSuccess[0]).map((key) => {
        return (
              <div>
                <div className="col-md-6">
                {key}
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
          {getHtml}
        </div>
      </div>
    );
  }
}

KycViewProfile.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {...state.kycviewprofile};
};

export default connect(mapStateToProps)(KycViewProfile);
