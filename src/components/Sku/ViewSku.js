import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getSkuData} from './SkuActions';
import TableHeader from './TableHeader';
// import TableHeader from './TableHeader';
// import {editItem, E_ONGOING_REQ} from './EditActions';

class ViewSku extends Component {
  componentDidMount() {
    // this.props.dispatch({type: GET_CONSUMER, data: this.props.params.Id});
    this.props.dispatch(getSkuData(parseInt(this.props.params.Id, 10)));
  }
  render() {
    const { ongoingRequest, lastError, lastSuccess } = this.props;
    // const styles = require('./ViewSku.scss');
    let getHtml;
    let getHeader = <TableHeader title={'MeeehhhHH'}/>;
    if (lastError) {
      getHeader = <TableHeader title={'Error'}/>;
      getHtml = (<h4> error </h4>);
    } else if (lastSuccess) {
      getHeader = <TableHeader title={'Sku: ' + lastSuccess[0].brand_name}/>;
      console.log(lastSuccess);
      getHtml = Object.keys(lastSuccess[0]).map((key) => {
        return (
              <div>
                <div className="col-md-6">
                {key}
                </div>
                <div className="col-md-6">
                {lastSuccess[0][key] ? lastSuccess[0][key] : 'undefined'}
                </div>
              </div>
        );
      });
    } else if (ongoingRequest) {
      getHeader = <TableHeader title={'Requesting'}/>;
      getHtml = <h4> requesting </h4>;
    }
    return (
      <div>
        {getHeader}
        <div className="col-md-4">
          {getHtml}
        </div>
      </div>
    );
  }
}


/*
const EditItem = ({tableName, schemas, oldItem, ongoingRequest, lastError, lastSuccess, dispatch}) => {
  componentDidMount() {
    const id = this.props.params.Id;
  }
  const styles = require('./Table.scss');

  const columns = schemas.find((x) => (x.name === tableName)).columns;
  const refs = {};
  const elements = columns.map((col, i) => {
    refs[col.name] = { valueNode: null, nullNode: null, defaultNode: null };
    return (
      <h1> {id} </h1>
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
*/

ViewSku.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {...state.sku};
};

export default connect(mapStateToProps)(ViewSku);
