import { StyleSheet } from 'react-native';
import * as colors from '../../../helpers/colors';
import * as fonts from '../../../helpers/fonts';

export default StyleSheet.create({
    textInput: {
        borderWidth: 3,
        fontFamily: fonts.medium,
        borderColor: colors.primary,
        width: '100%',
        borderRadius: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12,
        paddingBottom: 12,
        marginTop: 16,
        marginBottom: 16,
        fontSize: 20,
    },
    containerCategories: {
        width: '100%',
        borderWidth: 3,
        borderColor: colors.gray2,
        borderRadius: 16,
    },
    containerItemCat: {
        width: '100%',
        height: 56,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 3,
        borderColor: colors.gray2,
    },
    textCat: {
        paddingLeft: 16,
        paddingRight: 16,
        fontSize: 16,
        fontFamily: fonts.medium,
    },
});
