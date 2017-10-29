import { StyleSheet } from 'react-native';
import * as colors from '../../../helpers/colors';
import * as fonts from '../../../helpers/fonts';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 80,
        marginRight: 8,
        marginLeft: 8,
    },
    sceneBasic: {
        backgroundColor: colors.white,
        borderColor: colors.gray1,
        borderStyle: 'solid',
    },
    sceneSizeMd: {
        borderRadius: 8,
        width: 80,
        height: 80,
        borderWidth: 8,
    },
    sceneSizeSm: {
        borderRadius: 8,
        width: 64,
        height: 64,
        borderWidth: 6,
        margin: 8,
    },
    middleWay: {
        flexDirection: 'column',
    },
});
