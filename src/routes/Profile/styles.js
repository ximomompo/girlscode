import { StyleSheet } from 'react-native';
import * as colors from '../../helpers/colors';
import * as fonts from '../../helpers/fonts';

export default StyleSheet.create({
    containerScrollView: {
        width: '100%',
        backgroundColor: colors.grayLight,
    },
    container: {
        alignItems: 'center',
        backgroundColor: colors.grayLight,
    },
    containerBasicInfo: {
        width: '100%',
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
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
    containerHeaderTabs: {
        flex: 1,
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.gray2,
    },
    containerItemHeaderTabs: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.gray2,
        backgroundColor: colors.grayLight,
        paddingTop: 8,
        paddingBottom: 8,
    },
    iconCategory: {
        width: 40,
        height: 40,
        marginRight: 8,
        backgroundColor: 'transparent',
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
    flatListLogs: {
        width: '100%',
        backgroundColor: colors.grayLight,
        flex: 1,
        height: '100%',
    },
    containerItemTab: {
        flex: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
    },
    separator: {
        height: 1,
        width: '80%',
        backgroundColor: colors.gray2,
        marginLeft: '10%',
    },
    containerText: {
        flex: 3,
    },
    primaryTextItemTab: {
        fontSize: 13,
        fontFamily: fonts.medium,
    },
    secondaryTextItemTab: {
        fontSize: 12,
        fontFamily: fonts.light,
    },
    containerPoints: {
        flex: 1,
        paddingLeft: 12,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    textPoints: {
        fontFamily: fonts.regular,
        fontSize: 16,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderRadius: 20,
        width: 40,
        height: 40,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 8,
        paddingLeft: 4,
    },
    textAuxPoints: {
        fontFamily: fonts.medium,
        fontSize: 14,
    },
    containerHeader: {
        width: '100%',
        padding: 12,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textHeader: {
        fontFamily: fonts.bold,
        fontSize: 13,
    },
    containerAuxHeader: {
        flexDirection: 'row',
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textAuxHeader: {
        fontFamily: fonts.regular,
        fontSize: 13,
    },
    containerSettings: {
        backgroundColor: colors.grayLight,
    },
    itemSettings: {
        backgroundColor: colors.grayLight,
        borderBottomWidth: 1,
        borderColor: colors.gray2,
        paddingTop: 12,
        paddingBottom: 12,
    },
    label: {
        fontFamily: fonts.medium,
        fontSize: 13,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 6,
    },
    textInput: {
        fontFamily: fonts.light,
        fontSize: 16,
        paddingLeft: 12,
        paddingRight: 12,
    },
    containerLink: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.grayLight,
        padding: 12,
        borderBottomWidth: 1,
        borderColor: colors.gray2,
    },
    textLink: {
        fontFamily: fonts.medium,
        fontSize: 14,
        paddingRight: 12,
    },
    iconLink: {
        paddingRight: 12,
    },
    separatorSettings: {
        height: 12,
        backgroundColor: colors.gray2,
    },
});
