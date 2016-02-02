import React from 'react';
import {connect} from 'react-redux';
import TableHeader from './TableHeader';
import {insertItem} from './DataActions';

const InsertItem = ({tableName, schemas, ongoingRequest, lastError, lastSuccess, dispatch}) => {
  const columns = schemas.find((x) => (x.name === tableName)).columns;
  const refs = {};
  const elements = columns.map((col, i) => {
    return (
      <div key={i} className="form-group">
        <label className="col-sm-2 control-label">{col.name}</label>
        <div className="col-sm-10">
          <input ref={(node) => {refs[col.name] = node;}} type="text" className="form-control" />
        </div>
      </div>);
  });
  const styles = require('./Table.scss');

  let alert = null;
  if (ongoingRequest) {
    alert = (<div className="alert alert-warning" role="alert">Inserting...</div>);
  } else if (lastError) {
    alert = (<div className="alert alert-danger" role="alert">Error: {JSON.stringify(lastError)}</div>);
  } else if (lastSuccess) {
    alert = (<div className="alert alert-success" role="alert">Inserted! <br/> {JSON.stringify(lastSuccess)}</div>);
  }
  return (
    <div className={styles.container + ' container-fluid'}>
        <TableHeader dispatch={dispatch} tableName={tableName} tabName="insert" />
        <br/>
        <div className={styles.insertContainer + ' container-fluid'}>
          <div className="col-md-8">
            <form className="form-horizontal">
              {elements}
              <button type="submit" className="btn btn-success" onClick={(e) => {
                e.preventDefault();
                const inputValues = {};
                Object.keys(refs).map((colName) => {inputValues[colName] = refs[colName].value;});
                dispatch(insertItem(tableName, inputValues));
              }}>Save</button>
            </form>
          </div>
          <div className="col-md-4">
            {alert}
          </div>
        </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {tableName: ownProps.params.table, ...state.tables.insert, schemas: state.tables.allSchemas};
};

export default connect(mapStateToProps)(InsertItem);
