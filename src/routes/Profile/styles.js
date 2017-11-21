import { StyleSheet } from 'react-native';
import * as colors from '../../helpers/colors';
import * as fonts from '../../helpers/fonts';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    name: {
        fontFamily: fonts.bold,
        fontSize: 20,
    },
    email: {
        fontFamily: fonts.regular,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: colors.primary,
        margin: 16,
    },
    category: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shortBioInput: {
        width: '100%',
        fontFamily: fonts.light,
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 16,
        marginTop: 8,
    },
    row: {
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 6,
        paddingBottom: 6,
        borderBottomWidth: 1,
        borderColor: colors.gray1,
    },
    iconCategory: {
        width: 48,
        height: 48,
        marginRight: 8,
    },
    textPrimary: {
        fontFamily: fonts.medium,
        fontSize: 14,
        marginBottom: 2,
    },
    textRank: {
        fontFamily: fonts.light,
        fontSize: 14,
    },
    textPoints: {
        fontFamily: fonts.medium,
        fontSize: 16,
    },
});
