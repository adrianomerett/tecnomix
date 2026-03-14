import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default StyleSheet.create({
    breadcrumb: {
        flexDirection: 'row',
        borderRadius: 4,
        backgroundColor: colors.white,
        paddingLeft: 10,
        paddingTop: 12,
        paddingBottom: 12,
    },
    activenavigation:{
        color: colors.primary,
        fontWeight: 'bold',
        color: colors.primary,
        fontSize: 13
    },
    inactivenavigation: {
        color: colors.graynavigation,
        fontWeight: 'bold',
        fontSize: 13
    }
});