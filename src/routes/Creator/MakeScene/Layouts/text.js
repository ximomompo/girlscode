import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Image,
    TextInput,
    Keyboard,
} from 'react-native';
import Gestures from 'react-native-easy-gestures';
import { Icon } from 'react-native-elements';
import PickerColors from './components/PickerColors';
import IconAbsolute from './components/IconAbsolute';
import { Text } from '../../../../components/Commons';
import styles from '../styles';

class LayoutText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Escribe aquí...',
            openText: true,
            colorText: 'white',
        };
    }

    setText = (value) => {
        this.props.sceneRef.child('text').set(value);
    }

    setColorText = (value) => {
        this.setState({ colorText: value });
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
            return <Text style={styles.iconText}>Listo</Text>;
        }
        return (
            <Icon
                name="font-download"
                color="white"
                iconStyle={{ fontSize: 32 }}
            />
        );
    }

    renderText = () => {
        if (this.state.openText) {
            return (
                <View style={styles.containerInputText}>
                    <PickerColors
                        setColorText={this.setColorText}
                    />
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
            <View
                style={[styles.containerText, {
                    justifyContent: 'flex-start',
                    paddingTop: 44,
                }]}
            >
                <Gestures
                    onStart={(event, stylesGestures) => {
                        const data = {
                            left: stylesGestures.left,
                            top: stylesGestures.top,
                            transform: {
                                rotate: stylesGestures.transform[1].rotate,
                                scale: stylesGestures.transform[0].scale,
                            },
                        };
                        this.props.sceneRef.child('position').set(data);
                        Keyboard.dismiss();
                    }}
                    onRelease={(event, stylesGestures) => {
                        const data = {
                            left: stylesGestures.left,
                            top: stylesGestures.top,
                            transform: {
                                rotate: stylesGestures.transform[1].rotate,
                                scale: stylesGestures.transform[0].scale,
                            },
                        };
                        this.props.sceneRef.child('position').set(data);
                    }}
                >
                    <View style={styles.containerGestures}>
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
        return (
            <View style={styles.container}>
                <IconAbsolute
                    position="TopLeft"
                    onPress={() => this.props.goToLayout('capture')}
                >
                    <Icon
                        name="cross"
                        type="entypo"
                        color="white"
                        iconStyle={{ fontSize: 32 }}
                    />
                </IconAbsolute>
                <IconAbsolute
                    position="TopRight"
                    onPress={() => this.switchOpenText()}
                >
                    {this.renderIconText()}
                </IconAbsolute>
                <IconAbsolute
                    position="BottomRight"
                    onPress={() => {
                        this.setText(this.state.text);
                        this.props.goToLayout('form');
                    }}
                >
                    <Text style={styles.iconText}>Añadir pregunta</Text>
                </IconAbsolute>
                <Image
                    style={styles.imageBackground}
                    source={{ uri: this.props.scene.image.toString() }}
                />
                {this.renderText()}
            </View>
        );
    }
}

LayoutText.propsTypes = {
    goToLayout: PropTypes.func.isRequired,
    scene: PropTypes.shape({
        text: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
    sceneRef: PropTypes.string.isRequired,
};

export default LayoutText;
