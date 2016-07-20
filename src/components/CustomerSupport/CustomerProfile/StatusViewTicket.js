import React from 'react';
const StatusViewTicket = ( { label, status, val } ) => {
  const styles = require('./StatusViewTicket.scss');
  return (
    <div className = {styles.statusview_ticket_information}>
      <div className = {styles.statusview_ticket_leftpanel}>
        <div className = {styles.statusview_ticket_content}>
          {label}
        </div>
        <div className = {styles.statusview_ticket_status}>
          {status}
        </div>
      </div>
      <div className = {styles.statusview_ticket_rightpanel}>
        {val}
      </div>
    </div>
  );
};
export default StatusViewTicket;
