import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { View, Image, Text } from 'react-native';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import IconAbsolute from '../Creator/MakeScene/Layouts/components/IconAbsolute';
import styles from '../Creator/MakeScene/styles';

class Play extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scenes: [],
            doneScene: null,
            errorScene: null,
        };
    }
    componentWillMount() {
        firebase.database().ref('publish_playbooks')
            .child(this.props.pbKey)
            .once('value', (snapPb) => {
                const scenes = [];
                snapPb.child('scenes').forEach((snapScenes) => {
                    scenes.push(snapScenes.val());
                });
                this.setState({
                    scenes,
                    doneScene: snapPb.val().done_scene,
                    errorScene: snapPb.val().error_scene,
                });
            });
    }
    onNext = () => {

    }
    render() {
        if (this.state.scenes.length === 0) return null;
        return (
            <View style={styles.container}>
                <IconAbsolute
                    position="TopLeft"
                    onPress={() => Actions.playbooks()}
                >
                    <Icon
                        name="cross"
                        type="entypo"
                        color="white"
                        iconStyle={{ fontSize: 32 }}
                    />
                </IconAbsolute>
                <View style={styles.containerGestures}>
                    <Text style={[styles.textInput, {
                        left: 0,
                        top: 0,
                        transform: [
                            { rotate: '0deg' },
                            { scale: 1 },
                        ],
                    }]}>
                        {this.state.scenes[0].text}
                    </Text>
                </View>
                <Image
                    style={styles.imageBackground}
                    source={{ uri: this.state.scenes[0].imageURL }}
                />
            </View>
        );
    }
}

export default Play;
