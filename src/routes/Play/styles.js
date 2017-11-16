import { StyleSheet } from 'react-native';
import * as colors from '../../helpers/colors';
import * as fonts from '../../helpers/fonts';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    containerText: {
        flex: 1,
        alignItems: 'center',
        padding: 40,
        justifyContent: 'flex-start',
        width: '100%',
    },
    textDefault: {
        fontFamily: fonts.black,
        color: colors.white,
        width: '100%',
        textAlign: 'center',
        fontSize: 24,
        backgroundColor: 'transparent',
    },
    textInputQuestion: {
        fontFamily: fonts.medium,
        marginBottom: 20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 3,
        shadowOpacity: 0.7,
    },
    textInputAnswer: {
        fontFamily: fonts.medium,
        fontSize: 16,
        color: colors.black,
        textAlign: 'left',
        width: '65%',
        display: 'flex',
        alignItems: 'center',
        flex: 0,
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    answerContainer: {
        borderRadius: 8,
        borderColor: colors.primary,
        borderWidth: 4,
        backgroundColor: colors.white,
        marginTop: 10,
        marginBottom: 10,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        position: 'relative',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowRadius: 5,
        shadowOpacity: 0.2,
        width: '100%',
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -1,
    },
});
