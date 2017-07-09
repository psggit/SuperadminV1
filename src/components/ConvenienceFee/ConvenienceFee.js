import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchState, insertConvenienceFee } from './ConvenienceFeeActions';
import commonDecorator from '../Common/CommonDecorator';
import BreadCrumb from '../Common/BreadCrumb';

/* Components */
import ConvenienceFeeInfo from './ConvenienceFeeInfo';

class CreateConvenienceFee extends Component { // eslint-disable-line no-unused-vars
  constructor() {
    super();
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Convenience Fee',
      sequence: 1,
      link: '#' // TODO
    });
    this.breadCrumbs.push({
      title: 'Create',
      sequence: 2,
      link: '#' // TODO
    });
  }
  componentWillMount() {
    Promise.all([
      this.props.dispatch(fetchState())
    ]);
  }
  componentWillUnmount() {
  }
  onClickSave() {
    Promise.all([
      this.props.dispatch(insertConvenienceFee())
    ]);
  }
  render() {
    const styles = require('./ConvenienceFee.scss');
    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className={styles.brand_wrapper}>
          <ConvenienceFeeInfo data={this.props.detail} dispatch={this.props.dispatch} statesAll={this.props.statesAll}/>
          <div className="clearfix"></div>
          <div className="clearfix"></div>
          <button className={( this.props.ongoingRequest ? 'hide ' + styles.edit_brand_btn : styles.edit_brand_btn) } onClick={this.onClickSave.bind(this)}>
            Save
          </button>
        </div>
      </div>
    );
  }
}

CreateConvenienceFee.propTypes = {
  statesAll: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.object.isRequired,
  detail: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {...state.convenienceFeeState};
};

const decoratedConnectedComponent = commonDecorator(CreateConvenienceFee);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
