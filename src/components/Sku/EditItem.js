import React from 'react';
import {connect} from 'react-redux';
import TableHeader from './TableHeader';
import {editItem, E_ONGOING_REQ} from './EditActions';

const EditItem = ({tableName, schemas, oldItem, ongoingRequest, lastError, lastSuccess, dispatch}) => {
  const styles = require('./Table.scss');

  const columns = schemas.find((x) => (x.name === tableName)).columns;
  const refs = {};
  const elements = columns.map((col, i) => {
    refs[col.name] = { valueNode: null, nullNode: null, defaultNode: null };
    return (
      <div key={i} className="form-group">
        <label className="col-sm-2 control-label">{col.name}</label>
        <label className={styles.radioLabel + ' radio-inline'}>
          <input type="radio" name={col.name + '-value'} value="option1">
            <input ref={(node) => {refs[col.name].valueNode = node;}} type="text" className="form-control"
              defaultValue={oldItem[col.name]}
              onClick={(e) => {
                e.target.parentNode.click();
                e.target.focus();
              }}/>
          </input>
        </label>
        <label className={styles.radioLabel + ' radio-inline'}>
          <input type="radio" ref={(node) => {refs[col.name].nullNode = node;}}
                 name={col.name + '-value'} value="NULL">
            <span className={styles.radioSpan}>NULL</span>
          </input>
        </label>
        <label className={styles.radioLabel + ' radio-inline'}>
          <input type="radio" ref={(node) => {refs[col.name].defaultNode = node;}}
                 name={col.name + '-value'} value="option3">
            <span className={styles.radioSpan}>Default</span>
          </input>
        </label>
      </div>);
  });

  let alert = null;
  let buttonText = 'Save';
  if (ongoingRequest) {
    alert = (<div className="alert alert-warning" role="alert">Updating...</div>);
    buttonText = 'Saving...';
  } else if (lastError) {
    alert = (<div className="alert alert-danger" role="alert">Error: {JSON.stringify(lastError)}</div>);
  } else if (lastSuccess) {
    alert = (<div className="alert alert-success" role="alert">Updated! <br/> {JSON.stringify(lastSuccess)}</div>);
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
                dispatch({type: E_ONGOING_REQ});
                const inputValues = {};
                Object.keys(refs).map((colName) => {
                  if (refs[colName].nullNode.checked) { // null
                    inputValues[colName] = null;
                  } else if (refs[colName].defaultNode.checked) { // default
                    return;
                  } else {
                    inputValues[colName] = refs[colName].valueNode.value;
                  }
                });
                dispatch(editItem(tableName, inputValues));
              }}>{buttonText}</button>
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
  return {tableName: ownProps.params.table, ...state.tables.update, schemas: state.tables.allSchemas};
};

export default connect(mapStateToProps)(EditItem);
