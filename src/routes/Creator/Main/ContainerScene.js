import React from 'react';
import { View } from 'react-native';
import Scene from './Scene';
import { red } from '../../../helpers/colors';

const ContainerScene = (props) => {
    const { errorScene, ...other } = props.scene;
    return (
        <View>
            {(!props.scene.finalScene)
                ? (
                    <Scene
                        style={{ marginTop: 292, position: 'absolute', marginLeft: 48 }}
                        size="sm"
                        onPress={() => props.onOpenErrorScene()}
                        scene={errorScene}
                        color={red}
                        textDefault="Escena fallo"
                        icon="plus"
                    />
                ) : null}
            <Scene
                size="md"
                onPress={() => props.onOpenMainScene()}
                scene={other}
            />
        </View>
    );
};

export default ContainerScene;
