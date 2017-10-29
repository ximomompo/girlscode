import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import { Icon } from 'react-native-elements';
import { Text, MainView } from '../../components/Commons';
import * as colors from '../../helpers/colors';
import * as fonts from '../../helpers/fonts';

const styles = StyleSheet.create({
    card: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.gray1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        alignContent: 'flex-start',
        borderRadius: 2,
    },
    header: {
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
    media: {
        flex: 0,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: colors.gray1,
        marginRight: 10,
    },
    progress: {

        alignItems: 'center',
    },
    name: {
        fontFamily: fonts.bold,
        fontSize: 16,
        color: colors.black,
    },
    location: {
        fontFamily: fonts.thin,
        fontSize: 14,
        color: colors.gray,
    },
    image: {
        width: '100%',
        height: 180,
    },
    footer: {
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
        padding: 10,
    },
    hastags: {
        color: colors.blue,
    }
});

class Playbooks extends Component {
    onLogout = () => {
        firebase.auth().signOut().then(() => Actions.replace('index'));
    }
    render() {
        return (
            <MainView style={{ justifyContent: 'flex-start' }}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <View style={styles.media}>
                            <Image
                                style={styles.avatar}
                                source={{ uri: firebase.auth().currentUser.photoURL }}
                            />
                            <View>
                                <Text style={styles.name}>{firebase.auth().currentUser.displayName}</Text>
                                <Text style={styles.location}>Santo Domingo</Text>
                            </View>
                        </View>
                        <View style={styles.progress}>
                            <Icon name="clock-o" type="font-awesome" />
                            <Text>30 %</Text>
                        </View>
                    </View>
                    <Image
                        style={styles.image}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/girlscode-6fa97.appspot.com/o/images.png?alt=media&token=2e37ba34-3266-4404-894a-43fc1f84819c' }}
                    />
                    <View style={styles.footer}>
                        <Text style={styles.hastags}>#prevenciónDeEmbarazos #SantoDomingo</Text>
                        <Icon name="share-alt" type="font-awesome" color={colors.gray} />
                    </View>
                </View>
            </MainView>
        );
    }
}

export default Playbooks;
