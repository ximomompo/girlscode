import { StyleSheet } from 'react-native';
import * as colors from '../../../helpers/colors';
import * as fonts from '../../../helpers/fonts';

export default StyleSheet.create({
    flatList: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: colors.gray2,
        maxHeight: 192,
        width: '100%',
    },
    container: {
        justifyContent: 'center',
        backgroundColor: colors.moco,
    },
    text: {
        marginBottom: 24,
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Roboto-Black',
        fontSize: 24,
        marginTop: 8,
        marginBottom: 8,
    },
    aux: {
        textAlign: 'center',
        fontSize: 14,
        marginTop: 8,
        marginBottom: 8,
    },
    button: {
        marginTop: 8,
        marginBottom: 8,
    },
    containerPlaybookItem: {
        paddingTop: 8,
        paddingBottom: 8,
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    containerTextPlaybookItem: {
        flex: 0,
        width: '70%',
        paddingLeft: 12,
    },
    containerIconsPlaybookItem: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '30%',
    },
    textPlaybookItem: {
        fontFamily: fonts.bold,
        fontSize: 14,
    },
    time: {
        fontFamily: fonts.regular,
        color: colors.gray2,
        fontSize: 12,
    },
    separator: {
        height: 1,
        width: '80%',
        backgroundColor: colors.gray2,
        marginLeft: '10%',
    },
    emojiPlaybookItem: {
        fontSize: 20,
    },
    backButton: {
        position: 'absolute',
        zIndex: 1,
        top: 20,
        left: 0,
        padding: 12,
    },
    link: {
        color: colors.primary,
        fontFamily: fonts.regular,
        fontSize: 14,
        textAlign: 'center',
    },
    recommendationsMain: {
        paddingTop: 64,
    },
    recommendationsCont: {
        flex: 0,
        flexDirection: 'row',
        width: '100%',
        marginBottom: 16,
    },
    recommendationsTitle: {
        fontFamily: fonts.bold,
        fontSize: 18,
        margin: 12,
        marginBottom: 24,
    },
    recommendationsIndexCont: {
        width: 24,
        height: 24,
        backgroundColor: colors.primary,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginRight: 8,
        marginLeft: 12,
    },
    recommendationsIndexText: {
        color: colors.white,
        fontFamily: fonts.bold,
        fontSize: 16,
    },
    recommendationsText: {
        fontFamily: fonts.regular,
        fontSize: 14,
        width: '80%',
    },
});
