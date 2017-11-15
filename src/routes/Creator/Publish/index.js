import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, FlatList, Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'react-native-firebase';
import CategoryItem from './components/CategoryItem';
import { MainView } from '../../../components/Commons';
import { VALUE_SCENE_PUBLISHED } from '../../../helpers/constants';

class Publish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            categories: [],
            publishing: false,
            category: null,
            numScenes: 0,
        };
    }
    componentWillMount = () => {
        firebase.database().ref('categories').once('value', (snap) => {
            const categories = [];
            snap.forEach((snapC) => {
                categories.push(Object.assign({}, snapC.val(), {
                    id: snapC.key,
                }));
            });
            this.setState({ categories });
        });
        firebase.database().ref('building_playbooks')
            .child(this.props.pbKey)
            .on('value', (snapPB) => {
                this.setState({
                    numScenes: snapPB.val().numScenes,
                    publishing: snapPB.val().publishing,
                    category: (snapPB.val().category) ? snapPB.val().category.name : null,
                    title: snapPB.val().title,
                });
            });
    }
    setTitle = (value) => {
        this.setState({ title: value }, () => {
            firebase.database().ref('building_playbooks')
                .child(this.props.pbKey)
                .child('title')
                .set(value);
        });
    }
    setCategory = (value) => {
        this.setState({ category: value.name }, () => {
            firebase.database().ref('building_playbooks')
                .child(this.props.pbKey)
                .child('category')
                .set(value);
        });
    }
    render() {
        return (
            <MainView>
                <Spinner
                    visible={this.state.publishing}
                    textContent="Publicando..."
                    textStyle={{ color: '#FFF' }}
                />
                <TextInput
                    style={{ width: '100%', height: 40, borderColor: '#000000', borderWidth: 1 }}
                    onChangeText={title => this.setTitle(title)}
                    value={this.state.title}
                />
                <View style={{ width: '100%', height: this.state.categories.length * 56, marginTop: 32 }}>
                    <FlatList
                        style={{
                            width: '100%',
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 8,
                        }}
                        data={this.state.categories}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <CategoryItem
                                item={item}
                                setCategory={this.setCategory}
                                selectedCategory={this.state.category}
                            />
                        )}
                    />
                </View>
                <Text>{VALUE_SCENE_PUBLISHED * this.state.numScenes} puntos</Text>
                <Text>Al publicar este playbook</Text>
            </MainView>
        );
    }
}

Publish.propTypes = {
    pbKey: PropTypes.string.isRequired,
};

export default Publish;
