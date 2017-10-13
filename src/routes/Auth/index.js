import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { MainView, Button } from '../../components/Commons';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
});


const AuthMain = () => (
    <MainView style={styles.container}>
        <Text style={styles.welcome}>
            Código Niña
        </Text>
        <Button
            buttonStyle={{ backgroundColor: 'red' }}
            title="ACCEDE POR EMAIL"
            onPress={() => Actions.login()}
            fullWidth
        />
        <Button
            buttonStyle={{ backgroundColor: 'red' }}
            title="REGÍSTRATE"
            onPress={() => Actions.register()}
            fullWidth
        />
    </MainView>
);

export default AuthMain;
