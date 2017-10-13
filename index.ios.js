/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';

console.ignoredYellowBox = ['Remote debugger'];

AppRegistry.registerComponent('girlscode', () => App);

/*
setModalVisible(visible) {
    this.setState({ modalVisible: visible });
}

<Button
    raised
    icon={{ name: 'home', size: 32 }}
    buttonStyle={{ backgroundColor: 'red', borderRadius: 10 }}
    textStyle={{ textAlign: 'center' }}
    title="Acceder por email"
    onPress={() => this.setModalVisible(true)}
/>
<Modal
    animationType="slide"
    transparent={false}
    visible={this.state.modalVisible}
    onClose={() => this.setModalVisible(false)}
    title="Inicia sesión"
>
    <LoginForm />
</Modal>

*/
