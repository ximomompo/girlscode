import React, { Component } from 'react';
import { Text, Image, ScrollView, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import { LEVELS_CATEGORY } from '../../helpers/constants';
import CategoryHeaderTab from './components/CategoryHeaderTab';
import CategoryItemTab from './components/CategoryItemTab';
import { gray2, primary } from '../../helpers/colors';
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
    renderLogs = () => {
        if (this.state.currentTab) {
            if (this.state.currentTab.logs.length === 0) {
                return (
                    <View style={styles.containerNoLogs}>
                        <Text style={styles.textNoLogs}>
                            Aun no has creado ni abierto ninguna historia sobre {this.state.currentTab.name}
                        </Text>
                        <View style={styles.containerActionsNoLogs}>
                            <TouchableOpacity
                                style={styles.itemActionsNoLogs}
                                onPress={() => Actions.playbooks_create()}
                            >
                                <Icon
                                    name="feather"
                                    type="entypo"
                                    color={primary}
                                />
                                <Text style={styles.textActionsNoLogs}>Crear historia</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.itemActionsNoLogs}
                                onPress={() => Actions.reset('playbooks')}
                            >
                                <Icon
                                    name="open-book"
                                    type="entypo"
                                    color={primary}
                                />
                                <Text style={styles.textActionsNoLogs}>Ver historias</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            }
            return (
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
                />
            )
        }
        return null;
        
    }
    render() {
        const width = (Dimensions.get('window').width - (Dimensions.get('window').width * 0.2));
        return (
            <ScrollView style={styles.containerScrollView}>
                <View style={styles.container}>
                    <View style={styles.containerBasicInfo}>
                        <TouchableOpacity
                            onPress={() => Actions.playbooks()}
                            style={styles.iconBack}
                        >
                            <Icon size={32} name="chevron-left" type="feather" color={primary} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => Actions.setting()}
                            style={styles.iconSettings}
                        >
                            <Icon size={24} name="settings" type="feather" color={primary} />
                        </TouchableOpacity>
                        <Image
                            style={styles.image}
                            source={{ uri: this.state.photoURL }}
                        />
                        <Text style={styles.name}>{this.state.displayName}</Text>
                        <Text style={styles.email}>{this.state.location}</Text>
                        <Text style={styles.shortBioInput}>
                            {this.state.shortBio}
                        </Text>
                    </View>
                    <FlatList
                        horizontal
                        directionalLockEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={[styles.containerHeaderTabs, {
                            width,
                            marginLeft: Dimensions.get('window').width * 0.1,
                            marginRight: Dimensions.get('window').width * 0.1,
                        }]}
                        data={this.state.categories}
                        keyExtractor={item => item.key}
                        scrollEnabled={false}
                        renderItem={({ item, index }) => (
                            <CategoryHeaderTab
                                index={index}
                                icon={item.icon}
                                style={{
                                    borderWidth: (this.state.currentTab.key === item.key) ? 1 : 0,
                                    borderColor: (this.state.currentTab.key === item.key)
                                        ? this.state.currentTab.color
                                        : gray2,
                                }}
                                onPress={this.onChangeTab}
                            />
                        )}
                    />
                    {this.renderLogs()}
                </View>
            </ScrollView>
        );
    }
}

export default Profile;
