import React, { Component, PropTypes } from 'react';
import uploadFile from '../../../Common/Actions/upload';
import { connect } from 'react-redux';

class ImageUpload extends Component {
  constructor() {
    super();
  }
  onUploadClick() {
    const fileComponent = document.getElementById('skuImage');
    const formData = new FormData();
    formData.append('file', fileComponent.files[0]);
    this.props.dispatch(uploadFile(formData, this.props.requestSuccess, this.props.requestError));
  }
  onCancelClick() {
    this.props.dispatch({ type: this.props.cancelImage });
  }
  render() {
    const styles = require('./CreateSku.scss');
    const { imageUrl } = this.props;
    return (
        <div className={styles.upload_container}>
          <div className={styles.upload_lab}>Upload Images</div>
          <div className={styles.upload_images}>
            <div className={styles.upload_id}>Upload</div>
            <div className={styles.file_upload}>
              {
                (imageUrl.length > 0) ?
                  (
                   <div className={ styles.img_wrapper }>
                    <img src={ 'http://104.155.225.221/file_upload/get?fs_url=' + imageUrl } className={styles.upload_img}/>
                    <p className={ styles.close } onClick={ this.onCancelClick.bind(this) }>X</p>
                  </div>
                  )
                  :
                  ( <input type="file" id="skuImage"/> )
              }
            </div>
          </div>
          {
            (imageUrl.length === 0) ?
              (
                <div className={styles.upload_btn_layout}>
                  <button className={styles.upload_btn} onClick={ this.onUploadClick.bind(this) } >Upload</button>
                </div>
              ) : ''
          }
        </div>
      );
  }
}

ImageUpload.propTypes = {
  requestSuccess: PropTypes.string.isRequired,
  requestError: PropTypes.string.isRequired,
  cancelImage: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {...state.page_data};
};

// const decoratedConnectedComponent = commonDecorator(ImageUpload);
export default connect(mapStateToProps)(ImageUpload);
