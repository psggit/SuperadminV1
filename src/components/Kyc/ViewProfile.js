import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getUserData} from './ProfileActions';
import TableHeader from './TableHeader';
// import TableHeader from './TableHeader';
// import {editItem, E_ONGOING_REQ} from './EditActions';

class ViewConsumerProfile extends Component {
  componentDidMount() {
    // this.props.dispatch({type: GET_CONSUMER, data: this.props.params.Id});
    this.props.dispatch(getUserData(parseInt(this.props.params.Id, 10)));
  }
  render() {
      const styles = require('./Table.scss');
      const reservationHtml = () => {
        return (
          <button className="btn btn-default btn-xs" onClick={() =>{
            // this.props.dispatch(getSecondaryData(arr));
          }}> View All </button>
        );
      };
      const funcMap = {
        'reservations': reservationHtml
      };
      const { ongoingRequest, lastError, lastSuccess } = this.props;
      const valueComponent = (obj, key) => {
        if (funcMap.hasOwnProperty(key)) {
          return funcMap[key]();
        }
        return (
            <div className="col-md-6">
                {obj[key] ? obj[key] : 'N/A'}
            </div>
        );
      };
      const objToHtml = (obj) => {
        return (
          Object.keys(obj).map((key) => {
            return (
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  {key}:
                </div>
                <div className={styles.wd_70} >
                  {valueComponent(obj, key)}
                </div>
              </div>
            );
          })
        );
      };
    // const styles = require('./ViewProfile.scss');
   const { ongoingRequest, lastError, lastSuccess } = this.props;
    // const styles = require('./ViewState.scss');
    let getHtml;
    let getHeader = <TableHeader title={'Initial'}/>;
    if (lastError) {
      getHeader = <TableHeader title={'Error'}/>;
      getHtml = (<h4> error </h4>);
    } else if (lastSuccess) {
      getHeader = <TableHeader title={'Consumer: ' + lastSuccess[0].id}/>;
      console.log(lastSuccess);
      getHtml = Object.keys(lastSuccess[0]).map((key) => {
        return (
          <div className={styles.container + ' container-fluid'}>
              <div className="col-md-6">
                <div className={styles.squarecontent}>
                {key}
                </div>
                <div className="col-md-6">
                {lastSuccess[0][key] ? lastSuccess[0][key] : 'undefined'}
                </div>
              </div>
          </div>        );
      });
    } else if (ongoingRequest) {
      getHeader = <TableHeader title={'Requesting'}/>;
      getHtml = <h4> requesting </h4>;
    }
    return (
      <div className={styles.profile_wrapper}>
        {getHeader}
        <div className={styles.white_width}>
        </div>
        <div className={styles.profile_view_wrapper}>
            <div className={styles.profile_view_left}>
                <p className={styles.profile_view_header}>
                    Account Details
                </p>
                {getHtml}
            </div>
            <div className={styles.profile_view_right}>
            </div>
        </div>
        <div className={styles.profile_actions}>
            <div className={styles.profile_action_button}>
                <button className="form-control" id="edit">
                    Edit User
                </button>
            </div>
            <div className={styles.profile_action_button}>
                <button className="form-control" id="reset_pin">
                    Reset Pin
                </button>
            </div>
            <div className={styles.profile_action_button}>
                <button className="form-control" id="reset_password">
                    Reset Password
                </button>
            </div>
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

ViewConsumerProfile.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {...state.kycviewprofile};
};

export default connect(mapStateToProps)(ViewConsumerProfile);
