import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { insertGenre
  , fetchGenre
  , updateGenre
  , resetGenre
  , INPUT_VALUE_CHANGED
  , REQUEST_COMPLETED
  , MAKE_REQUEST
  , IMAGE_UPLOAD_SUCCESS
  , IMAGE_UPLOAD_ERROR
  , CANCEL_IMAGE
} from './GenreAction';

import ImageUpload from './ImageUpload';

import commonDecorator from '../../Common/CommonDecorator';
import BreadCrumb from '../../Common/BreadCrumb';

import formValidator from '../../Common/CommonFormValidator';

class ManageGenre extends React.Component { // eslint-disable-line no-unused-vars
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'SKU Management',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Manage Genre',
      sequence: 2,
      link: '/hadmin/genre_management'
    });
    this.breadCrumbs.push({
      title: 'Create/Edit Genre',
      sequence: 3,
      link: '#'
    });
  }
  componentDidMount() {
    /* If On edit operation */
    let genreId = this.props.params.Id;
    if (genreId) {
      genreId = parseInt(genreId, 10);
      Promise.all([
        this.props.dispatch({ type: MAKE_REQUEST}),
        this.props.dispatch(fetchGenre(genreId))
      ]).then( ( ) => {
        this.props.dispatch({ type: REQUEST_COMPLETED });
      });
    } else {
      this.props.dispatch(resetGenre());
    }
  }
  onClickHandle() {
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST}),
      this.props.dispatch(insertGenre())
    ]).then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  onClickEdit() {
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST}),
      this.props.dispatch(updateGenre())
    ]).then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  render() {
    const styles = require('./GenreManagement.scss');

    const {
      ongoingRequest
      , genreName
      , displayName
      , displayOrder
      , image
      , genreStatus
      , genreId
    } = this.props;

    console.log(ongoingRequest);

    const htmlContent = () => {
      const submitButton = ( genreId !== 0 ) ?
        (
          <button className={styles.common_btn + ' ' + styles.create_btn } onClick={this.onClickEdit.bind(this)} disabled={ongoingRequest ? true : false}>Edit Genre</button>
        )
      :
        (
          <button className={styles.common_btn + ' ' + styles.create_btn } onClick={this.onClickHandle.bind(this)} disabled={ongoingRequest ? true : false}>Create Genre</button>
        );

      return (
        <div className={styles.wrapper}>
          <BreadCrumb breadCrumbs={this.breadCrumbs} />
          <div className={styles.create_state_wrapper}>
            <p>
              { genreId > 0 ? 'Edit ' : 'Create ' } Genre
            </p>
            <div className={styles.create_form}>
              <div className={styles.indiv_form}>
              	<label>Genre Name</label>
              	<input type="text" value={ genreName } data-field-name="genreName" data-field-type="text"/>
              </div>
              <div className={styles.indiv_form}>
              	<label>Display Name</label>
              	<input type="text" value={ displayName } data-field-name="displayName" data-field-type="text"/>
              </div>
              <div className={styles.indiv_form}>
              	<label>Display Order</label>
              	<input type="text" value={ displayOrder ? displayOrder : '' } data-field-name="displayOrder" data-field-type="int"/>
              </div>
              <div className={styles.indiv_form}>
              	<label>Image</label>
              	<textarea value={ image } data-field-name="image" data-field-type="text"></textarea>
              </div>
              <div className={ styles.image_container }>
                  <ImageUpload imageUrl={image ? image : ''} requestSuccess={IMAGE_UPLOAD_SUCCESS} requestError={ IMAGE_UPLOAD_ERROR } cancelImage={ CANCEL_IMAGE }/>
              </div>
              <div className={styles.indiv_form}>
              	<label>Status</label>
              	<select value = { genreStatus ? '1' : '0' } data-field-name="genreStatus" data-field-type="boolean" onChange={ () => { return true; } }>
              		<option value="1">Active</option>
              		<option value="0">InActive</option>
              	</select>
              </div>
              { submitButton }
            </div>
          </div>
        </div>
      );
    }();
    // Check if there are any results, if yes show edit state page else show create state
    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    return (
        <div className={styles.container}>
          { htmlContent }
        </div>
      );
  }
}

ManageGenre.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  genreName: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  displayOrder: PropTypes.number.isRequired,
  genreId: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  genreStatus: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {...state.sku_data, ...state.page_data, ...state.genre_data };
};


const decoratedOne = formValidator(ManageGenre, 'data-field-name', 'data-field-type', INPUT_VALUE_CHANGED);

const decoratedConnectedComponent = commonDecorator(decoratedOne);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
