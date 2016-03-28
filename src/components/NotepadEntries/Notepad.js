import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TableHeader from '../Common/TableHeader';
import NotepadEntries from './NotepadEntries';
import { fetchNotepad } from './NotepadAction';

class Notepad extends React.Component { // eslint-disable-line no-unused-vars
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
          <TableHeader title={'Consumer Management/Profile/' + this.props.params.Id + '/NotepadEntries'} />
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
