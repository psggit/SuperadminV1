import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {setTable, vSetDefaults, vMakeRequest, vExpandHeading} from './DataActions'; // eslint-disable-line no-unused-vars
import TableHeader from './TableHeader';
import ViewRow from './ViewRow';
import ViewRows from './ViewRows';
import {findArrayRelInQuery} from './Utils';

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
    const {tableName, schemas, query, rows,  // eslint-disable-line no-unused-vars
           ongoingRequest, lastError, lastSuccess, dispatch} = this.props; // eslint-disable-line no-unused-vars

    const tableSchema = schemas.find((x) => (x.name === tableName));
    const styles = require('./Table.scss');

    // Are there any expanded columns that are also arr_rel
    let finalElement = null;
    let expandedArrayRel = null;
    if ( !(query.columns) || (query.columns.length === 0)) {
      finalElement = null;
    } else {
      [expandedArrayRel] = findArrayRelInQuery(query, tableSchema);
      if (expandedArrayRel) { // view row
        finalElement = (<ViewRow tableName={tableName}
                                schemas={schemas}
                                query={query}
                                path={[]}
                                dispatch={dispatch}
                                row={(rows.length === 0) ? {} : rows[0]} />);
      } else { // view rows
        finalElement = (<ViewRows tableName={tableName}
                                 schemas={schemas}
                                 query={query}
                                 path={[]}
                                 rows={rows}
                                 dispatch={dispatch} />);
      }
    }

    return (
      <div className={styles.container + ' container-fluid'}>
        <TableHeader dispatch={dispatch} tableName={tableName} tabName="view" />
        <div className="container-fluid">
          {finalElement}
        </div>
      </div>
    );
  }
}

ViewTable.propTypes = {
  tableName: PropTypes.string.isRequired,
  schemas: PropTypes.array.isRequired,
  query: PropTypes.object.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  rows: PropTypes.array.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    tableName: ownProps.params.table,
    schemas: state.tables.allSchemas,
    ...state.tables.view
  };
};

export default connect(mapStateToProps)(ViewTable);
