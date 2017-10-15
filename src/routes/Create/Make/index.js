import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import Camera from 'react-native-camera';
import { Icon } from 'react-native-elements';
import { Text } from '../../../components/Commons';
import * as colors from '../../../helpers/colors';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 40,
        width: 80,
        height: 80,
        padding: 10,
        margin: 40,
    },
    inside: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.white,
    },
    top: {
        flex: 0,
        width: '100%',
        paddingTop: 28,
        paddingLeft: 16,
        paddingRight: 16,
    },
    iconLeft: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    bottom: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            capture: null,
            cameraType: Camera.constants.Type.back,
            cameraTypeId: 'back',
        };
    }
    takePicture() {
        const options = {};
        // options.location = ...
        this.camera.capture({ metadata: options })
            .then((data) => {
                this.setState({ capture: data });
                console.log('capture', data);
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
        if (this.state.capture) {
            return (
                <View style={styles.container}>
                    <Image
                        style={{ width: '100%', height: '100%' }}
                        source={{ uri: this.state.capture.mediaUri }}
                    >
                        <View style={styles.top}>
                            <TouchableOpacity onPress={() => this.setState({ capture: null })}>
                                <Icon
                                    name="cross"
                                    type="entypo"
                                    color={colors.white}
                                    style={styles.iconLeft}
                                    iconStyle={{ fontSize: 32 }}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.capture}>[CAPTURE]</Text>
                    </Image>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <Camera
                    ref={(cam) => { this.camera = cam; }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    type={this.state.cameraType}
                >
                    <View style={styles.top}>
                        <TouchableOpacity onPress={() => Actions.reset('playbooks')}>
                            <Icon
                                name="cross"
                                type="entypo"
                                color={colors.white}
                                style={styles.iconLeft}
                                iconStyle={{ fontSize: 32 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottom}>
                        <TouchableOpacity onPress={() => Actions.reset('playbooks')}>
                            <Icon
                                name="cross"
                                type="entypo"
                                color={colors.white}
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
                                color={colors.white}
                                iconStyle={{ fontSize: 32 }}
                            />
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        );
    }
}
const mapStateToProps = state => ({
    gallery: state.gallery,
});

export default connect(mapStateToProps)(Create);
