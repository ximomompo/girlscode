import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SVGImage from 'react-native-svg-image';
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
        const widthImage = Dimensions.get('window').width - 24;
        const heightImage = widthImage / 1.61;
        return (
            <View style={styles.containerCard}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => Actions.reset('play', {
                        pbKey: this.props.pbKey,
                        statusPb: this.props.status,
                        meta: this.props.meta,
                        completed: this.props.completed,
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
                            <Image
                                style={styles.avatar}
                                source={{ uri: this.props.meta.owner.photoURL }}
                            />
                            <View>
                                <Text style={styles.name}>
                                    creado por {this.props.meta.owner.displayName}
                                </Text>
                                <View style={styles.containerMetrics}>
                                    {this.renderNumPlays()}
                                    {this.renderAverageRating()}
                                </View>
                            </View>
                        </View>
                        <View style={styles.share}>
                            <Icon size={32} name="share-google" type="evilicon" color="gray" />
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.media}>
                            <View>
                                <SVGImage
                                    style={styles.iconCategory}
                                    scrollEnabled={false}
                                    source={{ uri: this.props.meta.category.icon }}
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
                </TouchableOpacity>
            </View>
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
};

Playbook.defaultProps = {
    completed: false,
};

export default Playbook;
