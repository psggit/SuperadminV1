import React from 'react';
import TableHeader from '../TableHeader';
import { Link } from 'react-router';

const LandingBlock = (content) => {
  const conten = JSON.parse(content.content);
  const styles = require('./LandingBlock.scss');
  const title = conten.content.title;
  // Store all workflows to be displayed : Array
  const list = conten.content.list;
  const listComponent = list.map((indiv) => {
    return (
           <div className = {styles.box_wrapper}>
             <div className={styles.squarecontent}>
               <div>
                 <span>
                   <Link to={indiv.link}> {indiv.name} </Link>
                 </span>
               </div>
             </div>
           </div>
           );
  });
  return (
    <div className={ styles.entry_point_wrapper }>
        <TableHeader title={title} />
        <div className="clearfix"></div>
        <div className={styles.entry_point_links}>
            {listComponent}
            <div className ="clearfix"></div>
        </div>
    </div>
  );
};

export default LandingBlock;
