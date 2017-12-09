import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../styles';

const CategoryItemTabs = props => (
    <TouchableOpacity
        style={styles.containerItemTab}
        onPress={() => Actions.reset('play', {
            pbKey: props.pbKey,
            statusPb: 'dirty',
            meta: props.meta,
            completed: true,
        })}
    >
        <View style={styles.containerText}>
            <Text
                numberOfLines={2}
                style={styles.primaryTextItemTab}
            >
                {props.meta.title}
            </Text>
            <Text style={styles.secondaryTextItemTab}>
                creado por {props.meta.owner.displayName}
            </Text>
        </View>
        <View style={styles.containerPoints}>
            <Text style={[
                styles.textPoints,
                { color: props.meta.category.color, borderColor: props.meta.category.color },
            ]}
            >
                +{props.points}
            </Text>
        </View>
    </TouchableOpacity>
);

CategoryItemTabs.propTypes = {
    points: PropTypes.number.isRequired,
    pbKey: PropTypes.string.isRequired,
    meta: PropTypes.shape({
        owner: PropTypes.shape({
            photoURL: PropTypes.string.isRequired,
            displayName: PropTypes.string.isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
        category: PropTypes.shape({
            color: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default CategoryItemTabs;
