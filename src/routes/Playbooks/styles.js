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
        shadowOpacity: 0.5,
        backgroundColor: colors.white,
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
        padding: 12,
        paddingTop: 16,
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
        borderWidth: 0.5,
        borderColor: colors.gray2,
        marginRight: 12,
    },
    share: {},
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
    name: {
        fontFamily: fonts.regular,
        fontSize: 13,
    },
    plays: {
        flexDirection: 'row',
        flex: 0,
        alignItems: 'center',
        marginRight: 8,
    },
    playsText: {
        fontSize: 10,
        marginLeft: 4,
        marginTop: 2,
    },
    footer: {
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
        padding: 12,
        paddingTop: 0,
        alignItems: 'center',
    },
    category: {
        fontFamily: fonts.regular,
        fontSize: 13,
    },
    containerTime: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    time: {
        fontSize: 10,
        fontFamily: fonts.regular,
        color: colors.gray2,
    },
    containerMetrics: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
    iconCategory: {
        width: 32,
        height: 32,
        marginRight: 12,
        backgroundColor: 'transparent',
    },
    textPoints: {
        fontFamily: fonts.bold,
        fontSize: 14,
    },
    containerLogo: {
        flex: 1,
        justifyContent: 'center',
        height: 80,
        alignItems: 'center',
        flexDirection: 'row',
    },
    containerInnerLogo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.white,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.3,
    },
    logo: {
        width: 80,
        height: 80,
        backgroundColor: 'transparent',
    },
    containerScrollView: {
        width: '100%',
        flex: 1,
        backgroundColor: colors.moco,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        marginTop: 24,
        marginBottom: 24,
    },
    containerAds: {
        flex: 2,
        width: '90%',
    },
    containerCarousel: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carousel: {
        flex: 0,
    },
    containerActions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
    },
    actionCreatePb: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
        backgroundColor: colors.white,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.3,
        flex: 0,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textActionCreatePb: {
        fontFamily: fonts.light,
        fontSize: 16,
        color: colors.primary,
    },
    containerCreatePb: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 12,
    },
    containerEmpty: {
        flex: 1,
    },
    containerAd: {
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 12,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.3,
        flex: 0,
        flexDirection: 'row',
    },
    imageAd: {
        width: 64,
        height: 64,
        marginRight: 8,
    },
    containerTextAd: {
        flex: 1,
    },
    textPrimaryAd: {
        fontFamily: fonts.bold,
        fontSize: 12,
        marginBottom: 4,
    },
    textAuxAd: {
        fontFamily: fonts.regular,
        fontSize: 11,
    },
});
