import React from 'react';
import { connect } from 'react-redux';
import {LandingBlock} from '../../Common/CommonComponent/LandingBlock';
// import commonDecorator from '../../Common/CommonDecorator';


class invitationStats extends React.Component { // eslint-disable-line no-unused-vars
  render() {
    return (
          <LandingBlock content={{'title': 'Invitation Stats', 'content': [{'name': 'PONGA DA', 'title': 'Adhe Dhaan'}]}} />
           );
  }
}

// const mapStateToProps = (state) => {
//   return {...state};
// };

// const decoratedConnectedComponent = commonDecorator(invitationStats);
export default connect()( invitationStats );
