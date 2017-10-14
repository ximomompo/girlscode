import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SVGImage from 'react-native-svg-image';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MainView, Button } from '../../components/Commons';
import StatusButton from '../../components/StatusButton';
import { LOGO } from '../../helpers/constants';
import { authByFB } from '../../modules/user/actions';


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    image: {
        alignItems: 'center',
        marginTop: 64,
        flex: 1,
        width: 200,
        height: 200,
    },
    actions: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        width: '100%',
    },
});


const AuthMain = props => (
    <MainView style={styles.container}>
        <SVGImage
            style={styles.image}
            scrollEnabled={false}
            source={{ uri: LOGO }}
        />
        <View style={styles.actions}>
            <StatusButton
                domain="authByFB"
                color="FB"
                textDefault="Acceder con Facebook"
                onPress={() => props.authByFB()}
                fullWidth
                icon={{ name: 'facebook', type: 'entypo', style: { fontSize: 24, position: 'absolute', left: 24 } }}
            />
            <Button
                title="Acceder por email"
                onPress={() => Actions.login()}
                fullWidth
            />
            <Button
                title="Regístrate"
                onPress={() => Actions.register()}
                fullWidth
            />
        </View>
    </MainView>
);

AuthMain.propTypes = {
    authByFB: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        authByFB,
    }, dispatch)
);

export default connect(null, mapDispatchToProps)(AuthMain);
