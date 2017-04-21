import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import NotepadEntries from './NotepadEntries';
import { fetchNotepad } from './NotepadAction';

import BreadCrumb from '../Common/BreadCrumb';

class Notepad extends React.Component { // eslint-disable-line no-unused-vars
  constructor(props) {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Bar Management',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Profile',
      sequence: 2,
      link: '/hadmin/bar_management/view_bars'
    });
    this.breadCrumbs.push({
      title: props.params.Id,
      sequence: 3,
      link: '/hadmin/bar_management/edit_bar/' + props.params.Id
    });
    this.breadCrumbs.push({
      title: 'Notepad Entries',
      sequence: 4,
      link: '#'
    });
  }
  componentWillMount() {
    /* Fetch the corresponding data */
    const userId = parseInt(this.props.params.Id, 10);
    this.props.dispatch(fetchNotepad(userId));
  }
  render() {
    const styles = require('./NotepadEntries.scss');
    // const { ongoingRequest, lastError, lastSuccess, count} = this.props;
    const { lastSuccess } = this.props;
    const {Id: userId} = this.props.params;
    // const {query} = this.props.location;
    // const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;
    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    return (
        <div className={styles.container}>
          <BreadCrumb breadCrumbs={this.breadCrumbs} />
          <NotepadEntries userId={userId} data={lastSuccess}/>
        </div>
      );
  }
}

Notepad.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {...state.page_data};
};

export default connect(mapStateToProps)(Notepad);
