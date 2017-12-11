import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'react-native-firebase';
import SplashScreen from 'react-native-splash-screen';
import configureStore from './store';
import RouterComponent from './Router';


const store = configureStore();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: null,
        };
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ logged: true });
            } else {
                this.setState({ logged: false });
            }
        });
        SplashScreen.hide();
    }

    render() {
        if (this.state.logged === null) {
            return null;
        }
        return (
            <Provider store={store}>
                <RouterComponent logged={this.state.logged} />
            </Provider>
        );
    }
}

export default App;
