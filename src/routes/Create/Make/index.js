import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Keyboard,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import Gestures from 'react-native-easy-gestures';
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
        zIndex: 0,
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
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bottom: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerInputText: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 80,
    },
    containerText: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 0,
        flex: 1,
        justifyContent: 'center',
    },
    containerGestures: {
        width: '100%',
        height: '100%',
        flex: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    dotAux: {
        marginTop: 10,
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    textInput: {
        fontFamily: 'Roboto-Black',
        color: colors.white,
        width: '100%',
        textAlign: 'center',
        fontSize: 24,
        backgroundColor: 'transparent',
    },
    iconsAbsolute: {
        position: 'absolute',
        top: 20,
        zIndex: 1,
        padding: 4,
    },
    pickerColor: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        position: 'absolute',
        zIndex: 1,
        left: 10,
        top: 80,
    },
    pickerColorItem: {
        width: 25,
        height: 25,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: colors.white,
    },
});

const colorsPicker = [colors.green, colors.red, colors.blue, 'yellow', 'black', 'white'];

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            capture: null,
            cameraType: Camera.constants.Type.back,
            cameraTypeId: 'back',
            text: 'Escribe aquí...',
            openText: false,
            colorText: colors.white,
        };
    }
    takePicture() {
        const options = {};
        // options.location = ...
        this.camera.capture({ metadata: options })
            .then((data) => {
                this.setState({
                    capture: data,
                    openText: true,
                });
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

    switchOpenText = () => {
        if (this.state.openText) {
            Keyboard.dismiss();
            this.setState({ openText: false });
        } else {
            this.setState({ openText: true }, () => this.textInput.focus());
        }
    }

    renderIconText = () => {
        if (this.state.openText) {
            return <Text style={{ backgroundColor: 'transparent', color: colors.white, fontSize: 16, padding: 4 }}>Listo</Text>;
        }
        return (
            <Icon
                name="font-download"
                color={colors.white}
                iconStyle={{ fontSize: 32 }}
            />
        );
    }

    renderPicksColors = () => (
        <View style={styles.pickerColor}>
            {colorsPicker.map(cP => (
                <TouchableOpacity
                    key={cP}
                    style={{ padding: 5 }}
                    onPress={() => this.setState({ colorText: cP })}
                >
                    <View style={[styles.pickerColorItem, { backgroundColor: cP }]} />
                </TouchableOpacity>
            ))}
        </View>
    );

    renderText = () => {
        if (this.state.openText) {
            return (
                <View style={styles.containerInputText}>
                    {this.renderPicksColors()}
                    <TextInput
                        ref={(c) => { this.textInput = c; }}
                        style={[styles.textInput, { color: this.state.colorText }]}
                        multiline
                        autoFocus
                        editable={this.state.openText}
                        onChangeText={text => this.setState({ text })}
                        value={this.state.text}
                        onFocus={() => this.setState({ openText: true })}
                    />
                </View>
            );
        }
        return (
            <View style={[styles.containerText, {
                justifyContent: 'flex-start',
                paddingTop: 44,
            }]}>
                <Gestures onStart={() => Keyboard.dismiss()}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        padding: 40,
                        justifyContent: 'flex-start',
                    }}>
                        <Text style={[styles.textInput, {
                            color: this.state.colorText,
                            fontSize: 21,
                        }]}
                        >
                            { this.state.text }
                        </Text>
                        <View style={styles.dotAux} />
                    </View>
                </Gestures>
            </View>
        );
    }

    render() {
        if (this.state.capture) {
            return (
                <View style={styles.container}>
                    <TouchableOpacity
                        style={[styles.iconsAbsolute, { left: 20 }]}
                        onPress={() => this.setState({ capture: null })}
                    >
                        <Icon
                            name="cross"
                            type="entypo"
                            color={colors.white}
                            iconStyle={{ fontSize: 32 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.iconsAbsolute, { right: 20 }]}
                        onPress={() => this.switchOpenText()}
                    >
                        {this.renderIconText()}
                    </TouchableOpacity>
                    <Image
                        style={{ width: '100%', height: '100%', position: 'absolute', zIndex: -1, }}
                        source={{ uri: this.state.capture.mediaUri }}
                    />
                    {this.renderText()}
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
                        <TouchableOpacity
                            style={{ padding: 4 }}
                            onPress={() => Actions.reset('playbooks')}
                        >
                            <Icon
                                name="cross"
                                type="entypo"
                                color={colors.white}
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
