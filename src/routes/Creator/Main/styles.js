import { StyleSheet } from 'react-native';
import * as colors from '../../../helpers/colors';
import * as fonts from '../../../helpers/fonts';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'column',
        marginTop: 24,
    },
    sceneBasic: {
        backgroundColor: colors.white,
        borderColor: colors.gray1,
        borderStyle: 'solid',
        marginBottom: 16,
    },
    sceneSize_md: {
        borderRadius: 8,
        width: 160,
        height: 264,
        borderWidth: 8,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 5,
        shadowOpacity: 0.3,
    },
    sceneSize_sm: {
        borderRadius: 8,
        width: 64,
        height: 102,
        borderWidth: 6,
        margin: 8,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 3,
        shadowOpacity: 0.2,
    },
    middleWay: {
        flexDirection: 'column',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -1,
    },
    bottomContainer: {
        width: '100%',
    },
    bottomText: {
        backgroundColor: colors.primary,
        height: 52,
        width: '100%',
        textAlign: 'center',
        color: colors.white,
        paddingTop: 16,
        fontFamily: fonts.medium,
        fontSize: 16,
    },
    defaultScene: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconDefaultScene: {
        marginBottom: 20,
    },
    textDefaultScene: {
        fontFamily: fonts.light,
        fontSize: 16,
        color: colors.gray1,
        textAlign: 'center',
        width: '100%',
    },
    textDefault: {
        fontFamily: fonts.black,
        color: colors.white,
        width: '100%',
        textAlign: 'center',
        fontSize: 24,
        backgroundColor: 'transparent',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 3,
        shadowOpacity: 0.5,
    },
    containerText: {
        flex: 1,
        alignItems: 'center',
        padding: 40,
        justifyContent: 'flex-start',
        width: '100%',
    },
});
