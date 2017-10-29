import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

const Scene = props => (
    <TouchableHighlight onPress={props.onPress}>
        <View style={[styles.sceneBasic, styles.sceneSizeMd]} />
    </TouchableHighlight>
);

Scene.propTypes = {
    onPress: PropTypes.func.isRequired,
};

export default Scene;
