import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SVGImage from 'react-native-svg-image';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Swiper from 'react-native-swiper';
import { Icon } from 'react-native-elements';
import { Button } from '../../components/Commons';
import StatusButton from '../../components/StatusButton';
import { LOGO_SIN_TEXTO, TEXT_LOGO, BACK_GIRL, LEE_HISTORIA, CUENTA_HISTORIA } from '../../helpers/constants';
import { primary } from '../../helpers/colors';
import { authByFB } from '../../modules/user/actions';
import styles from './styles';

const NextButton = props => (
    <TouchableOpacity
        onPress={() => props.onNext()}
        style={styles.buttonNext}
    >
        <Icon
            name="chevron-right"
            type="entypo"
            color={primary}
            iconStyle={{ fontSize: 28 }}
        />
    </TouchableOpacity>
);


class AuthMain extends Component {
    onNext = () => {
        this.swiperRef.scrollBy(1);
    }
    render() {
        return (
            <Swiper
                style={styles.wrapper}
                loop={false}
                showsPagination={false}
                index={0}
                ref={(ref) => { this.swiperRef = ref; }}
            >
                <View style={styles.mainView}>
                    <NextButton onNext={this.onNext} />
                    <SVGImage
                        style={styles.textLogo}
                        scrollEnabled={false}
                        source={{
                            uri: TEXT_LOGO,
                            cache: 'only-if-cached',
                        }}
                    />
                    <View style={styles.containerText}>
                        <Text style={styles.mainText}>
                            Es una aplicación que te conecta a través de tus historias y las historias de niñas como tú.
                        </Text>
                    </View>
                    <Image
                        style={styles.backGirl}
                        source={{ uri: BACK_GIRL }}
                        resizeMode="stretch"
                    />
                </View>
                <View style={[styles.mainView, { paddingTop: 60 }]}>
                    <NextButton onNext={this.onNext} />
                    <View style={styles.containerTip}>
                        <SVGImage
                            style={styles.imageTip}
                            scrollEnabled={false}
                            source={{ uri: CUENTA_HISTORIA }}
                            resizeMode="contain"
                        />
                        <Text style={[styles.mainText, { textAlign: 'center' }]}>
                            Cuéntanos con fotos y frases sobre tu diario vivir y gana puntos.
                        </Text>
                    </View>
                    <View style={styles.containerTip}>
                        <SVGImage
                            style={styles.imageTip}
                            scrollEnabled={false}
                            source={{ uri: LEE_HISTORIA }}
                            resizeMode="contain"
                        />
                        <Text style={[styles.mainText, { textAlign: 'center' }]}>
                            Disfruta y regala puntos a las historias de otras niñas
                        </Text>
                    </View>
                </View>
                <View style={styles.mainView}>
                    <View style={styles.mainLogo}>
                        <View style={styles.whiteCircle}>
                            <SVGImage
                                style={styles.image}
                                scrollEnabled={false}
                                source={{ uri: LOGO_SIN_TEXTO }}
                            />
                        </View>
                        <View style={styles.contMainTextLogo}>
                            <SVGImage
                                style={styles.mainTextLogo}
                                scrollEnabled={false}
                                source={{ uri: TEXT_LOGO }}
                            />
                        </View>
                    </View>
                    <View style={styles.actions}>
                        <StatusButton
                            domain="authByFB"
                            color="FB"
                            textDefault="Acceder con Facebook"
                            onPress={() => this.props.authByFB()}
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
                </View>
            </Swiper>
        );
    }
}

AuthMain.propTypes = {
    authByFB: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        authByFB,
    }, dispatch)
);

export default connect(null, mapDispatchToProps)(AuthMain);
