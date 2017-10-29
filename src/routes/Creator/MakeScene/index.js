import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import Layouts from './Layouts';

class MakeScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: 'capture',
            scene: {},
            sceneRef: firebase.database().ref('building_playbooks')
                .child(this.props.pbKey)
                .child('scenes')
                .child(this.props.sceneKey),
        };
    }
    componentWillMount() {
        this.state.sceneRef
            .on('value', (snap) => {
                this.setState({ scene: snap.val() });
            });
    }

    goToLayout = (value) => {
        this.setState({ layout: value });
    }

    render() {
        switch (this.state.layout) {
        case 'text':
            return (
                <Layouts.Text
                    goToLayout={this.goToLayout}
                    scene={this.state.scene}
                    sceneRef={this.state.sceneRef}
                />
            );
        case 'form':
            return (
                <Layouts.Form
                    goToLayout={this.goToLayout}
                    scene={this.state.scene}
                    sceneRef={this.state.sceneRef}
                />
            );
        default:
            return (
                <Layouts.Capture
                    goToLayout={this.goToLayout}
                    scene={this.state.scene}
                    sceneRef={this.state.sceneRef}
                />
            );
        }
    }
}

MakeScene.propTypes = {
    pbKey: PropTypes.string.isRequired,
    sceneKey: PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
    gallery: state.gallery,
});

export default connect(mapStateToProps)(MakeScene);
