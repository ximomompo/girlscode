import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, View, Image } from 'react-native';
import styles from './styles';

const Scene = props => (
    <TouchableHighlight onPress={props.onPress}>
        <View style={[styles.sceneBasic, styles[`sceneSize_${props.size}`]]}>
            {(props.scene.image)
                ? (
                    <Image
                        style={styles.thumbnail}
                        source={{ uri: props.scene.image }}
                    />
                ) : null
            }
        </View>
    </TouchableHighlight>
);

Scene.propTypes = {
    onPress: PropTypes.func.isRequired,
    scene: PropTypes.shape({
        image: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
        ]),
    }),
    size: PropTypes.oneOf(['sm', 'md']),
};

Scene.defaultProps = {
    size: 'md',
    scene: {},
};

export default Scene;
