import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchStates, citiesViewHandler, IMAGE_UPLOAD_SUCCESS, IMAGE_UPLOAD_ERROR, IMAGE_CANCEL} from './CreateArticleAction';
import { checkState, unCheckState } from './CreateArticleAction';
import { checkCity, unCheckCity, finalSave } from './CreateArticleAction';
import uploadFile from '../../Common/Actions/upload';
import Endpoints from '../../../Endpoints';
/*
  Decorator which adds couple of use ful features like
  1. Clearing the state on component unmount
  2. Displaying/Hiding Loading icon on ajax fetch/complete
*/
import commonDecorator from '../../Common/CommonDecorator';
import BreadCrumb from '../../Common/BreadCrumb';

/* Components */
// import AdInfo from './ArticleInput';

class CreateImageAd extends Component { // eslint-disable-line no-unused-vars
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Whats New',
      sequence: 1,
      link: '#' // TODO
    });
    this.breadCrumbs.push({
      title: 'Create Article',
      sequence: 2,
      link: '#' // TODO
    });
  }
  componentWillMount() {
    Promise.all([
      this.props.dispatch(fetchStates())
    ]);
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
  onChangeCityCheck(city, e) {
    if (e.target.checked) {
      Promise.all([
        this.props.dispatch(checkCity(city))
      ]);
    } else {
      Promise.all([
        this.props.dispatch(unCheckCity(city))
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
    const {statesAll, hideCities, citiesView, selectedCities} = this.props;
    const styles = require('./CreateImage.scss');
    const { imageUrl } = this.props;
    const imgUr = Endpoints.file_get + imageUrl;
    const checkAllStatesInCity = (state) => {
      if (state.cities.length > 0) {
        return state.cities.every((c) => {
          return selectedCities.hasOwnProperty(c.id);
        });
      }
      return false;
    };
    const getSelectedCitiesForState = (state) => {
      let count = 0;
      state.cities.forEach((c) =>{
        count = (selectedCities.hasOwnProperty(c.id)) ? count + 1 : count;
      });
      return count;
    };
    const citiesHTML = citiesView.cities.map((city)=> {
      return (
        <li key={city.id}>
          <label>
            <input type="checkbox" checked={(selectedCities.hasOwnProperty(city.id)) ? 'checked' : ''} onChange={this.onChangeCityCheck.bind(this, city)}/> {city.name}
          </label>
        </li>
      );
    });
    console.log('CITY HTML');
    console.log(citiesHTML);
    const statesHTML = statesAll.map((state) => {
      return (
        <li key={state.id}>
          <label>
            <input type="checkbox" checked={checkAllStatesInCity(state) ? 'checked' : ''} onChange={this.onChangeStateCheck.bind(this, state)}/> {state.state_name}
          </label>
          <p onClick={this.onClickCitiesView.bind(this, state)}>{getSelectedCitiesForState(state)}/{state.cities.length} Cities</p>
        </li>
      );
    });
    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className={styles.brand_wrapper}>
          {/* <AdInfo dispatch={this.props.dispatch}/> */}

          {/* Image Upload */}
          <div className={styles.profile_view_right}>
            <div className={styles.upload_white}>
              <p className={styles.upload_header}> Upload Image </p>
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
          <div className={styles.brands_wrapper}>
            <div className={styles.select_cities_container}>
              <div className={styles.heading}>Select CITIES</div>
              {/*  States Container */}
              <div className={styles.brands_container}>
                <div className={styles.heading}>
                    <label>States</label>
                </div>
                <ul>
                  { statesHTML }
                </ul>
              </div>
              {/*  Cities Container */}
              <div className={styles.brands_ml_container + ' ' + hideCities}>
                <div className={styles.heading}> CITIES IN {citiesView.state_name}</div>
                <ul>
                  { citiesHTML }
                </ul>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
          <button className={styles.edit_brand_btn} onClick={this.onClickSave.bind(this)}>
            Create Article
          </button>
        </div>
      </div>
    );
  }
}

CreateImageAd.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  statesAll: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  hideCities: PropTypes.string.isRequired,
  citiesView: PropTypes.object.isRequired,
  selectedCities: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {...state.page_data, ...state.whats_new_data};
};

const decoratedConnectedComponent = commonDecorator(CreateImageAd);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
