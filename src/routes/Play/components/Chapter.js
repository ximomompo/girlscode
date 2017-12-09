import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Image,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Question from './Question';
import Separator from '../../../components/Commons/Separator';
import styles from '../../Creator/New/styles';
import stylesPlay from '../styles';
import { primary } from '../../../helpers/colors';

class Chapter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: 'text',
        };
    }
    onViewQuestion = () => {
        this.setState({ content: 'question' });
    }
    renderNext = () => {
        if (this.props.lastChapter) {
            return this.props.lastChapter;
        }
        return (
            <TouchableOpacity
                style={stylesPlay.containerNext}
                onPress={() => ((this.props.question)
                    ? this.onViewQuestion()
                    : this.props.onNextChapter()
                )}
            >
                <Text style={stylesPlay.textNext}>Siguiente</Text>
                <Icon
                    name="chevron-right"
                    type="entypo"
                    color={primary}
                    iconStyle={{ fontSize: 21 }}
                />
            </TouchableOpacity>
        );
    }
    renderContent = () => {
        switch (this.state.content) {
        case 'text':
            return (
                <View>
                    <View style={styles.containerChapterH}>
                        <Text style={styles.textChapterH}>
                            {(this.props.lastChapter)
                                ? 'Final'
                                : `Capítulo ${this.props.number}`
                            }
                        </Text>
                        <Separator />
                    </View>
                    <View style={styles.containerInputText}>
                        <Text style={styles.inputText}>
                            {this.props.text}
                        </Text>
                    </View>
                    {this.renderNext()}
                </View>
            );
        case 'question':
            return (
                <Question
                    onNextChapter={this.props.onNextChapter}
                    onShowErrorMessage={this.props.onShowErrorMessage}
                    {...this.props.question}
                />
            );
        default:
            return null;
        }
    }
    render() {
        const height = Dimensions.get('window').width / 1.61;
        return (
            <View style={this.props.style}>
                <ScrollView>
                    <Image
                        style={[styles.image, { height }]}
                        source={{ uri: this.props.image }}
                    />
                    {this.renderContent()}
                </ScrollView>
            </View>
        );
    }
}

Chapter.propTypes = {
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    question: PropTypes.shape({
        text: PropTypes.string.isRequired,
        errorText: PropTypes.string.isRequired,
        answers: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
            correct: PropTypes.bool,
        })),
    }),
    onNextChapter: PropTypes.func.isRequired,
    onShowErrorMessage: PropTypes.func.isRequired,
    lastChapter: PropTypes.element,
};

Chapter.defaultProps = {
    question: null,
    lastChapter: undefined,
};

export default Chapter;
