import React, { Component } from 'react';
import { Text, Image, TextInput, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import { Button, MainView } from '../../components/Commons';
import Category from './components/Category';
import styles from './styles';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shortBio: '',
            categories: [],
        };
    }
    componentWillMount() {
        firebase.database().ref('users').child(firebase.auth().currentUser.uid).once('value', (snapUser) => {
            const { shortBio } = snapUser.val();
            this.setState({
                shortBio,
            });
        });
        firebase.database().ref('users_categories').child(firebase.auth().currentUser.uid).once('value', (snapCat) => {
            const categories = [];
            snapCat.forEach((snapCatChild) => {
                const { logs, ...other } = snapCatChild.val();
                const category = Object.assign({}, other, {
                    key: snapCatChild.key,
                    points: 0,
                });
                snapCatChild.child('logs').forEach((snapCatLog) => {
                    category.points += snapCatLog.val().points;
                });
                categories.push(category);
            });
            this.setState({
                categories,
            });
        });
    }
    onLogout = () => {
        Actions.reset('auth');
        firebase.auth().signOut();
    }
    setShortBio = (value) => {
        this.setState({ shortBio: value }, () => {
            firebase.database().ref('users')
                .child(firebase.auth().currentUser.uid)
                .child('shortBio')
                .set(value);
        });
    }
    renderCategories = () => (
        this.state.categories.map(category => (
            <Category key={category.key} {...category} />
        ))
    );
    render() {
        return (
            <ScrollView style={{ width: '100%' }}>
                <MainView style={styles.container}>
                    <Image
                        style={styles.image}
                        source={{ uri: firebase.auth().currentUser.photoURL }}
                    />
                    <Text style={styles.name}>{firebase.auth().currentUser.displayName}</Text>
                    <Text style={styles.email}>{firebase.auth().currentUser.email}as</Text>
                    <TextInput
                        style={styles.shortBioInput}
                        onChangeText={shortBio => this.setShortBio(shortBio)}
                        value={this.state.shortBio}
                        multiline
                    />
                    {this.renderCategories()}
                    <Button
                        style={{ marginTop: 16 }}
                        title="CERRAR SESIÓN"
                        onPress={() => this.onLogout()}
                        fullWidth
                    />
                </MainView>
            </ScrollView>
        );
    }
}

export default Profile;
