import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, FlatList } from 'react-native';
import firebase from 'react-native-firebase';
import { Text, Button, MainView, Input } from '../../../components/Commons';

const pbKey = '-Ky5TrzWUPPPLvkK5KSc';

class Publish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
        };
    }
    componentWillMount = () => {
        firebase.database().ref('categories').once('value', (snap) => {
            this.setState({ categories: snap.val() });
        });
    }
    onPublish = () => {
        // Validar que existe title y category
        firebase.database().ref('building_playbooks')
            .child(pbKey)
            .once('value', (snap) => {
                // subir imagenes
                snap.child('scenes').forEach((snapScene) => {
                    firebase.storage().ref('playbooks').chidl(this.props.pbKey).
                    snapScene.val();
                });
                // setear publish_at y title
                const data = Object.assing({}, snap.val(), {
                    title: this.state.title,
                    category: this.state.category,
                    publish_at: firebase.database.ServerValue.TIMESTAMP,
                });
                // migrar de building_playbooks to publish_playbooks
                firebase.database().ref('publish_playbooks')
                    .child(this.props.pbKey)
                    .set(data);
            });
        // eliminar todos los building_playbooks del propietario
        firebase.database().ref('building_playbooks')
            .orderByChild('owner_id')
            .equalTo(firebase.auth().currentUser.id)
            .remove();
    }
    render() {
        return (
            <MainView>
                <Text>Moreno de valencia</Text>
                <TextInput
                    style={{ width: '100%', height: 40, borderColor: '#000000', borderWidth: 1 }}
                    onChangeText={title => this.setState({ title })}
                    value={this.state.title}
                />
                <FlatList
                    data={this.state.categories}
                    renderItem={({ item }) => (
                        <View>{item.title}</View>
                    )}
                />
                {/* Seleccionar categoria */}
                {/* Mostrar puntos */}
            </MainView>
        );
    }
}

// Publish.propTypes = {
//     pbKey: PropTypes.string.isRequired,
// };

export default Publish;
