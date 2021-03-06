import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { updateList, fetchStates, fetchBrands, citiesViewHandler, IMAGE_UPLOAD_SUCCESS, IMAGE_UPLOAD_ERROR, IMAGE_CANCEL} from './CreateAdUrlActions';
import { checkState, unCheckState } from './CreateAdUrlActions';
import { checkCity, unCheckCity, finalSave } from './CreateAdUrlActions';
import uploadFile from '../../Common/Actions/upload';
import Endpoints from '../../../Endpoints';
import { RESET } from './CreateAdUrlActions';
/*
  Decorator which adds couple of use ful features like
  1. Clearing the state on component unmount
  2. Displaying/Hiding Loading icon on ajax fetch/complete
*/
import commonDecorator from '../../Common/CommonDecorator';
import BreadCrumb from '../../Common/BreadCrumb';

/* Components */
import AdInfo from './AdInfo';

class CreateUrlAd extends Component { // eslint-disable-line no-unused-vars
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
      title: 'Create URL Ad',
      sequence: 2,
      link: '#' // TODO
    });
  }
  componentWillMount() {
    Promise.all([
      this.props.dispatch(fetchBrands()),
      this.props.dispatch(fetchStates())
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
  onChangeCityOrder(city, e) {
    Promise.all([
      this.props.dispatch(updateList(city, e.target.value))
    ]);
  }
  onClickSave() {
    Promise.all([
      this.props.dispatch(finalSave())
    ]);
  }
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  render() {
    const {statesAll, hideCities, citiesView, selectedCities} = this.props;
    const styles = require('./CreateUrlAd.scss');
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
            <input type="number" className = {(selectedCities.hasOwnProperty(city.id)) ? '' : 'hide'} onChange={this.onChangeCityOrder.bind(this, city)} value={city.listing_order}/>
        </li>
      );
    });
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
          <AdInfo dispatch={this.props.dispatch} brands={this.props.brandsAll} sb={this.props.selectedBrand} bms={this.props.brandManagers} />

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
            Save Ad
          </button>
        </div>
      </div>
    );
  }
}

CreateUrlAd.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  statesAll: PropTypes.array.isRequired,
  brandsAll: PropTypes.array.isRequired,
  brandManagers: PropTypes.array.isRequired,
  selectedBrand: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  hideCities: PropTypes.string.isRequired,
  citiesView: PropTypes.object.isRequired,
  selectedCities: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {...state.page_data, ...state.createUrlAd_data};
};

const decoratedConnectedComponent = commonDecorator(CreateUrlAd);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
