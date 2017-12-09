import React, { Component } from 'react';
import { ScrollView, TextInput, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './styles';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: null,
            email: null,
            location: null,
            photoURL: null,
            shortBio: null,
            uploadImage: false,
        };
    }
    componentWillMount() {
        firebase.database().ref('users')
            .child(firebase.auth().currentUser.uid)
            .once('value', (snap) => {
                const { displayName, email, photoURL, shortBio, location } = snap.val();
                this.setState({ displayName, email, photoURL, shortBio, location });
            });

        Actions.refresh({
            rightTitle: 'Guardar',
            onRight: () => this.onSave(),
        });
    }
    onSave = () => {
        const data = {
            displayName: this.state.displayName,
            location: this.state.location,
            shortBio: this.state.shortBio,
            photoURL: this.state.photoURL,
        };
        Actions.pop({ refresh: data });
        firebase.auth().currentUser.updateProfile({
            email: (this.state.email !== firebase.auth().currentUser.email) ? this.state.email : undefined,
            displayName: (this.state.displayName !== firebase.auth().currentUser.displayName) ? this.state.displayName : undefined,
            photoURL: (this.state.photoURL !== firebase.auth().currentUser.photoURL) ? this.state.photoURL : undefined,
        });
        firebase.database().ref('users').child(firebase.auth().currentUser.uid).update(data);
    }
    onLogout = () => {
        Actions.reset('auth');
        firebase.auth().signOut();
    }
    onOpenPicker = () => {
        ImagePicker.openPicker({
            width: 200,
            height: 200,
            cropping: true,
        }).then((image) => {
            this.setState({ uploadImage: true });
            const task = firebase.storage()
                .ref(`image_profiles/${firebase.auth().currentUser.uid}`)
                .put(image.path);

            task.on('state_changed', () => {
                // console.log('state', snapFile.state);
            }, (error) => {
                this.setState({ uploadImage: false });
                console.log('error', error);
            }, (res) => {
                this.setState({
                    photoURL: res.downloadURL,
                    uploadImage: false,
                });
            });
        });
    }
    render() {
        return (
            <ScrollView contentContainerStyle={styles.containerSettings}>
                <View style={styles.itemSettings}>
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={value => this.setState({ displayName: value })}
                        value={this.state.displayName}
                    />
                </View>
                <View style={styles.itemSettings}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={value => this.setState({ email: value })}
                        value={this.state.email}
                    />
                </View>
                <View style={styles.itemSettings}>
                    <Text style={styles.label}>Localidad</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={value => this.setState({ location: value })}
                        value={this.state.location}
                    />
                </View>
                <View style={styles.itemSettings}>
                    <Text style={styles.label}>Breve descripción sobre ti</Text>
                    <TextInput
                        style={styles.textInput}
                        multiline
                        onChangeText={value => this.setState({ shortBio: value })}
                        value={this.state.shortBio}
                    />
                </View>
                <View style={styles.separatorSettings} />
                <TouchableOpacity
                    style={styles.containerLink}
                    onPress={() => this.onOpenPicker()}
                >
                    <Icon style={styles.iconLink} name="image" type="entypo" />
                    <Text style={styles.textLink}>Actualizar foto de perfil</Text>
                    <ActivityIndicator animating={this.state.uploadImage} />
                </TouchableOpacity>
                <View style={styles.separatorSettings} />
                <TouchableOpacity
                    style={styles.containerLink}
                    onPress={() => this.onLogout()}
                >
                    <Icon style={styles.iconLink} name="log-out" type="entypo" />
                    <Text style={styles.textLink}>Cerrar sesión</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

export default Settings;
