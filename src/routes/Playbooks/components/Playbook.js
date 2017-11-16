import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import 'moment/locale/es';
import Moment from 'react-moment';
import { Icon } from 'react-native-elements';
import styles from '../styles';


Moment.globalLocale = 'es';

class Playbook extends Component {
    onPlay = () => {

    }
    render() {
        console.log('keyy', this.props);
        return (
            <TouchableOpacity style={styles.card} onPress={() => Actions.play({ pbKey: this.props.pbKey })}>
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
                        </View>
                    </View>
                    <View style={styles.progress}>
                        <Icon name="clock-o" type="font-awesome" />
                        <Text>{this.props.meta.percentage} %</Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    <Moment unix fromNow element={Text}>{this.props.created_at / 1000}</Moment>
                    <Text style={styles.hastags}>{this.props.meta.category.name}</Text>
                    <Icon name="share-alt" type="font-awesome" color="black" />
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
