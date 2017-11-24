import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import 'moment/locale/es';
import Moment from 'react-moment';
import { Icon } from 'react-native-elements';
import firebase from 'react-native-firebase';
import StarRating from 'react-native-star-rating';
import { yellow } from '../../../helpers/colors';
import styles from '../styles';

Moment.globalLocale = 'es';

class Playbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numPlays: null,
            averageReview: null,
        };
    }
    componentWillMount() {
        firebase.database().ref('publish_playbooks')
            .child(this.props.pbKey)
            .once('value', (snap) => {
                const { numPlays, averageReview } = snap.val();
                console.log('pbKey', this.props.pbKey);
                console.log('moreno', numPlays);
                this.setState({
                    numPlays,
                    averageReview,
                });
            });
    }
    render() {
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => Actions.reset('play', {
                    pbKey: this.props.pbKey,
                    statusPb: this.props.status,
                })}
            >
                <View style={styles.header}>
                    <View style={styles.media}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: this.props.meta.photoURL }}
                        />
                        <View>
                            <Text style={styles.name}>
                                {this.props.meta.title}
                            </Text>
                            <Text style={styles.location}>
                                creado por {this.props.meta.name}
                            </Text>
                            {(this.state.numPlays)
                                ? (
                                    <View style={styles.plays}>
                                        <Icon size={8} name="play" type="font-awesome" color="black" />
                                        <Text style={styles.playsText}>{this.state.numPlays} reproducciones</Text>
                                    </View>
                                ) : null
                            }
                            {(this.state.averageReview)
                                ? <StarRating
                                    disabled
                                    maxStars={5}
                                    rating={this.state.averageReview}
                                    starColor={yellow}
                                    starSize={20}
                                />
                                : null
                            }
                        </View>
                    </View>
                    <View style={styles.progress}>
                        <Icon size={16} name="share-alt" type="font-awesome" color="gray" />
                    </View>
                </View>
                <View style={styles.footer}>
                    <Image
                        style={{ width: 32, height: 32 }}
                        source={{ uri: this.props.meta.category.icon }}
                    />
                    <Text style={[styles.category, { color: this.props.meta.category.color }]}>{this.props.meta.category.name}</Text>
                    <Moment style={styles.time} unix fromNow element={Text}>{this.props.created_at / 1000}</Moment>
                </View>
            </TouchableOpacity>
        );
    }
}

Playbook.propTypes = {
    pbKey: PropTypes.string.isRequired,
    meta: PropTypes.shape({
        title: PropTypes.string.isRequired,
        photoURL: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        percentage: PropTypes.number.isRequired,
        category: PropTypes.shape({
            name: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    created_at: PropTypes.number.isRequired,
};

export default Playbook;

/**
 * <Icon name="clock-o" type="font-awesome" />
                        <Text>{this.props.meta.percentage} %</Text>
 */