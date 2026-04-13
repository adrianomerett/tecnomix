import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.grayfundo,
        padding: 10
    },
    containerlist: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: 4,
        marginTop: 10,
    }
});