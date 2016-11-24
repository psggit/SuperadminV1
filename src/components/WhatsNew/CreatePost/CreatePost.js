import React, { PropTypes } from 'react';
import BreadCrumb from '../../Common/BreadCrumb';
// import DisableInformation from './DisableInformation';
import commonDecorator from '../../Common/CommonDecorator';
import { connect } from 'react-redux';


import {
  createNewArticle, fetchCities
} from './Action';

import { fetchStates, citiesViewHandler} from './Action';
import { checkState, unCheckState } from './Action';
import { checkCity, unCheckCity } from './Action';

class CreatePost extends React.Component {
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Whats New ',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Create Post',
      sequence: 2,
      link: '#'
    });
  }
  componentWillMount() {
    Promise.all([
      this.props.dispatch(fetchStates())
    ]);
  }
  componentDidMount() {
    this.props.dispatch(fetchCities());
  }
  onClickCitiesView(stateObj) {
    Promise.all([
      this.props.dispatch(citiesViewHandler(stateObj))
    ]);
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
  createClicked() {
    // fetch the input data
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const content = document.getElementById('content_whatsnew').value;
    let isFeatured = null;
    if (document.querySelector('input[name="featured"]:checked') !== null) {
      isFeatured = document.querySelector('input[name="featured"]:checked').value;
    }
    const image = '';

    // var selectedCities = [];
    // do validations
    let error = 0;
    let message = '';
    if (title === '') {
      error += 1;
      message = 'Please enter the title';
    }
    if (description === '') {
      error += 1;
      message = 'Please enter the description';
    }
    if (content === '') {
      error += 1;
      message = 'Please enter the content';
    }
    if (isFeatured === null) {
      error += 1;
      message = 'Please select if the article is featured or not';
    } else if (isFeatured === 'yes') {
      isFeatured = true;
    } else {
      isFeatured = false;
    }

    if (error > 0) {
      alert(message);
    } else {
      const dataObject = {'title': title, 'description': description, 'content': content, 'image': image, 'is_featured': isFeatured};
      this.props.dispatch(createNewArticle(dataObject));
    }
  }

  render() {
    // const {createClicked} = this.props;
    const styles = require('./CreatePost.scss');
    const {statesAll, hideCities, citiesView, selectedCities} = this.props;
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
            <input type="checkbox" checked={(selectedCities.hasOwnProperty(city.id)) ? 'checked' : ''} onChange={this.onChangeCityCheck.bind(this, city)}> {city.name}</input>
          </label>
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
        <div className = {styles.disable_device_wrapper}>
          <div className = {styles.disable_device_head}>
            What{'\''}s New
          </div>
          <div className = {styles.command_wrapper}>
            <div className = {styles.information_leftpanel}>
              Title
            </div>
            <div className = {styles.information_rightpanel}>
              <textarea id="title"></textarea>
            </div>
            <div className = {styles.information_leftpanel}>
              Description
            </div>
            <div className = {styles.information_rightpanel}>
              <textarea id="description"></textarea>
            </div>
            <div className = {styles.information_leftpanel}>
              Content
            </div>
            <div className = {styles.information_rightpanel}>
              <textarea id="content_whatsnew"></textarea>
            </div>
            <div className = {styles.information_leftpanel}>
              Is Featured?
            </div>
            {/*
            <div className = {styles.information_rightpanel}>
              <div>
                <input type="radio" value="yes" name="featured">Yes</input>
              </div>
              <div>
                <input type="radio" value="no" name="featured">No</input>
              </div>
            </div>
          */}

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

            <div className = {styles.information_rightpanel}>
                <button id="whatsnew_create" onClick={this.createClicked.bind(this)} type="button">Create</button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

CreatePost.propTypes = {
  dispatch: PropTypes.func.isRequired,
  createClicked: PropTypes.func.isRequired,
  statesAll: PropTypes.array.isRequired,
  hideCities: PropTypes.string.isRequired,
  citiesView: PropTypes.object.isRequired,
  selectedCities: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {...state.whats_new_data};
};
// export default CreatePost;
export default connect(mapStateToProps)(commonDecorator(CreatePost));
// export default connect(mapStateToProps)(CreatePost);
