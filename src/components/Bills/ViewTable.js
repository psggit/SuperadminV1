import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {setTable, vSetDefaults, vMakeRequest, vExpandHeading} from './DataActions';

const genHeadings = (headings) => {
  if (headings.length === 0) {
    return [];
  }

  const heading = headings[0];
  if (typeof(heading) === 'string') {
    return [heading,
            ...(genHeadings(headings.slice(1)))];
  }
  if (typeof(heading) === 'object') {
    if (!(heading._expanded)) {
      const headingName = (heading.type === 'obj_rel') ? heading.lcol : heading.relname;
      return [{name: headingName, type: heading.type},
              ...(genHeadings(headings.slice(1)))];
    }
    if (heading.type === 'obj_rel') {
      const subheadings = genHeadings(heading.headings).map((h) => {
        if (typeof(h) === 'string') {
          return (heading.relname + '.' + h);
        }
        return (heading.relname + '.' + h.name);
      });
      return [...subheadings,
              ...(genHeadings(headings.slice(1)))];
    }
  }

  console.log(heading);
  throw 'Incomplete pattern match'; // eslint-disable-line no-throw-literal
};

const genRow = (row, headings) => {
  if (headings.length === 0) {
    return [];
  }

  const heading = headings[0];
  if (typeof(heading) === 'string') {
    return [row[heading],
            ...(genRow(row, headings.slice(1)))];
  }
  if (typeof(heading) === 'object') {
    if (!(heading._expanded)) {
      const rowVal = (heading.type === 'obj_rel') ? row[heading.lcol] : '[...]';
      return [rowVal,
              ...(genRow(row, headings.slice(1)))];
    }
    if (heading.type === 'obj_rel') {
      const subrow = genRow(row[heading.relname], heading.headings);
      return [...subrow,
              ...(genRow(row, headings.slice(1)))];
    }
  }

  console.log(heading);
  throw 'Incomplete pattern match'; // eslint-disable-line no-throw-literal
};

class ViewTable extends Component {
  componentDidMount() {
    // Initialize this table
    const dispatch = this.props.dispatch;
    dispatch(setTable(this.props.tableName));
    dispatch(vSetDefaults(this.props.tableName));
    dispatch(vMakeRequest());
  }

  componentWillReceiveProps(nextProps) {
    const dispatch = this.props.dispatch;
    if (nextProps.tableName !== this.props.tableName) {
      dispatch(setTable(nextProps.tableName));
      dispatch(vSetDefaults(nextProps.tableName));
      dispatch(vMakeRequest());
    }
  }

  render() {
    const {tableName, headings, query, rows,  // eslint-disable-line no-unused-vars
           ongoingRequest, lastError, lastSuccess, dispatch} = this.props; // eslint-disable-line no-unused-vars

    const styles = require('./Table.scss');

    const allHeadings = genHeadings(headings);
    const tableHeadings = allHeadings.map((heading, i) => {
      if (typeof(heading) === 'object') {
        return (
          <th className={styles.expandable} key={i} onClick={() => {
            dispatch(vExpandHeading(heading.name));
          }}>
            {heading.name} &rarr;
          </th>);
      }
      return <th key={i}>{heading}</th>;
    });

    const tableRows = rows.map((row, i) => (
      <tr key={i}>
        {genRow(row, headings).map((datum, j) => {
          return <td key={j}>{datum}</td>;
        })}
      </tr>));

    return (
      <div className={styles.container + ' container-fluid'}>
        <div className={styles.header}>
          <h3>{tableName}</h3>
          <div className="clearfix"></div>
        </div>
        <div className="container-fluid">
          <div className={styles.filterOptions}>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table + ' table table-bordered table-striped'}>
              <thead>
                <tr>
                  {tableHeadings}
                </tr>
              </thead>
              <tbody>
                {tableRows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

ViewTable.propTypes = {
  tableName: PropTypes.string.isRequired,
  headings: PropTypes.array.isRequired,
  query: PropTypes.object.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  rows: PropTypes.array.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {tableName: ownProps.params.table, ...state.tables.view};
};

export default connect(mapStateToProps)(ViewTable);
