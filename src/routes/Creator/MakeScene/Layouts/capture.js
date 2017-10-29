import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import firebase from 'react-native-firebase';
import Camera from 'react-native-camera';
import { Icon } from 'react-native-elements';
import IconAbsolute from './components/IconAbsolute';
import styles from '../styles';

class LayoutCapture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cameraType: Camera.constants.Type.back,
            cameraTypeId: 'back',
        };
    }
    takePicture() {
        const options = {};
        // options.location = ...
        this.camera.capture({ metadata: options })
            .then((data) => {
                this.props.sceneRef.child('image').set(data.mediaUri);
                this.props.goToLayout('text');
            })
            .catch(err => console.error(err));
    }
    switchCameraType = () => {
        if (this.state.cameraTypeId === 'back') {
            this.setState({
                cameraType: Camera.constants.Type.front,
                cameraTypeId: 'front',
            });
        } else {
            this.setState({
                cameraType: Camera.constants.Type.back,
                cameraTypeId: 'back',
            });
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Camera
                    ref={(cam) => { this.camera = cam; }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    type={this.state.cameraType}
                >
                    <IconAbsolute
                        position="TopLeft"
                        onPress={() => Actions.main_creator({ pbKey: this.props.pbKey })}
                    >
                        <Icon
                            name="cross"
                            type="entypo"
                            color="white"
                            iconStyle={{ fontSize: 32 }}
                        />
                    </IconAbsolute>
                    <View style={styles.bottom}>
                        <TouchableOpacity onPress={() => Actions.gallery()}>
                            <Icon
                                name="picture-o"
                                type="font-awesome"
                                color="white"
                                style={styles.iconLeft}
                                iconStyle={{ fontSize: 32 }}
                            />
                        </TouchableOpacity>
                        <View style={styles.capture}>
                            <TouchableOpacity onPress={this.takePicture.bind(this)}>
                                <View style={styles.inside} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => this.switchCameraType()}>
                            <Icon
                                name="cycle"
                                type="entypo"
                                color="white"
                                iconStyle={{ fontSize: 32 }}
                            />
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        );
    }
}

LayoutCapture.propsTypes = {
    setCapture: PropTypes.func.isRequired,
    goToLayout: PropTypes.func.isRequired,
};

export default LayoutCapture;
