import { StyleSheet } from 'react-native';
import * as colors from '../../helpers/colors';
import * as fonts from '../../helpers/fonts';

export default StyleSheet.create({
    card: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.gray1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        alignContent: 'flex-start',
        borderRadius: 2,
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
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: colors.gray1,
        marginRight: 10,
    },
    progress: {

        alignItems: 'center',
    },
    name: {
        fontFamily: fonts.bold,
        fontSize: 16,
        color: colors.black,
    },
    location: {
        fontFamily: fonts.thin,
        fontSize: 14,
        color: colors.gray,
    },
    image: {
        width: '100%',
        height: 180,
    },
    footer: {
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
        padding: 10,
    },
    hastags: {
        color: colors.blue,
    },
});
