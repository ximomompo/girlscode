import { StyleSheet } from 'react-native';
import * as colors from '../../../helpers/colors';
import * as fonts from '../../../helpers/fonts';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 0,
    },
    capture: {
        flex: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 40,
        width: 80,
        height: 80,
        padding: 10,
        margin: 40,
    },
    inside: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.white,
    },
    top: {
        flex: 0,
        width: '100%',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bottom: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerInputText: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 80,
    },
    containerText: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 0,
        flex: 1,
        justifyContent: 'center',
    },
    dotAux: {
        marginTop: 10,
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    textInput: {
        fontFamily: fonts.black,
        color: colors.white,
        width: '100%',
        textAlign: 'center',
        fontSize: 24,
        backgroundColor: 'transparent',
    },
    iconsAbsolute: {
        position: 'absolute',
        zIndex: 1,
        padding: 4,
    },
    shadowDefault: {
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 3,
        shadowOpacity: 0.7,
    },
    positionIconTopLeft: {
        top: 20,
        left: 20,
    },
    positionIconTopRight: {
        top: 20,
        right: 20,
    },
    positionIconBottomLeft: {
        bottom: 20,
        left: 20,
    },
    positionIconBottomRight: {
        bottom: 20,
        right: 20,
    },
    pickerColor: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        position: 'absolute',
        zIndex: 1,
        left: 10,
        top: 80,
    },
    pickerColorItem: {
        width: 25,
        height: 25,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: colors.white,
    },
    iconText: {
        backgroundColor: 'transparent',
        color: colors.white,
        fontSize: 16,
        padding: 4,
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -1,
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
    addQuestion: {
        backgroundColor: 'transparent',
        width: '100%',
        alignItems: 'center',
        flex: 0,
        padding: 10,
    },
    addQuestionText: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.white,
    },
    containerGestures: {
        flex: 1,
        alignItems: 'center',
        padding: 40,
        justifyContent: 'flex-start',
    },
    mainIconForm: {
        fontSize: 46,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 5,
        shadowOpacity: 0.7,
    },
    iconCorrectContainer: {
        width: '20%',
        display: 'flex',
        alignItems: 'center',
        flex: 0,
        justifyContent: 'flex-start',
        paddingTop: 12,
    },
    iconTrashContainer: {
        width: '15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 15,
        flex: 0,
    },
});
