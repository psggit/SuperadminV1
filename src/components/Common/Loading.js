import React from 'react';

const Loading = ({ displayStatus }) => {
  const styles = require('./Loading.scss');
  return (
        <div className={ styles.loading_wrapper + ' ' + displayStatus }>
          <div className={ styles.loading }>
          </div>
        </div>
      );
};

export default Loading;
