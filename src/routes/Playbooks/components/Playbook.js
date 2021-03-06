import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import 'moment/locale/es';
import Moment from 'react-moment';
import { Icon } from 'react-native-elements';
import firebase from 'react-native-firebase';
import StarRating from 'react-native-star-rating';
import { yellow } from '../../../helpers/colors';
import { VALUE_SCENE_PLAYED } from '../../../helpers/constants';
import styles from '../styles';

Moment.globalLocale = 'es';

class Playbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numPlays: null,
            averageRating: null,
            numReviews: 0,
            points: null,
        };
    }
    componentWillMount() {
        firebase.database().ref('publish_playbooks')
            .child(this.props.pbKey)
            .once('value', (snap) => {
                const { numPlays, averageRating } = snap.val();
                this.setState({
                    numPlays,
                    averageRating,
                    numReviews: snap.child('reviews').numChildren(),
                    points: snap.child('chapters').numChildren() * VALUE_SCENE_PLAYED,
                });
            });
    }
    renderAverageRating = () => {
        if (!this.state.averageRating) return null;
        return (
            <View style={styles.plays}>
                <StarRating
                    disabled
                    maxStars={5}
                    rating={this.state.averageRating}
                    starColor={yellow}
                    starSize={12}
                />
                <Text style={styles.playsText}>({this.state.numReviews})</Text>
            </View>
        );
    }
    renderNumPlays = () => {
        if (!this.state.numPlays) return null;
        return (
            <View style={styles.plays}>
                <Icon size={8} name="play" type="font-awesome" color="black" />
                <Text style={styles.playsText}>{this.state.numPlays} lecturas</Text>
            </View>
        );
    }
    render() {
        const widthImage = Dimensions.get('window').width - 48;
        const heightImage = widthImage / 1.61;
        return (
            <TouchableOpacity
                style={[styles.card, { width: widthImage }]}
                onPress={() => Actions.reset('play', {
                    pbKey: this.props.pbKey,
                    meta: this.props.meta,
                    completed: this.props.completed,
                    indexCarousel: this.props.indexCarousel,
                })}
            >
                <View style={styles.cover}>
                    <Image
                        style={[styles.cover, { width: widthImage, height: heightImage }]}
                        source={{ uri: this.props.meta.cover }}
                    />
                    <Text
                        style={styles.title}
                        numberOfLines={2}
                    >
                        {this.props.meta.title}
                    </Text>
                </View>
                <View style={styles.header}>
                    <View style={styles.media}>
                        <View>
                            <Image
                                style={styles.iconCategory}
                                source={{ uri: this.props.meta.category.icon }}
                                resizeMode="contain"
                            />
                        </View>
                        <View>
                            <Text style={[styles.category, { color: this.props.meta.category.color }]}>
                                {this.props.meta.category.name}
                            </Text>
                            <View style={styles.containerTime}>
                                <Text style={styles.time}>publicado </Text>
                                <Moment style={styles.time} unix fromNow element={Text}>
                                    {this.props.created_at / 1000}
                                </Moment>
                            </View>
                        </View>
                    </View>
                    <Text style={[styles.textPoints, { color: this.props.meta.category.color }]}>
                        {this.state.points} ptos
                    </Text>
                </View>
                <View style={styles.footer}>
                    <View style={styles.media}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: this.props.meta.owner.photoURL }}
                        />
                        <View>
                            <Text style={styles.name} numberOfLines={1}>
                                creado por {this.props.meta.owner.displayName}
                            </Text>
                            <View style={styles.containerMetrics}>
                                {this.renderNumPlays()}
                                {this.renderAverageRating()}
                            </View>
                        </View>
                    </View>
                    { /* <View style={styles.share}>
                        <Icon size={32} name="share-google" type="evilicon" color="gray" />
                    </View>
                    */ }
                </View>
            </TouchableOpacity>
        );
    }
}

Playbook.propTypes = {
    pbKey: PropTypes.string.isRequired,
    meta: PropTypes.shape({
        title: PropTypes.string.isRequired,
        owner: PropTypes.shape({
            displayName: PropTypes.string.isRequired,
            photoURL: PropTypes.string.isRequired,
        }).isRequired,
        cover: PropTypes.string.isRequired,
        category: PropTypes.shape({
            name: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    created_at: PropTypes.number.isRequired,
    completed: PropTypes.bool,
    indexCarousel: PropTypes.number,
};

Playbook.defaultProps = {
    completed: false,
    indexCarousel: 0,
};

export default Playbook;
