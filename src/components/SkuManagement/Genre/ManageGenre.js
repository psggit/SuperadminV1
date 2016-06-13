import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { insertGenre, fetchGenre, updateGenre, updateGenreText, resetGenre} from '../Action';

class ManageGenre extends React.Component { // eslint-disable-line no-unused-vars
  componentDidMount() {
    /* If On edit operation */
    let genreId = this.props.params.Id;
    if (genreId) {
      genreId = parseInt(genreId, 10);
      this.props.dispatch(fetchGenre(genreId));
    } else {
      this.props.dispatch(resetGenre());
    }
  }
  onClickHandle() {
    // e.preventDefault();
    const genreName = document.querySelectorAll('[data-field-name="genre_name"]')[0].value;
    const genreObj = {};
    genreObj.genre_name = genreName;
    genreObj.created_at = new Date().toISOString();
    genreObj.updated_at = new Date().toISOString();
    this.props.dispatch(insertGenre(genreObj));
  }
  onClickEdit(e) {
    const genreName = document.querySelectorAll('[data-field-name="genre_name"]')[0].value;
    const genreId = parseInt(e.target.getAttribute('data-genre-id'), 10);
    const genreObj = {};
    genreObj.values = {};
    genreObj.values.genre_name = genreName;
    genreObj.returning = ['id'];
    this.props.dispatch(updateGenre(genreObj, genreId));
  }
  /* Function to update the Fetched Genre of this component so that input field is editable */
  inputOnChange(e) {
    e.target.value = e.target.value;
    this.props.dispatch(updateGenreText(e.target.value));
  }
  render() {
    const styles = require('./GenreManagement.scss');

    const { ongoingRequest, lastError, lastSuccess } = this.props;
    console.log(ongoingRequest);
    console.log(lastError);

    const htmlContent = () => {
      if (lastSuccess.length > 0) {
        return (
          <div className={styles.wrapper}>
            <div className={styles.head_container}>
            	SKU Management / Edit Genre
            </div>
            <div className={styles.create_state_wrapper}>
              <p>
                Edit Genre
              </p>
              <div className={styles.create_form}>
                <div className={styles.indiv_form}>
                	<label>Genre Name</label>
                	<input type="text" data-field-name="genre_name" onChange={this.inputOnChange.bind(this)} value={lastSuccess[0].genre_name} />
                </div>
                {/*
                <div className={styles.indiv_form}>
                	<label>Status</label>
                	<select>
                		<option>Pending</option>
                	</select>
                </div>
                */}
                <button className={styles.common_btn + ' ' + styles.create_btn } data-genre-id={lastSuccess[0].id} onClick={this.onClickEdit.bind(this)}>Edit Genre</button>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className={styles.wrapper}>
          <div className={styles.head_container}>
          	SKU Management / Create Genre
          </div>
          <div className={styles.create_state_wrapper}>
            <p>
              Create Genre
            </p>
            <div className={styles.create_form}>
              <div className={styles.indiv_form}>
              	<label>Genre Name</label>
              	<input type="text" data-field-name="genre_name" />
              </div>
              {/*
              <div className={styles.indiv_form}>
              	<label>Status</label>
              	<select>
              		<option>Pending</option>
              	</select>
              </div>
              */}
              <button className={styles.common_btn + ' ' + styles.create_btn } onClick={this.onClickHandle.bind(this)} disabled={ongoingRequest ? true : false}>Create Genre</button>
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
  lastSuccess: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {...state.sku_data};
};

export default connect(mapStateToProps)(ManageGenre);
