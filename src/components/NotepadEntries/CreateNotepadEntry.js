import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import TableHeader from '../Common/TableHeader';
import { fetchIssueTypes, insertNotepad } from './NotepadAction';

class CreateNotepadEntry extends Component { // eslint-disable-line no-unused-vars
  componentWillMount() {
    this.props.dispatch(fetchIssueTypes());
  }
  createNotepadEntry() {
    let issueId = document.querySelectorAll('[data-field-name="issue_id"] option:checked')[0].getAttribute('data-issue-id');
    const description = document.querySelectorAll('[data-field-name="description"] textarea')[0].value;
    let { Id: userId } = this.props.params;
    userId = parseInt(userId, 10);
    issueId = parseInt(issueId, 10);
    this.props.dispatch(insertNotepad(issueId, description, userId));
  }
  render() {
    const styles = require('./CreateNotepadEntry.scss');
    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    /* Render the select options */
    const { lastSuccess, ongoingRequest } = this.props;
    const { Id: userId } = this.props.params;

    const issueTypes = lastSuccess.map((issue, index) => {
      return (
            <option key={index} data-issue-id={issue.id}>{issue.code}</option>
          );
    });
    return (
      <div className={styles.container}>
        <TableHeader title={'Customer Management/Profile/' + userId + '/Create Notepad Entry'} />
        <div className={styles.create_notepad_container}>
          <label className={styles.heading}>Create Notepad Entry</label>
          <div className={styles.create_form}>
            <div className={styles.indiv_element + ' ' + styles.wd_100}>
              <label>Issue Code</label>
              <select data-field-name="issue_id">
                {issueTypes}
              </select>
            </div>
            <div className={styles.indiv_element + ' ' + styles.wd_100} data-field-name="description">
              <label>Comment</label>
              <textarea rows="4" cols="40"></textarea>
            </div>
            <button className={styles.create_btn} onClick={ this.createNotepadEntry.bind(this) } disabled={ ongoingRequest ? true : false }>Create</button>
          </div>
        </div>
      </div>);
  }
}

CreateNotepadEntry.propTypes = {
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

export default connect(mapStateToProps)(CreateNotepadEntry);
