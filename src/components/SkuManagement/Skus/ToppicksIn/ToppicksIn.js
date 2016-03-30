import React from 'react';
import { connect } from 'react-redux';

const ToppicksIn = () => { // eslint-disable-line no-unused-vars
  const styles = require('./ToppicksIn.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
        <div className={styles.toppicksin_container}>
            <div className={styles.heading}>Top picks in <span>Whiskey</span></div>
            <div className={styles.toppicks_table}>
                <table className={styles.table_fixed_layout + ' ' + 'table table-striped'}>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Order</th>
                            <th>Brand Name</th>
                            <th>Volume</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><button>Edit</button></td>
                            <td><button>Delete</button></td>
                            <td>1</td>
                            <td className={styles.link_color}>Black and white</td>
                            <td className={styles.link_color}>700 ml</td>
                            <td>14 Aug 2017</td>
                            <td>23 Feb 2018</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>);
};

export default connect()(ToppicksIn);
