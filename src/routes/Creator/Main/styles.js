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
    },
    sceneSize_sm: {
        borderRadius: 8,
        width: 64,
        height: 102,
        borderWidth: 6,
        margin: 8,
    },
    middleWay: {
        flexDirection: 'column',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
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
});
