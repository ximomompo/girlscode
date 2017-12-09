import React, { Component } from 'react';
import { Text, Image, TextInput, ScrollView, View, FlatList, Dimensions } from 'react-native';
import firebase from 'react-native-firebase';
import { LEVELS_CATEGORY } from '../../helpers/constants';
import CategoryHeaderTab from './components/CategoryHeaderTab';
import CategoryItemTab from './components/CategoryItemTab';
import { gray2 } from '../../helpers/colors';
import styles from './styles';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shortBio: '',
            categories: [],
            currentTab: null,
            displayName: firebase.auth().currentUser.displayName,
            photoURL: firebase.auth().currentUser.photoURL,
            location: '',
        };
    }
    componentWillMount() {
        firebase.database().ref('users')
            .child(firebase.auth().currentUser.uid)
            .once('value', (snapUser) => {
                const { shortBio, location } = snapUser.val();
                this.setState({ shortBio, location });
            });
        firebase.database().ref('users_categories')
            .child(firebase.auth().currentUser.uid)
            .once('value', (snapCat) => {
                const categories = [];
                snapCat.forEach((snapCatChild) => {
                    const { logs, ...other } = snapCatChild.val();
                    const logsA = [];
                    let points = 0;
                    snapCatChild.child('logs').forEach((snapCatLog) => {
                        points += snapCatLog.val().points;
                        logsA.push(Object.assign({}, snapCatLog.val(), {
                            key: snapCatLog.key,
                        }));
                    });
                    categories.push(Object.assign({}, other, {
                        key: snapCatChild.key,
                        points,
                        logs: logsA,
                    }));
                });
                this.setState({
                    categories,
                    currentTab: categories[0],
                });
            });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.displayName && nextProps.displayName !== this.state.displayName) {
            this.setState({ displayName: nextProps.displayName });
        }
        if (nextProps.photoURL && nextProps.photoURL !== this.state.photoURL) {
            this.setState({ photoURL: nextProps.photoURL });
        }
        if (nextProps.location && nextProps.location !== this.state.location) {
            this.setState({ location: nextProps.location });
        }
        if (nextProps.shortBio && nextProps.shortBio !== this.state.shortBio) {
            this.setState({ shortBio: nextProps.shortBio });
        }
    }
    onChangeTab = (index) => {
        this.setState({ currentTab: this.state.categories[index] });
    }
    getLevel = (points) => {
        const currentLevel = LEVELS_CATEGORY.filter(level => (
            (points >= level.floor && points <= level.ceil)
        ));
        return currentLevel[0].name;
    }
    setShortBio = (value) => {
        this.setState({ shortBio: value }, () => {
            firebase.database().ref('users')
                .child(firebase.auth().currentUser.uid)
                .child('shortBio')
                .set(value);
        });
    }
    render() {
        return (
            <ScrollView style={styles.containerScrollView}>
                <View style={styles.container}>
                    <View style={styles.containerBasicInfo}>
                        <Image
                            style={styles.image}
                            source={{ uri: this.state.photoURL }}
                        />
                        <Text style={styles.name}>{this.state.displayName}</Text>
                        <Text style={styles.email}>{this.state.location}</Text>
                        <TextInput
                            style={styles.shortBioInput}
                            onChangeText={shortBio => this.setShortBio(shortBio)}
                            value={this.state.shortBio}
                            multiline
                        />
                    </View>
                    <FlatList
                        horizontal
                        directionalLockEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={[styles.containerHeaderTabs, {
                            width: Dimensions.get('window').width,
                        }]}
                        data={this.state.categories}
                        keyExtractor={item => item.key}
                        scrollEnabled={false}
                        renderItem={({ item, index }) => (
                            <CategoryHeaderTab
                                index={index}
                                icon={item.icon}
                                style={{
                                    width: Dimensions.get('window').width / 3,
                                    borderBottomWidth: (this.state.currentTab.key === item.key) ? 3 : 0,
                                    borderBottomColor: (this.state.currentTab.key === item.key)
                                        ? this.state.currentTab.color
                                        : gray2,
                                }}
                                onPress={this.onChangeTab}
                            />
                        )}
                    />
                    {(this.state.currentTab)
                        ? (
                            <FlatList
                                style={styles.flatListLogs}
                                data={this.state.currentTab.logs}
                                keyExtractor={item => item.key}
                                ListHeaderComponent={() => (
                                    <View style={styles.containerHeader}>
                                        <Text style={[
                                            styles.textHeader,
                                            { color: this.state.currentTab.color },
                                        ]}
                                        >
                                            {this.state.currentTab.name}
                                        </Text>
                                        <Text style={styles.textAuxHeader}>
                                            {this.getLevel(this.state.currentTab.points)} ({this.state.currentTab.points} ptos)
                                        </Text>
                                    </View>
                                )}
                                renderItem={({ item }) => (
                                    <CategoryItemTab pbKey={item.playbook_key} {...item} />
                                )}
                                ItemSeparatorComponent={() => <View style={styles.separator} />}
                            />
                        ) : null
                    }
                </View>
            </ScrollView>
        );
    }
}

export default Profile;
