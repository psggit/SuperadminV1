import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {vSetDefaults, vMakeRequest, vExpandHeading} from './ViewActions'; // eslint-disable-line no-unused-vars
import {setTable} from './DataActions';
import TableHeader from './TableHeader';
import ViewRows from './ViewRows';
// import uPloadFile from './Upload';

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

class ViewKyc extends Component {
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

  shouldComponentUpdate(nextProps) {
    return (this.props.tableName === null || nextProps.tableName === this.props.tableName);
  }

  componentWillUpdate() {
    this.shouldScrollBottom = (window.innerHeight === document.body.offsetHeight - document.body.scrollTop);
  }

  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      document.body.scrollTop = document.body.offsetHeight - window.innerHeight;
    }
  }


  render() {
    const {tableName, schemas, query, curFilter, rows,  // eslint-disable-line no-unused-vars
           activePath, ongoingRequest, lastError, lastSuccess, dispatch} = this.props; // eslint-disable-line no-unused-vars

    const styles = require('./Table.scss');

    // Are there any expanded columns
    const viewRows = (<ViewRows curTableName={tableName}
                             curQuery={query}
                             curFilter={curFilter}
                             curPath={[]}
                             curRows={rows}
                             parentTableName={null}
                             activePath={activePath}
                             ongoingRequest={ongoingRequest}
                             lastError={lastError}
                             lastSuccess={lastSuccess}
                             schemas={schemas}
                             curDepth={0}
                             dispatch={dispatch} />);
    const tableHeader = (<TableHeader title={"Consumer Profile"} />);

    // const uploadImage = uPloadFile(dispatch);
    // {uploadImage}
    // <TableHeader dispatch={dispatch} title = {"Consumer Profile"}/>
    return (
      <div className={styles.container + ' container-fluid'}>
        { tableHeader }
        <div className="container-fluid">
          {viewRows}
        </div>
      </div>
    );
  }
}

ViewKyc.propTypes = {
  tableName: PropTypes.string.isRequired,
  schemas: PropTypes.array.isRequired,
  activePath: PropTypes.array.isRequired,
  query: PropTypes.object.isRequired,
  curFilter: PropTypes.object.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  rows: PropTypes.array.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    tableName: 'consumer',
    schemas: state.tables.allSchemas,
    ...state.tables.view
  };
};

export default connect(mapStateToProps)(ViewKyc);
