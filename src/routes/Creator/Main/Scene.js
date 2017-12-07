import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, View, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import * as colors from '../../../helpers/colors';
import styles from './styles';
import { getFormattedStylesText } from '../../../helpers/functions';

const Scene = props => (
    <TouchableHighlight onPress={props.onPress}>
        <View style={[
            styles.sceneBasic,
            styles[`sceneSize_${props.size}`],
            { borderColor: props.color },
            props.style,
        ]}
        >
            {(props.scene.image)
                ? [
                    <View key="text" style={styles.containerText}>
                        <Text style={[
                            styles.textDefault,
                            getFormattedStylesText(props.styles),
                            { paddingTop: 44, display: 'none' },
                        ]}
                        >
                            {props.scene.text}
                        </Text>
                    </View>,
                    <Image
                        key="image"
                        style={styles.thumbnail}
                        source={{ uri: props.scene.image }}
                    />,
                ] : (
                    <View style={styles.defaultScene}>
                        <Icon
                            name={props.icon}
                            type="font-awesome"
                            color={props.color}
                            style={[styles.iconDefaultScene, { marginTop: 12 }]}
                            iconStyle={{ fontSize: 21 }}
                        />
                        <Text style={[styles.textDefaultScene, { color: props.color, fontSize: 12 }]}>{props.textDefault}</Text>
                    </View>
                )
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
    color: PropTypes.string,
    icon: PropTypes.string,
    textDefault: PropTypes.string,
};

Scene.defaultProps = {
    size: 'md',
    scene: {},
    color: colors.gray1,
    icon: 'info',
    textDefault: 'Escena',
};

export default Scene;
