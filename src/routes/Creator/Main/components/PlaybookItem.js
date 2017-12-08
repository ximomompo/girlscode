import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { View, Text, TouchableOpacity } from 'react-native';
import Moment from 'react-moment';
import Emoji from 'react-native-emoji';
import { Icon } from 'react-native-elements';
import { gray2 } from '../../../../helpers/colors';
import styles from '../styles';

class PlaybookItem extends Component {
    openPlaybook = () => {
        Actions.main_creator({ pbKey: this.props.pbKey });
    }
    renderFinished = () => {
        if (this.props.finished_at) {
            return (
                <Text style={styles.emojiPlaybookItem}>
                    <Emoji name="mailbox" />
                </Text>
            );
        }
        return (
            <TouchableOpacity onPress={() => this.props.removePlaybook(this.props.pbKey)}>
                <Icon
                    name="trash"
                    type="entypo"
                    color={gray2}
                    iconStyle={{ fontSize: 26 }}
                />
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View style={styles.containerPlaybookItem}>
                <TouchableOpacity
                    style={styles.containerTextPlaybookItem}
                    onPress={() => this.openPlaybook()}
                >
                    <Text
                        numberOfLines={1}
                        style={styles.textPlaybookItem}
                    >
                        {this.props.title}
                    </Text>
                    <Moment
                        style={styles.time}
                        unix
                        fromNow
                        element={Text}
                    >
                        {this.props.created_at / 1000}
                    </Moment>
                </TouchableOpacity>
                <View style={styles.containerIconsPlaybookItem}>
                    {this.renderFinished()}
                    <Icon
                        name="chevron-right"
                        type="entypo"
                        color={gray2}
                        iconStyle={{ fontSize: 26 }}
                        style={{ padding: 8 }}
                    />
                </View>
            </View>
        );
    }
}

PlaybookItem.propTypes = {
    title: PropTypes.string,
    finished_at: PropTypes.number,
    pbKey: PropTypes.string.isRequired,
    removePlaybook: PropTypes.func.isRequired,
};

PlaybookItem.defaultProps = {
    title: 'Sin título',
    finished_at: null,
};

export default PlaybookItem;