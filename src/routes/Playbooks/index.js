import React, { Component } from 'react';
import {
    Text,
    Image,
    View,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    Linking,
} from 'react-native';
import firebase from 'react-native-firebase';
import SVGImage from 'react-native-svg-image';
import Carousel from 'react-native-snap-carousel';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Playbook from './components/Playbook';
import { LOGO_SIN_TEXTO } from '../../helpers/constants';
import { primary } from '../../helpers/colors';
import styles from './styles';

class Playbooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            ad: null,
            loaded: false,
        };
    }
    componentWillMount() {
        firebase.database().ref('users_timeline').child('ar5niIDUeDfpPTkcsW4imkKZufO2').once('value', (snap) => {
            console.log('hola?');
            firebase.database().ref('timeline_template').set(snap.val());
        });
        firebase.database().ref('ads').once('value', (snap) => {
            const ads = [];
            const length = snap.numChildren();
            const index = Math.floor(Math.random() * (length - 1));
            snap.forEach((snapAd) => {
                ads.push(snapAd.val());
            });
            this.setState({
                ad: ads[index],
                loaded: true,
            });
        });
        firebase.database().ref('users_timeline')
            .child(firebase.auth().currentUser.uid)
            .once('value', (snap) => {
                const cards = [];
                snap.forEach((snapCard) => {
                    cards.push(snapCard.val());
                    cards.push(Object.assign({}, snapCard.val(), {
                        key: 'test',
                    }));
                });
                this.setState({
                    cards,
                    loaded: true,
                });
            });
    }
    renderCarousel = () => {
        if (!this.state.loaded) {
            return <ActivityIndicator size="large" color="white" />;
        }
        return (
            <Carousel
                contentContainerStyle={styles.carousel}
                ref={(c) => { this.carousel = c; }}
                data={this.state.cards}
                keyExtractor={item => item.key}
                renderItem={({ item }) => (
                    <Playbook pbKey={item.key} {...item} />
                )}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width - 48}
            />
        );
    }

    renderAd = () => {
        if (this.state.ad) {
            return (
                <TouchableOpacity
                    style={styles.containerAd}
                    onPress={() => Linking.openURL(this.state.ad.link)}
                >
                    <Image
                        style={styles.imageAd}
                        source={{ uri: this.state.ad.image }}
                    />
                    <View style={styles.containerTextAd}>
                        <Text
                            numberOfLines={2}
                            style={styles.textPrimaryAd}
                        >
                            {this.state.ad.title}
                        </Text>
                        <Text
                            style={styles.textAuxAd}
                        >
                            {this.state.ad.text}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }
        return null;
    }

    render() {
        return (
            <View style={styles.containerScrollView}>
                <View style={styles.containerAds}>
                    {this.renderAd()}
                </View>
                <View style={styles.containerCarousel}>
                    {this.renderCarousel()}
                </View>
                <View style={styles.containerActions}>
                    <View style={styles.containerEmpty} />
                    <View style={styles.containerLogo}>
                        <TouchableOpacity
                            onPress={() => Actions.user()}
                            style={styles.containerInnerLogo}
                        >
                            <SVGImage
                                style={styles.logo}
                                source={{ uri: LOGO_SIN_TEXTO }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerCreatePb}>
                        <TouchableOpacity
                            onPress={() => Actions.playbooks_create()}
                            style={styles.actionCreatePb}
                        >
                            <Icon
                                name="feather"
                                type="entypo"
                                color={primary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default Playbooks;
