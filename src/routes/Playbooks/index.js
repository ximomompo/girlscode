import React, { Component } from 'react';
import { View, CameraRoll } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { MainView, Button } from '../../components/Commons';

class Playbooks extends Component {
    getPhotos = () => {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'All'
        }).then(r => console.log('photos', r));
    }
    render() {
        return (
            <MainView>
                <Button
                    title="Abrir galería"
                    onPress={this.getPhotos()}
                    fullWidth
                />
            </MainView>
        );
    }
}

export default Playbooks;
