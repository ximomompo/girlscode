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
        fontSize: 28,
        marginTop: 8,
        marginBottom: 8,
    },
    aux: {
        textAlign: 'center',
        fontSize: 16,
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
});
