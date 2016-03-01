import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';

/*

  componentDidMount:
    //Create async function:
        //Emit fetchData action
        //Fetch the data
          //On success: Emit the successData action
          //On error: Emit the errorData action
*/

const TableRouter = ({dataPrefix, location}) => {
  const isDataUrl = (location.indexOf(dataPrefix) === 0);
  if(!(isDataUrl)) {
    return <h3>Invalid url: {location} </h3>;
  }
  const [tableName, action, ...params] = location.slice(dataPrefix.length).split('/').filter((x) => (x != ''));
  return (
    <div className="container-fluid">
      <Helmet title="Bills | Hipbar Superadmin" />
      <h3>Bills:</h3>
      {JSON.stringify(query)}
      <Table schema={schema} rows={rows} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    tableName: ownProps.params.table
  }
};

export default connect(mapStateToProps)(TableRouter);
