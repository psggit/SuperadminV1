import React from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
// import ViewTable from './ViewTable';
/*

  componentDidMount:
    //Create async function:
        //Emit fetchData action
        //Fetch the data
          //On success: Emit the successData action
          //On error: Emit the errorData action
*/

const Bills = ({table}) => {
  return (
    <div className="container-fluid">
      <Helmet title="Bills | Hipbar Superadmin" />
      <h3>{table}</h3>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    table: ownProps.params.table
  };
};

export default connect(mapStateToProps)(Bills);
