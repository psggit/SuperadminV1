import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchCities, citiesViewHandler, IMAGE_UPLOAD_SUCCESS, IMAGE_UPLOAD_ERROR, IMAGE_CANCEL} from './CreateAdBarActions';
import { checkState, unCheckState } from './CreateAdBarActions';
import { finalSave } from './CreateAdBarActions';
import uploadFile from '../../Common/Actions/upload';
import Endpoints from '../../../Endpoints';
import { RESET } from './CreateAdBarActions';
/*
  Decorator which adds couple of use ful features like
  1. Clearing the state on component unmount
  2. Displaying/Hiding Loading icon on ajax fetch/complete
*/
import commonDecorator from '../../Common/CommonDecorator';
import BreadCrumb from '../../Common/BreadCrumb';

/* Components */
import AdInfo from './AdInfo';

class CreateBarAd extends Component { // eslint-disable-line no-unused-vars
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Ads Management',
      sequence: 1,
      link: '#' // TODO
    });
    this.breadCrumbs.push({
      title: 'Create Bar Ad',
      sequence: 2,
      link: '#' // TODO
    });
  }
  componentWillMount() {
    Promise.all([
      this.props.dispatch(fetchCities())
    ]);
  }
  componentWillUnmount() {
    this.props.dispatch({ type: RESET });
  }
  onClickCitiesView(stateObj) {
    Promise.all([
      this.props.dispatch(citiesViewHandler(stateObj))
    ]);
  }
  onUploadClick() {
    const fileComponent = document.getElementById('adImage');
    const formData = new FormData();
    formData.append('file', fileComponent.files[0]);
    this.props.dispatch(uploadFile(formData, IMAGE_UPLOAD_SUCCESS, IMAGE_UPLOAD_ERROR));
  }
  onCancelClick() {
    this.props.dispatch({ type: IMAGE_CANCEL});
  }
  onChangeStateCheck(state, e) {
    if (e.target.checked) {
      Promise.all([
        this.props.dispatch(checkState(state))
      ]);
    } else {
      Promise.all([
        this.props.dispatch(unCheckState(state))
      ]);
    }
  }
  onClickSave() {
    Promise.all([
      this.props.dispatch(finalSave())
    ]);
  }
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  render() {
    const styles = require('./CreateBarAd.scss');
    const { imageUrl } = this.props;
    const imgUr = Endpoints.file_get + imageUrl;
    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className={styles.brand_wrapper}>
          <AdInfo dispatch={this.props.dispatch} cities={this.props.citiesAll} selectedCity={this.props.selectedCity} />

          {/* Image Upload */}
          <div className={styles.profile_view_right}>
            <div className={styles.upload_white}>
              <p className={styles.upload_header}> Upload Ad Image </p>
              <div className={styles.uploaded_images}>
                {
                  (imageUrl.length > 0) ?
                    (
                     <div className={ styles.img_wrapper }>
                        <p className={ styles.close } onClick={ this.onCancelClick.bind(this) }>X</p>
                        <img src={imgUr} className={styles.upload_img}/>
                      </div>
                    ) : ''
                }
              </div>
              {
                (imageUrl.length === 0) ?
                  (
                    <div className={styles.upload_actions}>
                      <input type="file" id="adImage" className={styles.ad_image}/>
                      <div className={styles.upload_action_button}>
                        <button id="cutomer_upload" onClick={ this.onUploadClick.bind(this) } >Upload</button>
                      </div>
                    </div>
                  ) : ''
              }
            </div>
          </div>
          {/* -- ends here -- */}

          <div className="clearfix"></div>
          <div className="clearfix"></div>
          <button className={styles.edit_brand_btn} onClick={this.onClickSave.bind(this)}>
            Save Ad
          </button>
        </div>
      </div>
    );
  }
}

CreateBarAd.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  citiesAll: PropTypes.array.isRequired,
  selectedCity: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {...state.page_data, ...state.createBarAd_data};
};

const decoratedConnectedComponent = commonDecorator(CreateBarAd);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
