import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllArticleData, getArticleData, changeArticleStatus } from './ArticleAction';
import SearchWrapper from './SearchWrapper';

import PaginationWrapper from '../../Common/PaginationWrapper.js';

/*
 * Decorator which adds couple of use ful features like
 * 1. Clearing the state on component unmount
 * 2. Displaying/Hiding Loading icon on ajax fetch/complete
*/
import commonDecorator from '../../Common/CommonDecorator';
import BreadCrumb from '../../Common/BreadCrumb';

/*
 1. Required Components:
      a) Pagination
      b) Loading Screen *Done*
      c) Search
      d) Header *Done*
      e) Listing Component
*/

class ArticleManagement extends React.Component { // eslint-disable-line no-unused-vars
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Whats New',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'View Articles',
      sequence: 2,
      link: '#'
    });
  }
  // Hook used by pagination wrapper to fetch the initial data
  onClickActivate(e) {
    console.log(e.target);
    const articleStatus = e.target.getAttribute('data-is-active');
    const articleId = e.target.getAttribute('data-article-id');
    // form the data object
    const changedisActive = articleStatus === 'true' ? false : true;
    const dataObject = {'type': 'update', 'args': {'table': 'whats_new_article', '$set': {'is_active': changedisActive}, 'where': {'id': parseInt(articleId, 10)}}};
    this.props.dispatch(changeArticleStatus(dataObject));
  }
  fetchInitialData(page, limit) {
    this.props.dispatch(getAllArticleData(page, limit));
  }
  triggerPageChange(clickedPage, limit) {
    this.props.dispatch(getArticleData(clickedPage, limit));
  }
  render() {
    const styles = require('./ArticleManagement.scss');
    const { lastSuccess } = this.props;

    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    return (
        <div className={styles.container}>
          <BreadCrumb breadCrumbs={this.breadCrumbs} />

          <div className={styles.create_layout + ' ' + styles.wd_100}>
            <Link to={'/hadmin/whats_new/create_article'}> <button className={styles.common_btn}>Create Article</button> </Link>
          </div>
          <SearchWrapper data={lastSuccess} onClickActivate = {this.onClickActivate.bind(this)} />
          <PaginationWrapper
            {...this.props }
            fetchInitialData = { this.fetchInitialData.bind(this) }
            limit = "5"
            triggerPageChange={ this.triggerPageChange.bind(this) }
            showMax="5"
            parentUrl="/hadmin/whats_new"/>
        </div>
      );
  }
}

ArticleManagement.propTypes = {
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

const decoratedConnectedComponent = commonDecorator(ArticleManagement);// connect(mapStateToProps)(CommonDecorator);

export default connect(mapStateToProps)(decoratedConnectedComponent);
