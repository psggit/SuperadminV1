import React from 'react';
import {connect} from 'react-redux';
import {setTableName, removeColumn, setColName, setColType, addCol} from './AddActions';
import {setPk, addPk, removePk, createTable} from './AddActions';


const AddTable = ({columns, primaryKeys, dispatch, ongoingRequest, lastError, lastSuccess}) => { // eslint-disable-line no-unused-vars
  const styles = require('./Table.scss');

  const cols = columns.map((column, i) => {
    let removeIcon;
    if ((i + 1) === columns.length) {
      removeIcon = null;
    } else {
      removeIcon = (<i className="fa-lg fa fa-times" onClick={() => {
        dispatch(removeColumn(i));
      }}></i>);
    }
    return (
      <div key={i} className="form-group">
        <input type="text" className={styles.input + ' form-control'} value={column.name} onChange={(e) => {
          dispatch(setColName(e.target.value, i));
        }}/>
        <select className={styles.select + ' form-control'} onChange={(e) => {
          dispatch(setColType(e.target.value, i));
          if ((i + 1) === columns.length) {
            dispatch(addCol());
          }
        }}>
          {(column.type === '') ? (<option disabled selected>-- type --</option>) : null}
          <option selected={column.type === 'integer'} value="integer">Integer</option>
          <option selected={column.type === 'text'} value="text">Text</option>
          <option selected={column.type === 'numeric'} value="numeric">Numeric</option>
          <option selected={column.type === 'date'} value="date">Date</option>
          <option selected={column.type === 'timestamp'} value="timestamp">Timestamp</option>
          <option selected={column.type === 'date'} value="boolean">Boolean</option>
          <option selected={column.type === 'json'} value="json">JSON</option>
        </select>
        {removeIcon}
      </div>
    );
  });
  const pks = primaryKeys.map((pk, i) => {
    let removeIcon;
    if ((i + 1) === primaryKeys.length) {
      removeIcon = null;
    } else {
      removeIcon = (<i className="fa-lg fa fa-times" onClick={() => {
        dispatch(removePk(i));
      }}></i>);
    }
    return (
      <div key={i} className="form-group">
        <select className={styles.select + ' form-control'} onChange={(e) => {
          dispatch(setPk(e.target.value, i));
          if ((i + 1) === primaryKeys.length) {
            dispatch(addPk());
          }
        }}>
          {(pk === '') ? (<option disabled selected>-- select --</option>) : null}
          {columns.map(({name}) => {
            return (<option selected={(pk === '') ? false : (pk === name)} value={name}>{name}</option>);
          })}
        </select>
        {removeIcon}
      </div>
    );
  });
  let alert = null;
  if (ongoingRequest) {
    alert = (
      <div className="col-md-8">
        <div className="alert alert-warning" role="alert">Creating...</div>
      </div>);
  } else if (lastError) {
    alert = (
      <div className="col-md-8">
        <div className="alert alert-danger" role="alert">Error: {JSON.stringify(lastError)}</div>
      </div>);
  } else if (lastSuccess) {
    alert = (
      <div className="col-md-8">
        <div className="alert alert-success" role="alert">Created! Redirecting...</div>
      </div>);
  }

  return (
      <div className={styles.container + ' container-fluid'}>
        <div className={styles.header}>
          <h3>Add a new table</h3>
          <div className="clearfix"></div>
        </div>
        <br/>
        <div className="container-fluid">
          {alert}
          <div className={styles.addCol + ' col-md-6'}>
            <h4>Table name:</h4>
            <input type="text" className={styles.tableNameInput + ' form-control'} onChange={(e) => {
              dispatch(setTableName(e.target.value));
            }}/>
            <hr/>
            <h4>Columns</h4>
            {cols}
            <hr/>
            <h4>Primary Key:</h4>
            {pks}
            <hr/>
            <button type="submit" className="btn btn-success" onClick={() => {
              dispatch(createTable());
            }}>Create!</button>
          </div>
        </div>
      </div>
  );
};

const mapStateToProps = (state) => {
  return {...state.addTable};
};

export default connect(mapStateToProps)(AddTable);
