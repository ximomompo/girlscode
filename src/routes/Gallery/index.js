import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CameraRollPicker from 'react-native-camera-roll-picker';
import { setImage } from '../../modules/gallery/actions';

class Gallery extends Component {
    getSelectedImages = (images, current) => {
        this.props.setImage(current);
    }
    render() {
        return (
            <CameraRollPicker
                maximum={1}
                callback={this.getSelectedImages}
            />
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    setImage,
}, dispatch);

export default connect(null, mapDispatchToProps)(Gallery);
