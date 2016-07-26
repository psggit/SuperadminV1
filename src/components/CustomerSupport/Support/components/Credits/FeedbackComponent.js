import React from 'react';
import { Link } from 'react-router';

const FeedbackComponent = ( {data, onClickHandler} ) => {
  const styles = require('./FeedbackComponent.scss');
  let objHtml;

  if (Object.keys(data).length > 0) {
    const consumers = data.data.length;
    let totalAmount = 0;
    let invalidCount = 0;
    data.data.forEach((dat) => {
      if (dat.is_valid) {
        totalAmount += parseInt(dat.amount, 10);
      } else {
        invalidCount += 1;
      }
    });
    objHtml = (
          <div className={styles.summary_element}>
            <div className={styles.element}>
              <label> Number of Consumers: </label>
              <span> {consumers} </span>
            </div>
            <div className={styles.element}>
              <label> Total Credits :</label>
              <span> Rs {totalAmount} </span>
            </div>
            <div className={styles.element}>
              <label> Invalid Emails :</label>
              <span> {invalidCount} items </span>
            </div>
          </div>
        );
  } else {
    objHtml = (
          <div className={styles.error_message}>
            Data not available
          </div>
        );
  }
  return (
          <div className={styles.feedback_container}>
            <div className={styles.summary_view}>
              {objHtml}
            </div>
            <div className={styles.buttons}>
              <div className={styles.button}>
                <Link to={"/hadmin/consumer_transactions/add_credits"} >
                  <button className={styles.create_btn} > Cancel </button>
                </Link>
              </div>
              <div className={styles.button}>
                <button className={styles.create_btn} onClick={onClickHandler}> Confirm </button>
              </div>
            </div>
          </div>
      );
};

export default FeedbackComponent;
