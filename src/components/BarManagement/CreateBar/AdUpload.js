import React, { Component, PropTypes } from 'react';
import uploadFile from '../../Common/Actions/upload';
import { connect } from 'react-redux';

import Endpoints from '../../../Endpoints';

class AdImageUpload extends Component {
  constructor() {
    super();
  }
  onUploadClick() {
    const fileComponent = document.getElementById('adImage');
    const formData = new FormData();
    formData.append('file', fileComponent.files[0]);
    this.props.dispatch(uploadFile(formData, this.props.requestSuccess, this.props.requestError));
  }
  onCancelClick() {
    this.props.dispatch({ type: this.props.cancelImage });
  }
  render() {
    const styles = require('./CreateBar.scss');
    const { imageUrl, name } = this.props;
    const imgUr = Endpoints.file_get + imageUrl;
    return (
        <div className={styles.cheque_upload_container}>
          <div className={ styles.check_upload }>
            <div className={styles.check_lab}>
               {name}
            </div>
            <div className={styles.upload_container}>
              {/* http://130.211.246.199 */}
                {
                  (imageUrl.length > 0) ?
                    (
                     <div className={ styles.img_wrapper }>
                      <img src={ imgUr } className={styles.upload_img}/>
                      <p className={ styles.close } onClick={ this.onCancelClick.bind(this) }>X</p>
                    </div>
                    )
                    :
                    ( <input type="file" accept="image/*" className={styles.input_upload} id="adImage"/> )
                }
              {
                (imageUrl.length === 0) ?
                  (
                    <div className={styles.wd_100}>
                      <button className={styles.upload_btn} onClick={ this.onUploadClick.bind(this) } >Upload</button>
                    </div>
                  ) : ''
              }
            </div>
          </div>
        </div>
      );
  }
}

AdImageUpload.propTypes = {
  requestSuccess: PropTypes.string.isRequired,
  requestError: PropTypes.string.isRequired,
  cancelImage: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {...state.page_data};
};

// const decoratedConnectedComponent = commonDecorator(ImageUpload);
export default connect(mapStateToProps)(AdImageUpload);
