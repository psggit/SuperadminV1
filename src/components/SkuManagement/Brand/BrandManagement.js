import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TableHeader from '../../Common/TableHeader';
import BrandCreate from './BrandCreate';

class BrandManagement extends React.Component { // eslint-disable-line no-unused-vars
  componentDidMount() {
    console.log('helloWorld');
    /* Fetching */
  }
  render() {
    const styles = require('./BrandManagement.scss');
    // const { ongoingRequest, lastError, lastSuccess, count} = this.props;
    // const {query} = this.props.location;
    // const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;
    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    return (
        <div className={styles.container}>
          <TableHeader title={'SKU Management/Create Brand'} />
          <BrandCreate />
        </div>
      );
  }
}

BrandManagement.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {...state.sku_data};
};

export default connect(mapStateToProps)(BrandManagement);
