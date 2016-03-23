import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

class ContentEditable extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
  }
  emitChange(e) {
    // const html = this.getDOMNode().innerHTML;
    const html = ReactDOM.findDOMNode(this);
    const dataId = parseInt(e.target.parentNode.getAttribute('data-id'), 10);
    console.log(e);
    if (this.props.onChange && html.innerHTML !== this.lastNumber) {
      this.props.onChange({
        target: {
          value: html,
          dataId: dataId
        }
      });
    }
    this.lastNumber = html.innerHTML;
  }
  render() {
    return (<div
      onInput={this.emitChange.bind(this)}
      onBlur={this.emitChange.bind(this)}
      contentEditable
      dangerouslySetInnerHTML={{__html: this.props.html}}></div>);
  }
}

ContentEditable.propTypes = {
  onChange: PropTypes.func.isRequired,
  html: PropTypes.string.isRequired
};


const SearchWrapper = ( {data, onDelete, onPriceEdit} ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    return (
          <tr key={index} className={ !dat.is_valid ? styles.inValidEmail : '' } data-id={ dat.id }>
            <td>
              <button className={styles.edit_btn} data-id={dat.id} onClick={onDelete}>
                Delete
              </button>
            </td>
            <td>
              { dat.id}
            </td>
            <td>
              { dat.full_name.length ? dat.full_name : 'Not Found'}
            </td>
            <td>
              { dat.email_id}
            </td>
            <td>
              { dat.transaction_code}
            </td>
            <td data-id={dat.id}>
              <ContentEditable html={ dat.amount } onChange={onPriceEdit} />
            </td>
            <td>
              { dat.batch_number}
            </td>
          </tr>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          Sorry no data to be displayed
        </div>
        );
    }();
  } else {
    objHtml = () => {
      return (
            <table className={'table table-striped'}>
              <thead>
                <tr>
                  <th> </th>
                  <th> ID</th>
                  <th> Name </th>
                  <th> Email ID </th>
                  <th> Transaction Code </th>
                  <th> Amount (In Rs) </th>
                  <th> Batch Number </th>
                </tr>
              </thead>
              <tbody>
                {tableBody}
              </tbody>
            </table>
      );
    }();
  }

  return (
        <div className={styles.list_of_states_wrapper}>
          <label>
            Customers
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
