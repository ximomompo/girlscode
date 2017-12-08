import { StyleSheet } from 'react-native';
import * as colors from '../../helpers/colors';
import * as fonts from '../../helpers/fonts';

export default StyleSheet.create({
    mainContainer: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
    },
    containerCard: {
        margin: 12,
    },
    card: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.gray1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        alignContent: 'flex-start',
        borderRadius: 8,
        marginBottom: 16,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 3,
        shadowOpacity: 0.2,
    },
    cover: {
        overflow: 'hidden',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    header: {
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
    media: {
        flex: 0,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.gray1,
        marginRight: 10,
    },
    progress: {
        position: 'absolute',
        top: 8,
        right: 12,
        alignItems: 'center',
    },
    title: {
        backgroundColor: 'transparent',
        width: '100%',
        fontFamily: fonts.medium,
        fontSize: 16,
        color: colors.white,
        position: 'absolute',
        padding: 12,
        bottom: 0,
        left: 0,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    location: {
        fontFamily: fonts.thin,
        fontSize: 12,
        color: colors.gray,
    },
    image: {
        width: '100%',
        height: 180,
    },
    footer: {
        justifyContent: 'flex-start',
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
    category: {
        marginLeft: 4,
        fontFamily: fonts.light,
        fontSize: 13,
    },
    share: {
        fontSize: 12,
    },
    plays: {
        flexDirection: 'row',
        flex: 0,
        width: '100%',
    },
    playsText: {
        fontSize: 10,
        marginLeft: 4,
        marginTop: 2,
    },
    time: {
        fontSize: 10,
        position: 'absolute',
        bottom: 8,
        right: 12,
        color: colors.gray2,
    },
});
