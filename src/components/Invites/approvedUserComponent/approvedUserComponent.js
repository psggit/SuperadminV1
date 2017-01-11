import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import commonDecorator from '../../Common/CommonDecorator';
import BreadCrumb from '../../Common/BreadCrumb';
import TableComponent from './TableComponent';

class approvedUserComponent extends Component {
  static propTypes = {
    allApprovedUsers: PropTypes.array.isRequired,
    ongoingRequest: PropTypes.bool.isRequired,
    breadCrumb: PropTypes.array.isRequired
  }
  render() {
    const { allApprovedUsers,
    breadCrumb
    } = this.props;
    return (
      <div>
        <BreadCrumb breadCrumbs={breadCrumb} />
        <TableComponent data={allApprovedUsers} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {...state.invite_data, ongoingRequest: state.page_data.ongoingRequest};
};

const decoratedConnectedComponent = commonDecorator(approvedUserComponent);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);

