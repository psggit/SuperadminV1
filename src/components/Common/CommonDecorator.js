/* CommonDecorator performs the following things right now
    1. Resets the state on component unmount
    2. Shows a loading icon when an ajax request is taking place
*/
import Loading from './Loading';
import React, { PropTypes } from 'react';
import { RESET } from './Actions/Actions';

const commonDecorator = ( Component ) => {
  class CommonDec extends React.Component {
    constructor() {
      super();
    }
    componentWillMount() {
      console.log('Decorator Mounted');
    }
    componentWillUnmount() {
      this.props.dispatch( { type: RESET } );
    }
    render() {
      /*  Inline Style Specification for the wrapper assuming 100% of the width and height and float left to cover all the parents area
          Usage hint: Inline styles are specified using camelCase keys
            https://facebook.github.io/react/tips/inline-styles.html
      */
      const styles = {};
      styles.commonComponent = {};
      styles.commonComponent.width = '100%';
      styles.commonComponent.height = '100%';
      styles.commonComponent.float = 'left';
      /* End of It */
      const compHtml = (
        <Component {...this.props} />
      );
      console.log('going requ');
      console.log(this.props.ongoingRequest);
      return (
          <div style={styles.commonComponent} >
            <Loading displayStatus={ this.props.ongoingRequest ? '' : 'hide' } />
            { compHtml }
          </div>
        );
    }
  }
  CommonDec.propTypes = {
    dispatch: PropTypes.func.isRequired,
    ongoingRequest: PropTypes.bool.isRequired
  };
  return CommonDec;
};

export default commonDecorator;
