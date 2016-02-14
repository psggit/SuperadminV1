/*
  Use state exactly the way columns in create table do.
  dispatch actions using a given function,
  but don't listen to state.
  derive everything through viewtable as much as possible.
*/
import React from 'react';
import Operators from './Operators';

const renderCols = (colName, tableSchema) => {
  const columns = tableSchema.columns.map(c => c.name);
  return (
    <select className="form-control" value={colName.trim()}>
      {(colName.trim() === '') ? (<option disabled value="">-- select --</option>) : null}
      {columns.map((c, i) => (<option key={i} value={c}>{c}</option>))}
    </select>
  );
};

const renderOps = (opName) => {
  return (
    <select className="form-control" value={opName.trim()}>
      {(opName.trim() === '') ? (<option disabled value="">-- op --</option>) : null}
      {Operators.map((o, i) => (
        <option key={i} value={o.value}>{o.value}</option>
      ))}
    </select>
  );
};
const renderWheres = (whereAnd, tableSchema) => {
  const styles = require('./FilterQuery.scss');
  return whereAnd.map((clause, i) => {
    const colName = Object.keys(clause)[0];
    const opName = Object.keys(clause[colName])[0];
    return (
      <div key={i} className={styles.inputRow + ' row'}>
        <div className="col-md-4">
          {renderCols(colName, tableSchema)}
        </div>
        <div className="col-md-3">
          {renderOps(opName)}
        </div>
        <div className="col-md-4">
          <input className="form-control" value={clause[colName][opName]} />
        </div>
        <div className="text-center col-md-1">
          <i className="fa fa-times"></i>
        </div>
      </div>
    );
  });
};

const renderSorts = (orderBy, tableSchema) => {
  const styles = require('./FilterQuery.scss');
  return (
    orderBy.map((c, i) => {
      return (
        <div key={i} className={styles.inputRow + ' row'}>
          <div className="col-md-6">
            {renderCols(c.column, tableSchema)}
          </div>
          <div className="col-md-5">
            <select value={c.order} className="form-control">
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </div>
          <div className="col-md-1 text-center">
            <i className="fa fa-times"></i>
          </div>
        </div>
      );
    })
  );
};

const FilterQuery = () => {
  const {whereAnd, tableSchema, orderBy, limit, offset} = { // eslint-disable-line no-unused-vars
    whereAnd: [{ ' ': { ' ': ' ' }}],
    tableSchema: { columns: [{name: 'name', type: 'text'}, {name: 'age', type: 'integer'}, {name: 'address', type: 'text'}] },
    orderBy: [{column: '', order: '', nulls: 'last'}],
    limit: 0,
    offset: 10
  };
  const styles = require('./FilterQuery.scss');
  return (
    <div className={styles.filterOptions}>
      <form>
        <div className="row">
          <div className={styles.queryBox + ' col-md-6'}>
            <b className={styles.boxHeading}>Filter</b>
            {renderWheres(whereAnd, tableSchema)}
          </div>
          <div className={styles.queryBox + ' col-md-4'}>
            <b className={styles.boxHeading}>Sort</b>
            {renderSorts(orderBy, tableSchema)}
          </div>
        </div>
        <div className={styles.runQuery + ' row form-inline'}>
          <button type="submit" className="btn btn-success">
            Run query
          </button>
          <div className="input-group">
            <input value="10" type="number" className="form-control" />
            <div className="input-group-addon">rows</div>
          </div>
          <div className="input-group">
            <div className="input-group-addon">Starting from</div>
            <input type="number" className="form-control" value="0" />
          </div>
          <nav>
            <ul className={styles.pagination + ' pagination'}>
              <li>
                <a href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li>
                <a href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </form>
    </div>
  );
};

export default FilterQuery;
