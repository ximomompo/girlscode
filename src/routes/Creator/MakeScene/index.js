import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import Layouts from './Layouts';

class MakeScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: 'capture',
            scene: {},
            dbRef: firebase.database().ref(this.props.sceneRef),
        };
    }
    componentWillMount() {
        this.state.dbRef
            .on('value', (snap) => {
                this.setState({ scene: snap.val() });
            });
    }

    goToLayout = (value) => {
        this.setState({ layout: value });
    }

    goToMain = () => {
        Actions.main_creator({ pbKey: this.props.pbKey });
    }

    finishScene = (params) => {
        this.state.dbRef.update(Object.assign(params, {
            finished_at: firebase.database.ServerValue.TIMESTAMP,
        })).then(() => {
            // Subir imagen
            this.goToMain();
        });
    }

    render() {
        switch (this.state.layout) {
        case 'text':
            return (
                <Layouts.Text
                    goToLayout={this.goToLayout}
                    finishScene={this.finishScene}
                    scene={this.state.scene}
                    sceneRef={this.state.dbRef}
                    specialScene={this.props.specialScene}
                />
            );
        case 'form':
            return (
                <Layouts.Form
                    goToLayout={this.goToLayout}
                    finishScene={this.finishScene}
                    scene={this.state.scene}
                    sceneRef={this.state.dbRef}
                />
            );
        default:
            return (
                <Layouts.Capture
                    goToLayout={this.goToLayout}
                    goToMain={this.goToMain}
                    scene={this.state.scene}
                    sceneRef={this.state.dbRef}
                />
            );
        }
    }
}

MakeScene.propTypes = {
    pbKey: PropTypes.string.isRequired,
    sceneRef: PropTypes.string.isRequired,
    specialScene: PropTypes.bool,
};

MakeScene.defaultProps = {
    specialScene: false,
};


export default MakeScene;
