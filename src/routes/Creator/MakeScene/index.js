import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import Layouts from './Layouts';

class MakeScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: props.initLayout,
            scene: {},
            loaded: false,
        };
    }
    componentWillMount() {
        this.dbRef
            .on('value', (snap) => {
                this.setState({
                    loaded: true,
                    scene: snap.val(),
                });
            });
    }

    goToLayout = (value) => {
        this.setState({ layout: value });
    }

    goToMain = () => {
        Actions.main_creator({ pbKey: this.props.pbKey });
    }

    finishScene = (params) => {
        this.dbRef.update(Object.assign(params, {
            finished_at: firebase.database.ServerValue.TIMESTAMP,
        })).then(() => {
            // Subir imagen
            this.goToMain();
        });
    }
    dbRef = firebase.database().ref(this.props.sceneRef);

    render() {
        if (!this.state.loaded) return <View><Text>Cargando</Text></View>;
        switch (this.state.layout) {
        case 'text':
            return (
                <Layouts.Text
                    goToLayout={this.goToLayout}
                    finishScene={this.finishScene}
                    scene={this.state.scene}
                    sceneRef={this.dbRef}
                    specialScene={this.props.specialScene}
                />
            );
        case 'form':
            return (
                <Layouts.Form
                    goToLayout={this.goToLayout}
                    finishScene={this.finishScene}
                    scene={this.state.scene}
                    sceneRef={this.dbRef}
                />
            );
        default:
            return (
                <Layouts.Capture
                    goToLayout={this.goToLayout}
                    goToMain={this.goToMain}
                    scene={this.state.scene}
                    sceneRef={this.dbRef}
                />
            );
        }
    }
}

MakeScene.propTypes = {
    pbKey: PropTypes.string.isRequired,
    sceneRef: PropTypes.string.isRequired,
    specialScene: PropTypes.bool,
    initLayout: PropTypes.oneOf(['capture', 'form', 'text']),
};

MakeScene.defaultProps = {
    specialScene: false,
    initLayout: 'capture',
};


export default MakeScene;
