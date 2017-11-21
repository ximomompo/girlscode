import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { LEVELS_CATEGORY } from '../../../helpers/constants';
import styles from '../styles';

class Category extends Component {
    getLevel = (points) => {
        const currentLevel = LEVELS_CATEGORY.filter(level => (
            (points > level.floor && points <= level.ceil)
        ));
        return currentLevel[0].name;
    }
    render() {
        return (
            <View style={styles.row}>
                <View style={styles.category}>
                    <Image
                        style={styles.iconCategory}
                        source={{ uri: this.props.icon }}
                    />
                    <View>
                        <Text style={[styles.textPrimary, { color: this.props.color }]}>{this.props.name}</Text>
                        <Text style={[styles.textRank]}>{this.getLevel(this.props.points)}</Text>
                    </View>
                </View>
                <Text style={styles.textPoint}>{this.props.points} ptos</Text>
            </View>
        );
    }
}

export default Category;
