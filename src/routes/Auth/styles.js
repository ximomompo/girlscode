import { StyleSheet } from 'react-native';
import * as colors from '../../helpers/colors';
import * as fonts from '../../helpers/fonts';

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    mainView: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    mainLogo: {
        width: '100%',
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20%',
        marginBottom: '20%',
    },
    whiteCircle: {
        flex: 2,
    },
    image: {
        flex: 1,
        width: 160,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    contMainTextLogo: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    mainTextLogo: {
        flex: 1,
        width: 180,
        backgroundColor: 'transparent',
    },
    actions: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 2,
        width: '80%',
        margin: '10%',
    },
    buttonNext: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 24,
        right: 0,
        padding: 12,
        zIndex: 10,
    },
    textNext: {
        fontFamily: fonts.light,
        fontSize: 16,
        color: colors.primary,
    },
    textLogo: {
        flex: 1,
        width: 200,
        height: 100,
        backgroundColor: 'transparent',
    },
    containerBackGirl: {
    },
    backGirl: {
        width: '100%',
        flex: 1,
        position: 'absolute',
        bottom: 0,
        height: '55%',

    },
    mainText: {
        fontFamily: fonts.light,
        fontSize: 18,
        margin: 12,
        backgroundColor: 'transparent',
    },
    containerText: {
        flex: 4,
        justifyContent: 'flex-start',
    },
    containerTip: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
        marginBottom: '5%',
    },
    imageTip: {
        width: 200,
        height: 120,
        flex: 1,
        backgroundColor: 'transparent',
    },
    containerAuth: {
        paddingTop: 64,
    },
    titleAuth: {
        fontFamily: fonts.bold,
        fontSize: 18,
        marginBottom: 12,
    },
    buttonNextAuth: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 12,
        paddingTop: 28,
    },
});
