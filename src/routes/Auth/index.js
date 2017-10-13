import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SVGImage from 'react-native-svg-image';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { MainView, Button } from '../../components/Commons';


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    image: {
        alignItems: 'center',
        marginTop: 64,
        flex: 1,
        width: 200,
        height: 200,
    },
    actions: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        width: '100%',
    },
});


const AuthMain = () => (
    <MainView style={styles.container}>
        <SVGImage
            style={styles.image}
            scrollEnabled={false}
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/girlscode-6fa97.appspot.com/o/logo_girlscode.svg?alt=media&token=cddd2e7f-5023-469c-bceb-75c30772d095'}}
        />
        <View style={styles.actions}>
            <LoginButton
                publishPermissions={["publish_actions"]}
                onLoginFinished={
                    (error, result) => {
                        if (error) {
                            console.log("login has error: " + result.error);
                        } else if (result.isCancelled) {
                            console.log("login is cancelled.");
                        } else {
                            AccessToken.getCurrentAccessToken().then(
                                (data) => {
                                    alert(data.accessToken.toString())
                                }
                            )
                        }
                    }
                }
            />
            <Button
                title="ACCEDE POR EMAIL"
                onPress={() => Actions.login()}
                fullWidth
            />
            <Button
                title="REGÍSTRATE"
                onPress={() => Actions.register()}
                fullWidth
            />
        </View>
    </MainView>
);


export default AuthMain;
