import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const NotepadEntries = ({data, userId}) => { // eslint-disable-line no-unused-vars
  const styles = require('./NotepadEntries.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  const notepadHtml = data.map((dat, index) => {
    let createdAt = dat.created_at;
    let updatedAt = dat.updated_at;

    createdAt = new Date(new Date(createdAt).getTime()).toLocaleString('en-GB');
    updatedAt = new Date(new Date(updatedAt).getTime()).toLocaleString('en-GB');
    return (
          <div key={index} className={styles.indiv_item + ' ' + styles.wd_100}>
            <div className={styles.header + ' ' + styles.wd_100}>
              <label>Notepad ID: <span>{dat.id}</span></label>
              <label>Updated At: <span>{createdAt}</span></label>
              <label>Created At: <span>{updatedAt}</span></label>
            </div>
            <div className={styles.item_info + ' ' + styles.wd_100}>
              <ul>
                <li>
                  <label>Retailer ID</label>
                  <p>{dat.retailer_id}</p>
                </li>
                <li>
                  <label>Maker ID</label>
                  <p>{dat.created_by}</p>
                </li>
                <li>
                  <label>Issue Code</label>
                  <p>{dat.issue ? dat.issue.code : 'N/A'}</p>
                </li>
                <li>
                  <label>Notepad Issue Description</label>
                  <p>{dat.issue ? dat.issue.description : 'N/A'}</p>
                </li>
                <li>
                  <label>Comment</label>
                  <p>{dat.description}</p>
                </li>
              </ul>
            </div>
          </div>
        );
  });
  const htmlContent = (dat) => {
    return (dat.length) ? (
        <div className={styles.notepad_entries_container}>
          <label className={styles.total_item_lab}>Total Items: <span>{dat.length}</span></label>
          { notepadHtml }
        </div>
      ) : (
          <div className={styles.error_message}>
            Sorry no notepad entries yet
          </div>
        );
  };

  const htmlCont = htmlContent(data);

  return (
    <div className={styles.container}>
      <div className={styles.notepad_container}>
        <Link to={'/hadmin/retailer/profile/' + userId + '/create_notepad_entry'}>
          <button className={styles.create_btn}>Create</button>
        </Link>
        {htmlCont}
      </div>
    </div>);
};

export default connect()(NotepadEntries);
