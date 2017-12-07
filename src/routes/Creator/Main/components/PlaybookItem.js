import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

class PlaybookItem extends Component {
    openPlaybook = () => {
        Actions.main_creator({ pbKey: this.props.pbKey });
    }
    render() {
        return (
            <View>
                <Text>{this.props.title}</Text>
            </View>
        )
    }
};

PlaybookItem.propTypes = {
    title: PropTypes.string,
    finished_at: PropTypes.number,
    pbKey: PropTypes.string.isRequired,
};

PlaybookItem.defaultProps = {
    title: 'Sin título',
    finished_at: null,
};

export default PlaybookItem;