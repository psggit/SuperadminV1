import React from 'react';
import {vExpandRel, vCloseRel, V_SET_ACTIVE} from './ViewActions';

const ViewRows = ({curTableName, curQuery, curRows, // eslint-disable-line no-unused-vars
                    curPath, parentTableName, curDepth, // eslint-disable-line no-unused-vars
                    activePath, schemas, dispatch, // eslint-disable-line no-unused-vars
                    ongoingRequest, lastError, lastSuccess}) => { // eslint-disable-line no-unused-vars
  const styles = require('./Table.scss');
  const tableSchema = schemas.find(x => x.name === curTableName);
  const parentTableSchema = parentTableName ? schemas.find(t => t.name === parentTableName) : null;
  const curRelName = (curPath.length > 0) ? curPath.slice(-1)[0] : null;

  // Am I a single row display
  let isSingleRow = false;
  if (curQuery.columns.find(c => typeof(c) === 'object')) { // Do I have any children
    isSingleRow = true;
  } else {
    if (curRelName && parentTableSchema) { // Am I an obj_rel for my parent?
      if (parentTableSchema.relationships.find(r => r.name === curRelName && r.type === 'obj_rel')) {
        isSingleRow = true;
      }
    }
  }

  // Get the headings
  const tableHeadings = [];
  tableSchema.columns.map((column, i) => {
    tableHeadings.push(<th key={i}>{column.name}</th>);
  });
  tableHeadings.push(<th style={{minWidth: 'auto', color: '#aaa', fontWeight: 300}}> &lt;&gt; </th>);
  tableSchema.relationships.map((r, i) => {
    tableHeadings.push(<th key={tableSchema.columns.length + i}>{r.name}</th>);
  });

  // Get the rows
  const tableRows = curRows.map((row, i) => {
    const pkClause = {};
    tableSchema.primary_key.map((pk) => {
      pkClause[pk] = row[pk];
    });
    return (
      <tr key={i}>
        {isSingleRow ? null : (<td><input type="checkbox"></input></td>)}
        {isSingleRow ? null : (<td><button className="btn btn-xs btn-default">Edit</button></td>)}
        {tableSchema.columns.map((column, j) => {
          return <td key={j}>{row[column.name]}</td>;
        })}
        {<td></td>}
        {tableSchema.relationships.map((r, k) => {
          if (curQuery.columns.find(c => c.name === r.name)) { // already expanded
            return (
              <td key={tableSchema.columns.length + k}><a href="#" className={styles.expanded} onClick={(e) => {
                e.preventDefault();
                dispatch(vCloseRel(curPath, r.name));
              }}>Close</a></td>
            );
          }
          // can be expanded
          return (
            <td key={tableSchema.columns.length + k}><a href="#" onClick={(e) => {
              e.preventDefault();
              dispatch(vExpandRel(curPath, r.name, pkClause));
            }}>View</a></td>
          );
        })}
      </tr>);
  });

  // Filter component
  const filterComponent = null;
  // if current path thing is obj_rel show null, else render the query filter component

  // If query object has expanded columns
  let childComponent = null;
  const childQueries = [];
  curQuery.columns.map((c) => {
    if (typeof (c) === 'object') {
      childQueries.push(c);
    }
  });
  let childTabs = null;
  childTabs = childQueries.map((q, i) => {
    const isActive = (q.name === activePath[curDepth + 1]) ? 'active' : null;
    let appender = '';
    for (let ij = 0; ij < (curDepth + 1); ij++) {
      appender += '>';
    }
    return (
      <li key={i} className={isActive} role="presentation">
        <a href="#" onClick={(e) => {
          e.preventDefault();
          dispatch({type: V_SET_ACTIVE, path: curPath, relname: q.name});
        }}>{appender + ' ' + q.name}</a>
      </li>);
  });
  let childViewRows = null;
  childViewRows = childQueries.map((cq) => {
    // Render child only if data is available
    if (curRows[0][cq.name]) {
      const rel = tableSchema.relationships.find((r) => r.name === cq.name);
      let childRows = curRows[0][cq.name];
      if (rel.type === 'obj_rel') {
        childRows = [childRows];
      }
      return (
        <ViewRows curTableName={rel.rtable}
          curQuery={cq}
          curPath={[...curPath, rel.name]}
          curRows={childRows}
          parentTableName={curTableName}
          activePath={activePath}
          ongoingRequest={ongoingRequest}
          lastError={lastError}
          lastSuccess={lastSuccess}
          schemas={schemas}
          curDepth={curDepth + 1}
          dispatch={dispatch} />
      );
    }
    return null;
  });
  if (childQueries.length > 0) {
    childComponent = (
      <div>
        <ul className="nav nav-tabs">
          {childTabs}
        </ul>
        {childViewRows}
      </div>
    );
  }

  // Is this ViewRows visible
  let isVisible = false;
  if (!(curRelName)) {
    isVisible = true;
  } else if (curRelName === activePath[curDepth]) {
    isVisible = true;
  }

  return (
    <div className={(isVisible ? '' : 'hide ') + 'container-fluid ' + styles.viewRowsContainer}>
      <div className={styles.filterOptions}>
        {filterComponent}
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table + ' table table-bordered table-striped table-hover'}>
          <thead>
            <tr>
              {isSingleRow ? null : (<th style={{minWidth: 'auto'}}>
                <input type="checkbox"></input>
              </th>)}
              {isSingleRow ? null : (<th style={{minWidth: 'auto'}}>
                <button className="disabled btn btn-primary btn-xs">Delete</button>
              </th>)}
              {tableHeadings}
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
      <br/><br/>
      {childComponent}
    </div>
  );
};

export default ViewRows;
